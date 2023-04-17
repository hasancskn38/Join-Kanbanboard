setURL('https://gruppe-447.developerakademie.net/join/smallest_backend_ever');
let contacts = [];
let letters = [];
let testData = [];
let priority;
let subtaskArray = [];



/**
 * Creating contanctlist
 */

async function showContacts() {
    await downloadFromServer();
    contacts = await JSON.parse(backend.getItem('contacts')) || [];
    testData = await JSON.parse(backend.getItem('testData')) || [];
    let contactContainer = document.getElementById('contactList');
    contactContainer.innerHTML = '';
    sortContacts(contacts);
    await includeHTML();
    creatSingleLetters();
    let greatLetter;
    renderLetterGroups(contactContainer, greatLetter);
    renderContact();
    parseLoggedOnUser()
    getCurrentPage();

}

function getCurrentPage() {
    let currentPagePath = window.location.pathname;
    let htmlName = currentPagePath.split("/").pop().substring(0, currentPagePath.split("/").pop().lastIndexOf("."));
    document.getElementById(`menu_${htmlName}`).classList.add(htmlName);
}

function parseLoggedOnUser() {
    let loggedOnUser = JSON.parse(localStorage.getItem("loggedOnUser"));
    let loggedOnUserFirstChart = loggedOnUser.charAt(0);
    let loggedOnUserFirstChartToUpperCase = loggedOnUserFirstChart.toUpperCase();
    document.getElementById('display_logged_on_user').innerHTML = `${loggedOnUserFirstChartToUpperCase}`;
}

function renderLetterGroups(contactContainer, greatLetter) {
    for (let i = 0; i < letters.length; i++) {
        let letter = letters[i];
        if (letter !== greatLetter && null) {
            letters.push(greatLetter);
            contactContainer.innerHTML += renderLetterContainerHTML(letter.toUpperCase(), i);
        }
        else {
            contactContainer.innerHTML += renderLetterContainerHTML(letter.toUpperCase(), i);
        }
    }
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
    let subTasks = document.getElementById('subtask');
    subTasks.innerHTML = '';
    for (let i = 0; i < subtaskArray.length; i++) {
        let subtaskInput = subtaskArray[i];
        subTasks.innerHTML += `<li class="subtask-list">${subtaskInput} <button type="button" onclick="deleteSubtask(${i})" id="delete-subtask">❌</button></li>`;
    }

}


/**
 * 
 * @param {*} i used to specify the index of the subtask that should be deleted from the subtaskArray
 */
function deleteSubtask(i) {
    subtaskArray.splice(i, 1);
    renderSubtasksInPopUp();
}


function renderContact() {
    for (let j = 0; j < contacts.length; j++) {
        let contactName = contacts[j]['name'];
        let contactFirstLetter = contactName[0];
        let contactEmail = contacts[j]['email'];
        let contactPhone = contacts[j]['phone'];
        let contactColor = contacts[j]['randomColors'];
        let bothFirstLetter = splitName(contactName);
        let greatLetter = renderBigLetter(contactName);
        let result = firstLetter(contactFirstLetter.toLowerCase());
        if (contactFirstLetter.toLowerCase() === result.letter) {
            let contactPerson = document.getElementById(`contactLetter${result.index}`);
            contactPerson.innerHTML += renderShowContactsHTML(contactColor, bothFirstLetter, contactName, contactEmail, contactPhone, j);
        }
    }

}

function firstLetter(contactFirstLetter) {
    let index = letters.indexOf(contactFirstLetter);
    return { letter: contactFirstLetter, index: index };

}



async function AddNewContact() {
    let name = document.getElementById('new-contact-name');
    let email = document.getElementById('new-contact-email');
    let phone = document.getElementById('new-contact-phone');
    let color = randomColor();
    contacts.push({ name: name.value, email: email.value, phone: phone.value, randomColors: color });
    document.getElementById('addcontactlayout').classList.add('d-nones');
    await editSave();
}


function openDetailContact(bothFirstLetter, contactColor, contactName, contactEmail, contactPhone, i) {
    let contactDetail = document.getElementById('layout-contact4');
    contactDetail.innerHTML = '';
    contactDetail.innerHTML = renderOpenDetailContact(bothFirstLetter, contactColor, contactName, contactEmail, contactPhone, i);
    highlightClickedContact(i);
}

function highlightClickedContact(i) {
    let highlightedContacts = document.getElementsByClassName('highlight_contact');
    while (highlightedContacts.length) {
        highlightedContacts[0].classList.remove('highlight_contact');
    }
    document.getElementById(`contact_nr${i}`).classList.add('highlight_contact');

}
function showHelpMeSection() {
    document.getElementById('help-me-container').classList.remove('d-none');
    document.querySelector('main').classList.add('d-none');
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
    window.location.href = `index.html?msg=Du hast dich erfolgreich ausgeloggt`;
}

// Hide Help me Container
function hideHelpMeSection() {
    document.getElementById('help-me-container').classList.add('d-none');
    document.querySelector('main').classList.remove('d-none');
}

function openAddTaskPopUp() {
    document.getElementById('overlay').classList.remove('d-none');
    document.querySelector('body').classList.add('overflow-hidden');
    document.getElementById('popup').classList.remove('hide');
    document.getElementById('popup').classList.add('show');
    document.getElementById('popup').classList.remove('d-none');
    let subtaskdiv = document.getElementById('subtask');
    subtaskdiv.innerHTML = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderContacts();
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

async function handleSubmit(event) {
    event.preventDefault();
    await createTask();
}

function renderContacts() {
    let contactContainer = document.getElementById('select-contact-add');
    contactContainer.innerHTML = '';
    contactContainer.innerHTML = `<option value="" disabled="" selected="" hidden="">Select contacts to assign</option>`;
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        contactContainer.innerHTML += `<option value="${contact['name']}">${contact['name']}</option>`;
    }
}

