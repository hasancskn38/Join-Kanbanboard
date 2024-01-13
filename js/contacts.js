setURL('https://hasan-coskun.com/join/smallest_backend_ever');
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
let selectNewCategory = '';

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

/**
 * is rendering the current page url into a variable
 *
 */
function getCurrentPage() {
    let currentPagePath = window.location.pathname;
    let htmlName = currentPagePath.split("/").pop().substring(0, currentPagePath.split("/").pop().lastIndexOf("."));
    document.getElementById(`menu_${htmlName}`).classList.add(htmlName);
}

function openPopupUserFeedback() {
    let popup = document.getElementById('user-feedback-popup');
    document.getElementById('overlay-feedback').classList.remove('d-none');
    popup.classList.add('fade-in');
    popup.style.display = 'flex';
}

function closePopupUserFeedback() {
    let popup = document.getElementById('user-feedback-popup');
    document.getElementById('overlay-feedback').classList.add('d-none');
    popup.classList.remove('fade-in');
    popup.style.display = 'none';
}

/**
 * parses the logged on user
 *
 */
function parseLoggedOnUser() {
    let loggedOnUser = JSON.parse(localStorage.getItem("loggedOnUser"));
    let loggedOnUserFirstChart = loggedOnUser.charAt(0);
    let loggedOnUserFirstChartToUpperCase = loggedOnUserFirstChart.toUpperCase();
    document.getElementById('display_logged_on_user').innerHTML = `${loggedOnUserFirstChartToUpperCase}`;
}

/**
 * getting the latters of the contact
 *
 * @param {string} contactContainer - the container to get rendered in
 *  * @param {string} greatLetter - the first latter of contact
 */
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

/**
 * Rendering the contact
 *
 */
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

/**
 * finds the first letter from the contact
 *
 * @param {string} contactFirstLetter - gets the first letter from the contact
 */
function firstLetter(contactFirstLetter) {
    let index = letters.indexOf(contactFirstLetter);
    return { letter: contactFirstLetter, index: index };

}

/**
 * Is adding a new contact
 *
 */
async function AddNewContact() {
    let name = document.getElementById('new-contact-name');
    let email = document.getElementById('new-contact-email');
    let phone = document.getElementById('new-contact-phone');
    let color = randomColor();
    contacts.push({ name: name.value, email: email.value, phone: phone.value, randomColors: color });
    document.getElementById('addcontactlayout').classList.add('d-nones');
    await editSave();
    document.getElementById('user-feedback-popup-message').innerHTML = `Added ${name.value} to contacts.`;
    openPopupUserFeedback();
    setTimeout(() => {
        closePopupUserFeedback();
    }, 2500);
}


function openDetailContact(bothFirstLetter, contactColor, contactName, contactEmail, contactPhone, i) {
    let contactDetail = document.getElementById('layout-contact4');
    contactDetail.innerHTML = '';
    contactDetail.innerHTML = renderOpenDetailContact(bothFirstLetter, contactColor, contactName, contactEmail, contactPhone, i);
    highlightClickedContact(i);
}

/**
 * shows and highlights the clicked contact 
 *
 * @param {string} i - index of the clicked contact 
 */
function highlightClickedContact(i) {
    let highlightedContacts = document.getElementsByClassName('highlight_contact');
    while (highlightedContacts.length) {
        highlightedContacts[0].classList.remove('highlight_contact');
    }
    document.getElementById(`contact_nr${i}`).classList.add('highlight_contact');

}

/**
 * shows the help me section
 *
 */
function showHelpMeSection() {
    document.getElementById('help-me-container').classList.remove('d-none');
    document.getElementById('main_right').classList.add('d-none');
}

/**
 * hides the help me section
 *
 */
function hideHelpMeSection() {
    document.getElementById('help-me-container').classList.add('d-none');
    document.getElementById('main_right').classList.remove('d-none');
}

/**
 * is deleteing the logged on user from the local storage and is logging it out
 *
 */
function userLogout() {
    if (!document.getElementById('log_out_button').classList.contains('dontShow')) {
        document.getElementById('log_out_button').classList.add('dontShow');
    }
    else {
        document.getElementById('log_out_button').classList.remove('dontShow');
    }
}

/**
 * is deleteing the logged on user from the local storage and is logging it out
 *
 */
function logOut() {
    localStorage.removeItem("loggedOnUser");
    window.location.href = `index.html?msg=Du hast dich erfolgreich ausgeloggt`;
}

/**
 * closing the overlay
 *
 */
function closeOverlay() {
    closeAddTaskPopUp();
    closeAddTaskPopUp();
}

overlay.addEventListener('click', closeOverlay);


/**
 * is rendering a contact to the select list
 *
 */
function renderContacts() {
    let contactContainer = document.getElementById('select-contact-add');
    contactContainer.innerHTML = '';
    contactContainer.innerHTML = `<option value="" disabled="" selected="" hidden="">Select contacts to assign</option>`;
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        contactContainer.innerHTML += `<option value="${contact['name']}">${contact['name']}</option>`;
    }
}


