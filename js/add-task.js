
setURL('https://gruppe-447.developerakademie.net/join/smallest_backend_ever');

let contacts = [];
let priority;
let testData = [];
let subtaskArray = [];





async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        let element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
    renderAllBackendData();

}

function parseLoggedOnUser() {
    let loggedOnUser = JSON.parse(localStorage.getItem("loggedOnUser"));
    let loggedOnUserFirstChart = loggedOnUser.charAt(0);
    let loggedOnUserFirstChartToUpperCase = loggedOnUserFirstChart.toUpperCase();
    document.getElementById('display_logged_on_user').innerHTML = `${loggedOnUserFirstChartToUpperCase}`;
}

async function renderAllBackendData() {
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    testData = JSON.parse(backend.getItem('testData')) || [];
    renderAllContacts();
    parseLoggedOnUser();
}

function renderAllContacts() {
    let contactContainer = document.getElementById('select-contact');
    contactContainer.innerHTML = '';
    contactContainer.innerHTML = `<option value="" disabled="" selected="" hidden="">Select contacts to assign</option>`;
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        contactContainer.innerHTML += `<option value="${contact['name']}">${contact['name']}</option>`;
    }
    document.getElementById('urgent').addEventListener('click', function () {
        setPriority('Urgent');
    });

    document.getElementById('medium').addEventListener('click', function () {
        setPriority('Medium');
    });

    document.getElementById('low').addEventListener('click', function () {
        setPriority('Low');
    });

    function setPriority(value) {
        priority = value;
    }
}

function addSubtask() {
    let subtaskInput = document.getElementById('task-subtask').value;
    renderSubtasksInPopUp(subtaskInput);
    subtaskArray.push(subtaskInput);
    document.getElementById('task-subtask').value = '';
}

function renderSubtasksInPopUp(subtaskInput) {
    let subTasks = document.getElementById('subtasks');
    subTasks.innerHTML += `<ul class="subtask-list">${subtaskInput}</ul>`;
}

function changeUrgentColor() {
    let priorityImg1 = document.getElementById('img1');
    let priorityImg2 = document.getElementById('img2');
    let priorityImg3 = document.getElementById('img3');
    let urgent = document.getElementById('urgent');
    let medium = document.getElementById('medium');
    let low = document.getElementById('low');
    if (urgent.classList.contains('urgent')) {
        urgent.classList.remove('urgent');
        priorityImg1.classList.remove('white');

    } else {
        urgent.classList.add('urgent');
        low.classList.remove('low');
        medium.classList.remove('medium');
        priorityImg1.classList.add('white');
        priorityImg2.classList.remove('white');
        priorityImg3.classList.remove('white');
    }
}


function changeMediumColor() {
    let priorityImg1 = document.getElementById('img1');
    let priorityImg2 = document.getElementById('img2');
    let priorityImg3 = document.getElementById('img3');
    let urgent = document.getElementById('urgent');
    let medium = document.getElementById('medium');
    let low = document.getElementById('low');

    if (medium.classList.contains('medium')) {
        medium.classList.remove('medium');
        priorityImg2.classList.remove('white');

    } else {
        medium.classList.add('medium');
        urgent.classList.remove('urgent');
        low.classList.remove('low');
        priorityImg1.classList.remove('white');
        priorityImg2.classList.add('white');
        priorityImg3.classList.remove('white');
    }
}



function changeLowColor() {
    let priorityImg1 = document.getElementById('img1');
    let priorityImg2 = document.getElementById('img2');
    let priorityImg3 = document.getElementById('img3');
    let urgent = document.getElementById('urgent');
    let medium = document.getElementById('medium');
    let low = document.getElementById('low');

    if (low.classList.contains('low')) {
        low.classList.remove('low')
        priorityImg3.classList.remove('white');
    } else {
        low.classList.add('low')
        urgent.classList.remove('urgent')
        medium.classList.remove('medium')
        priorityImg1.classList.remove('white');
        priorityImg2.classList.remove('white');
        priorityImg3.classList.add('white');
    }
}

function userLogout() {
    if (!document.getElementById('log_out_button').classList.contains('dontShow')) {
        document.getElementById('log_out_button').classList.add('dontShow');
    }
    else {
        document.getElementById('log_out_button').classList.remove('dontShow');
    }
}

