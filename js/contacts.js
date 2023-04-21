setURL('https://gruppe-447.developerakademie.net/join/smallest_backend_ever');
let contacts = [];
let letters = [];
let testData = [];
let priority;
let subtaskArray = [];
let dropDownShow = false;
let assignedContacts = [];
let createdCategorys = [];
let displayCategories = document.getElementById('display-categories');
let categorys = document.getElementById('show-categorys');
let addNewCategory = document.getElementById('add-new-category');
let newCategoryName = document.getElementById('new-category-name');
let categoryAlert = document.getElementById('category-alert');
let newCategoryContainer = document.getElementById('new-category-container');
let newCategory = document.getElementById('new-category');
let overlay = document.getElementById('overlay');
/**
 * Creating contanctlist
 */

async function showContacts() {
    await downloadFromServer();
    contacts = await JSON.parse(backend.getItem('contacts')) || [];
    createdCategorys = await JSON.parse(backend.getItem('createdCategorys')) || [];
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
    renderCategorys();
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
    let subTasks = document.getElementById('subtasks');
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

function findCategory(categoryName) {
    return createdCategorys.find((obj) => obj.categoryName === categoryName);
}

function renderCategorys() {
    let categorys = document.getElementById('created-categorys');
    categorys.innerHTML = '';
    for (let i = 0; i < createdCategorys.length; i++) {
        let createdCategory = createdCategorys[i];
        let categoryElement = document.createElement('div');
        categoryElement.id = `new-category-${i}`;
        categoryElement.classList.add('new-category');
        categoryElement.innerHTML = `
        <div class="new_category_item">
            <div id="category-name">${createdCategory['categoryName']}</div>
            <div class="${createdCategory['categoryColor']}"></div>
        </div>
      `;
        // Create remove button
        let removeButton = document.createElement('button');
        removeButton.id = 'remove-button';
        removeButton.textContent = 'X';

        removeButton.addEventListener('click', async function (event) {
            event.stopPropagation();
            if (createdCategorys[i] === document.getElementById('select-category-inner').textContent) {
                document.getElementById('select-category-inner').textContent = 'Select task category';
            }
            createdCategorys.splice(i, 1);
            await backend.setItem('createdCategorys', JSON.stringify(createdCategorys));
            renderCategorys();
        });
        categoryElement.appendChild(removeButton);
        // Add click event listener to select category
        categoryElement.addEventListener('click', function () {
            document.getElementById('select-category-inner').innerHTML = `
        <div class="new_category_item">
            <div id="category_Name_to_Task">${createdCategory['categoryName']}</div>
            <div class="${createdCategory['categoryColor']}"></div>
        </div>`;
            document.getElementById('show-categorys').classList.add('d-none')
        });

        categorys.appendChild(categoryElement);
    }
}


function firstLetter(contactFirstLetter) {
    let index = letters.indexOf(contactFirstLetter);
    return { letter: contactFirstLetter, index: index };

}

displayCategories.addEventListener('click', async function () {
    if (categorys.classList.contains('d-none')) {
        categorys.classList.remove('d-none');
        newCategory.classList.remove('d-none');
    } else {
        categorys.classList.add('d-none');
        newCategory.classList.add('d-none');
    }
});



newCategory.addEventListener('click', function () {
    categorys.classList.add('d-none');
    newCategoryContainer.classList.remove('d-none');
    displayCategories.classList.add('d-none');
});


function displayColor(color) {
    // Get the clicked image
    let clickedImage = event.target;
    // Get the parent container of the clicked image
    let parentContainer = clickedImage.parentNode;
    // Get all the color images in the parent container
    let colorImages = parentContainer.querySelectorAll('img');
    // Loop through each color image
    colorImages.forEach(image => {
        // Check if the clicked image matches the current image in the loop
        if (image === clickedImage) {
            newCategoryColor = color;
            // Remove the "d-none" class from the clicked image
            image.classList.remove('d-none');
        } else {
            // Add the "d-none" class to all other color images
            image.classList.add('d-none');
        }
    });
}

function clearSubtasksInput() {
    document.getElementById('task-subtask').value = '';
}


addNewCategory.addEventListener('click', async function () {
    if (newCategoryName.value == '') {
        categoryAlert.classList.remove('d-none');
    } else {
        let newCategory = {
            categoryName: newCategoryName.value,
            categoryColor: newCategoryColor
        };
        createdCategorys.push(newCategory);
        await backend.setItem('createdCategorys', JSON.stringify(createdCategorys));
        hideNewCategory();
    }
    renderCategorys();
    newCategoryColor = '';
});


function hideNewCategory() {
    categorys.classList.remove('d-none');
    document.getElementById('show-categorys').classList.add('d-none');
    displayCategories.classList.remove('d-none');
    newCategoryContainer.classList.add('d-none');
    newCategoryName.value = '';
    categoryAlert.classList.add('d-none');
    let colorImages = document.querySelectorAll('.new-category-colors img');
    colorImages.forEach(image => {
        image.classList.remove('d-none');
    });
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


function closeOverlay() {
    closeAddTaskPopUp();
    closeAddTaskPopUp();
  }


overlay.addEventListener('click', closeOverlay);


function openAddTaskPopUp() {
    document.getElementById('overlay').classList.remove('d-none');
    document.querySelector('body').classList.add('overflow-hidden');
    document.getElementById('popup').classList.remove('hide');
    document.getElementById('popup').classList.add('show');
    document.getElementById('popup').classList.remove('d-none');
    document.getElementById('side_bar').style.zIndex = 1;
    let subtaskdiv = document.getElementById('subtasks');
    subtaskdiv.innerHTML = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    let categoryName = document.getElementById('category_Name_to_Task').innerHTML;
    let category = findCategory(categoryName);
    let date = document.getElementById('task-date').value;
    let taskDescription = document.getElementById('task-description').value;
    let lastItem = testData[testData.length - 1];
    if (testData.length == 0) {
        let newItem = {
            "title": title,
            "cat": {
                categoryName: category['categoryName'],
                categoryColor: category['categoryColor']
            },
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
            "cat": {
                categoryName: category['categoryName'],
                categoryColor: category['categoryColor']
            },
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
    document.getElementById('display-categories').innerHTML = `
    <p id="select-category-inner">Select task category</p>
    <img id="dropwdown-icon" class="dropdown-icon" src="../assets/icons/dropdown.png" alt="">
    `;
}


function clearInputFields() {
    let input = document.getElementById('task-title');
    let taskDate = document.getElementById('task-date');
    let taskDescription = document.getElementById('task-description');
    let subtaskdiv = document.getElementById('task-subtask');
    input.value = '';
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





function showDropDown() {
    if (dropDownShow == false) {
        for (let i = 0; i < contacts.length; i++) {
            let contact = contacts[i];
            document.getElementById('contact_dropdown').innerHTML += `
            <div onclick="selectContact(${i})"  class="dropdown_content"><div>${contact['name']}</div> <div class="dropdown_checkbox" id="dropdown_checkbox${i}">▢</div> </div>`;
        }
        return dropDownShow = true;
    }

    if (dropDownShow == true) {
        document.getElementById('contact_dropdown').innerHTML = ``;
        return dropDownShow = false;
    }
}

function selectContact(i) {
    let contact = contacts[i];
    let alreadyAssigned = alreadyAssignedContact(i);
    if (alreadyAssigned) {
        document.getElementById(`dropdown_checkbox${i}`).innerHTML = '▢';
        let assignedContact = assignedContacts.find(ac => ac.name == contact.name);
        let j = assignedContacts.indexOf(assignedContact);
        assignedContacts.splice(j, i);
    }
    if (!alreadyAssigned) {
        document.getElementById(`dropdown_checkbox${i}`).innerHTML = '▣';
        assignedContacts.push(contacts[i].name);
    }

}

function alreadyAssignedContact(i) {
    let container = document.getElementById(`dropdown_checkbox${i}`).innerHTML;
    if (container == '▣') {
        return true;
    }
    if (container == '▢') {
        return false;
    }
}