function closeAddTaskPopUp() {
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('popup').classList.add('hide');
    document.getElementById('popup').classList.remove('show');
    document.querySelector('body').classList.remove('overflow-hidden');
}



async function createTask() {
    let title = document.getElementById('task-title').value;
    let category = document.getElementById('select-category').value;
    let date = document.getElementById('task-date').value;
    let taskDescription = document.getElementById('task-description').value;
    let assignedContacts = Array.from(document.getElementById('select-contact-add').selectedOptions)
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
    closeAddTaskPopUp();
    clearInputFields();
    removePrioritys();
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



function removePrioritys() {
    let priorityImg1 = document.getElementById('img1');
    let priorityImg2 = document.getElementById('img2');
    let priorityImg3 = document.getElementById('img3');
    let urgent = document.getElementById('urgent');
    let medium = document.getElementById('medium');
    let low = document.getElementById('low');
    urgent.classList.remove('urgent');
    priorityImg1.classList.remove('white');
    medium.classList.remove('medium');
    priorityImg2.classList.remove('white');
    low.classList.remove('low');
    priorityImg3.classList.remove('white');
}

function slideBack() {
    document.getElementById('detail-main').classList.add('detail-main-slide-back');
    document.getElementById('detail-main').classList.add('d-nones');
}


function clearInputs() {
    document.getElementById('new-contact-name').value = '';
    document.getElementById('new-contact-email').value = '';
    document.getElementById('new-contact-phone').value = '';
}


function clearInputFields() {
    let input = document.getElementById('task-title');
    let selectCategory = document.getElementById('select-category');
    let taskDate = document.getElementById('task-date');
    let taskDescription = document.getElementById('task-description');
    let subtaskdiv = document.getElementById('task-subtask');
    document.getElementById('initials-div').innerHTML = '';
    input.value = '';
    selectCategory.value = '';
    taskDate.value = '';
    taskDescription.value = '';
    subtaskdiv.value = '';
}

function creatSingleLetters() {
    filterFirstLetter();
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

function splitName(fullName) {
    let namePara = fullName.split(" ");
    let firstName = namePara[0];
    let lastName = namePara[namePara.length - 1];
    let bothFirstLetter = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
    return bothFirstLetter;
}


function filterFirstLetter() {
    letters = [];
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let firstLetter = contact['name'].charAt(0).toLowerCase();
        if (!letters.includes(firstLetter)) {
            letters.push(firstLetter);
        }
    }
}


function renderBigLetter(contactName) {
    let letter = contactName;
    let greatLetter = letter.charAt(0).toUpperCase();
    return greatLetter;
}


/**
 * Sort contacts from a-z
 */
function sortContacts(contacts) {
    contacts = contacts.sort((a, b) => {
        let a1 = a.name.toLowerCase();
        let b1 = b.name.toLowerCase();
        return a1 < b1 ? -1 : a1 > b1 ? 1 : 0;
    });
}

/**
 * Generating random bg-color
 */
function randomColor() {
    let r = Math.floor(Math.random() * 246);
    let g = Math.floor(Math.random() * 246);
    let b = Math.floor(Math.random() * 246);

    return `rgb(${r} ,${g} , ${b})`;
}


function closeAddContact() {
    document.getElementById('addcontactlayout').classList.add('d-nones');
    document.getElementById('editContactLayout').classList.add('d-nones');
}


function openAddContact() {
    renderAddNewContactTemp();
    document.getElementById('addcontactlayout').classList.remove('d-nones');
}


function doNotClose(event) {
    event.stopPropagation();
}


function closeAddContact2() {
    document.getElementById('addcontactlayout').classList.add('d-nones');
    document.getElementById('editContactLayout').classList.add('d-nones');
}


function renderAddNewContactTemp() {
    let newContact = document.getElementById('addcontactlayout');
    newContact.innerHTML = '';
    newContact.innerHTML = redenderAddNewContactTemp2();
}


function openEdit(contactName, contactEmail, contactPhone, contactColor, bothFirstLetter, i) {

    document.getElementById('editContactLayout').classList.remove('d-nones');
    let editContact = document.getElementById('editContactLayout');
    editContact.innerHTML = '';
    editContact.innerHTML = renderOpenEdit(contactName, contactEmail, contactPhone, contactColor, bothFirstLetter, i);
}


async function editContactSave(i) {
    let contact = contacts[i];
    let newName = document.getElementById('new-edit-contact-name');
    let newMail = document.getElementById('new-edit-contact-email');
    let newPhone = document.getElementById('new-edit-contact-phone');
    contact['name'] = newName.value;
    contact['email'] = newMail.value;
    contact['phone'] = newPhone.value;
    await editSave();
    document.getElementById('layout-contact4').innerHTML = '';
    document.getElementById('editContactLayout').classList.add('d-nones');
}



async function editSave() {
    await backend.setItem('contacts', JSON.stringify(contacts));
    await backend.setItem('letters', JSON.stringify(letters));
    showContacts();
}

async function deleteContact(i) {
    contacts.splice(i, 1);
    slideBack();
    await editSave();
}