function logOut() {
    localStorage.removeItem("loggedOnUser");
    window.location.href = `login.html?msg=Du hast dich erfolgreich ausgeloggt`;
}

async function addTaskToBoard() {
    let title = document.getElementById('task-title').value;
    let category = document.getElementById('select-category').value;
    let date = document.getElementById('task-date').value;
    let taskDescription = document.getElementById('task-description').value;
    let assignedContacts = Array.from(document.getElementById('select-contact').selectedOptions)
        .map(option => {
            let fullName = option.value;
            let nameArr = fullName.split(' ');
            let initials = nameArr[0].charAt(0) + nameArr[nameArr.length - 1].charAt(0);
            return initials.toUpperCase();
        });

    let lastItem = testData[testData.length - 1];
    if (testData.length == 0) {
        let newItem = {
            "title": title,
            "cat": category,
            "description": taskDescription,
            "status": 'todo',
            "priority": priority,
            "date": date,
            "assignedContacts": assignedContacts,
            "subtasks": renderSubtasks(),
            "id": 0
        };
        testData.push(newItem);
        await backend.setItem('testData', JSON.stringify(testData));
    } else {
        let newId = Number(lastItem.id) + 1;
        let newItem = {
            "title": title,
            "cat": category,
            "description": taskDescription,
            "status": 'todo',
            "priority": priority,
            "date": date,
            "assignedContacts": assignedContacts,
            "subtasks": renderSubtasks(),
            "id": newId.toString()
        };
        testData.push(newItem);
        await backend.setItem('testData', JSON.stringify(testData));
    }
    clearInputFields();
    userAddedSuccessfull(title);
}

function renderSubtasks() {
    let resultArray = [];
    for (let i = 0; i < subtaskArray.length; i++) {
        let subtask = subtaskArray[i];
        let obj = {
            "subtask": subtask,
            "status": 'open'
        };
        resultArray.push(obj);
    }
    return resultArray;
}

function userAddedSuccessfull(title) {
    let container = document.getElementById('successfull_added');
    addAnimation();
    container.innerHTML = '';
    container.innerHTML = `
    <div>
    Aufgabe 
    <br>
    <b>${title}</b> 
    <br>
    erstellt!
    </div> 
    `;
}

function addSubtask() {
    let subtaskInput = document.getElementById('task-subtask').value;
    if (subtaskInput.length <= 2) {
        alert('Mindestens 3 Zeichen sind nötig um ein Subtask zu');
    }
    else {
        subtaskArray.push(subtaskInput);
        renderSubtasksInPopUp();
        document.getElementById('task-subtask').value = '';
    }
}



function renderSubtasksInPopUp() {
    let subTasks = document.getElementById('subtasks');
    subTasks.innerHTML = '';
    for (let i = 0; i < subtaskArray.length; i++) {
        let subtaskInput = subtaskArray[i];
        subTasks.innerHTML += `<li class="subtask-list">${subtaskInput} <button type="button" onclick="deleteSubtask(${i})" id="delete-subtask">❌</button></li>`;
    }
   
}

function deleteSubtask(i) {
    subtaskArray.splice(i, 1);
    renderSubtasksInPopUp();
}

function addAnimation() {
    let animation = document.getElementById('successfull_added');
    animation.classList.remove('display_opacity');
    animation.classList.add('successfull_added_animation');


    setTimeout(() => {
        animation.classList.remove('successfull_added_animation');
        animation.classList.add('display_opacity');
    }, 5000);
}

function clearInputFields() {
    document.getElementById('task-title').value = '';
    document.getElementById('select-category').value = '';
    document.getElementById('task-date').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('task-subtask').value = '';
    document.getElementById('select-contact').value = '';
    subtaskArray = [];
    document.getElementById('subtasks').innerHTML = '';
    if (priority == 'Urgent') {
        changeUrgentColor();
    }
    if (priority == 'Medium') {
        changeMediumColor();
    }
    if (priority == 'Low') {
        changeLowColor();
    }
}

function resetForm() {
    document.getElementById("createtask-form").reset();
    clearInputFields();
}

function showHelpMeSection() {
    document.getElementById('help-me-container').classList.remove('d-none');
    document.querySelector('main').classList.add('d-none');
}

function hideHelpMeSection() {
    document.getElementById('help-me-container').classList.add('d-none');
    document.querySelector('main').classList.remove('d-none');
}