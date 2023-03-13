
setURL('https://gruppe-447.developerakademie.net/join/smallest_backend_ever');

let contacts = [];
let priority;
let testData = [];





async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
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

async function renderAllBackendData() {
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    testData = JSON.parse(backend.getItem('testData')) || [];
    renderAllContacts();
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
            "id": 0,
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
            "id": newId.toString(),
        };
        testData.push(newItem);
        await backend.setItem('testData', JSON.stringify(testData));
    }
    clearInputFields();
    userAddedSuccessfull(title);
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