/**
 * is creating a task and opens the details of the task
 *
 */
async function getTaskDetails() {
    let title = document.getElementById('task-title').value;
    let category = getNewCategory();
    let date = document.getElementById('task-date').value;
    let taskDescription = document.getElementById('task-description').value;
    return { title, category, date, taskDescription };
}

/**
 * getting the id of the task
 *
 */
function getLastItemId() {
    let lastItem = testData[testData.length - 1];
    return lastItem ? Number(lastItem.id) : null;
}



/**
 * slides back the create task popup
 *
 */
function slideBack() {
    document.getElementById('detail-main').classList.add('detail-main-slide-back');
    document.getElementById('detail-main').classList.add('d-nones');
}

/**
 * clears the inputs of all fields
 *
 */
function clearInputs() {
    document.getElementById('new-contact-name').value = '';
    document.getElementById('new-contact-email').value = '';
    document.getElementById('new-contact-phone').value = '';
    document.getElementById('display-categories').innerHTML = `
    <p id="select-category-inner">Select task category</p>
    <img id="dropwdown-icon" class="dropdown-icon" src="../assets/icons/dropdown.png" alt="">
    `;
}

/**
 * clears the inputs of all fields
 *
 */
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

/**
 * is creating the first letters of the contacts
 *
 */
function creatSingleLetters() {
    filterFirstLetter();
}


/**
 * splits the name into the first two letters and returns
 *
 * @param {string} fullName - full name of the contact
 */
function splitName(fullName) {
    let namePara = fullName.split(" ");
    let firstName = namePara[0];
    let lastName = namePara[namePara.length - 1];
    let bothFirstLetter = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
    return bothFirstLetter;
}

/**
 * splits the name into the first two letters and returns
 *
 */
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

/**
 * makes the letters big to upper case
 *
 * @param {string} contactName - full name of the contact
 */
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

/**
 * closes the popup to add a contact
 *
 */
function closeAddContact() {
    document.getElementById('addcontactlayout').classList.add('d-nones');
    document.getElementById('editContactLayout').classList.add('d-nones');
}

/**
 * opens the popup to add a contact
 *
 */
function openAddContact() {
    renderAddNewContactTemp();
    document.getElementById('addcontactlayout').classList.remove('d-nones');
}

/**
 * closes the popup to add a contact
 *
 * @param {string} event - submit event beaing created
 */
function doNotClose(event) {
    event.stopPropagation();
}

// /**
//  * closes the popup to add a contact
//  *
//  */
// function closeAddContact2() {
//     document.getElementById('addcontactlayout').classList.add('d-nones');
//     document.getElementById('editContactLayout').classList.add('d-nones');
// }

/**
 * addes new contact 
 *
 */
function renderAddNewContactTemp() {
    let newContact = document.getElementById('addcontactlayout');
    newContact.innerHTML = '';
    newContact.innerHTML = redenderAddNewContactTemp2();
}

/**
 * opens the edit function for a contact
 *
 * @param {string} contactName - Name of contact
 * @param {string} contactEmail - email of contact
 * @param {string} contactPhone - phone of contact
 * @param {string} contactColor - color of contact
 * @param {string} bothFirstLetter - letters of the contact 
 * @param {string} i - index of the contact
 */
function openEdit(contactName, contactEmail, contactPhone, contactColor, bothFirstLetter, i) {
    document.getElementById('editContactLayout').classList.remove('d-nones');
    let editContact = document.getElementById('editContactLayout');
    editContact.innerHTML = '';
    editContact.innerHTML = renderOpenEdit(contactName, contactEmail, contactPhone, contactColor, bothFirstLetter, i);
}

/**
 * opens the edit function for a contact and saves
 *
 * @param {string} i - index of the contact
 */
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
    openPopupUserFeedback();
    document.getElementById('user-feedback-popup-message').innerHTML = `Saved changes.`
    setTimeout(() => {
        closePopupUserFeedback();
    }, 2500);
}


/**
 * saves the contact item to the backed
 *
 */
async function editSave() {
    await backend.setItem('contacts', JSON.stringify(contacts));
    await backend.setItem('letters', JSON.stringify(letters));
    showContacts();
}

/**
 * splices the contact and saves to the backend
 *
 */
async function deleteContact(i) {
    let contact = contacts[i];
    document.getElementById('user-feedback-popup-message').innerHTML = `Deleted ${contact.name} from contacts.`;
    openPopupUserFeedback();
    setTimeout(() => {
        closePopupUserFeedback();
    }, 2500);
    contacts.splice(i, 1);
    slideBack();
    await editSave();
}

/**
 * opens the dropdown for to select the contact
 *
 */
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

/**
 * select the contact to the task
 *
 * @param {string} i - index of the contact
 */
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

/**
 * the user is already assigned and gets removed from the selection 
 *
 * @param {string} i - index of the contact
 */
function alreadyAssignedContact(i) {
    let container = document.getElementById(`dropdown_checkbox${i}`).innerHTML;
    if (container == '▣') {
        return true;
    }
    if (container == '▢') {
        return false;
    }
}