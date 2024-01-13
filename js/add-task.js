setURL('https://hasan-coskun.com/join/smallest_backend_ever');
let testData = [];
let contacts = [];
let priorityColor;
let priority;
let currentDraggedItemId;
let newPriority;
let searchedTaskArray = [];
let subtaskArray = [];
let selectElement = document.getElementById('select-contact');
let initialsDiv = document.getElementById('initials-div');
let dropDownShow = false;
let assignedContacts = [];
let createdCategorys = [];
let newCategoryColor;
let selectNewCategory = '';
let today = new Date().toISOString().split('T')[0];
document.getElementById('task-date').setAttribute('min', today);


/**
 * rendering backend data from json / including sidebar 
 *
 * 
 */
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
    getCurrentPage();
}


/**
 * Getting current page url
 *
 * 
 */
function getCurrentPage() {
    let currentPagePath = window.location.pathname;
    let htmlName = currentPagePath.split("/").pop().substring(0, currentPagePath.split("/").pop().lastIndexOf("."));
    document.getElementById(`menu_${htmlName}`).classList.add(htmlName);
}


/**
 * Getting logged on User who is saved in local storage
 *
 * 
 */
function parseLoggedOnUser() {
    let loggedOnUser = JSON.parse(localStorage.getItem("loggedOnUser"));
    let loggedOnUserFirstChart = loggedOnUser.charAt(0);
    let loggedOnUserFirstChartToUpperCase = loggedOnUserFirstChart.toUpperCase();
    document.getElementById('display_logged_on_user').innerHTML = `${loggedOnUserFirstChartToUpperCase}`;
}


/**
 * Savind backend data into global variables
 *
 * 
 */
async function renderAllBackendData() {
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    testData = JSON.parse(backend.getItem('testData')) || [];
    createdCategorys = JSON.parse(backend.getItem('createdCategorys')) || [];
    parseLoggedOnUser();
}


/**
 * Rendering Contacts into selection
 *
 * 
 */
function renderAllContacts() {
    let contactContainer = document.getElementById('select-contact');
    contactContainer.innerHTML = '';
    contactContainer.innerHTML = `<option value="" disabled="" selected="" hidden="">Select contacts to assign</option>`;
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        contactContainer.innerHTML += `<option value="${contact['name']}">${contact['name']}</option>`;
    }
}

document.getElementById('urgent').addEventListener('click', function () {
    setPriority('Urgent');
});

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

/**
 * a subtask is included to the task
 *
 * 
 */
function addSubtask() {
    let subtaskInput = document.getElementById('task-subtask').value;
    renderSubtasksInPopUp(subtaskInput);
    subtaskArray.push(subtaskInput);
    document.getElementById('task-subtask').value = '';
}

/**
 * the function to show to subtask 
 *
 * @param {string} subtaskInput - the input value to save
 */
function renderSubtasksInPopUp(subtaskInput) {
    let subTasks = document.getElementById('subtasks');
    subTasks.innerHTML += `<ul class="subtask-list">${subtaskInput}</ul>`;
}


/**
 * Is changing the color from the priority
 *
 * 
 */
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
        changeUrgentColorEdit(priorityImg1, priorityImg2, priorityImg3, urgent, medium, low);
    }
}

/**
 * Is changing the color from the priority at the edit
 *
 * @param {string} priorityImg1 - displays the current priority image
 * @param {string} priorityImg2 - displays the current priority image
 * @param {string} priorityImg3 - displays the current priority image
 * @param {string} urgent - displays the current priority
 * @param {string} medium - displays the current priority
 * @param {string} low - displays the current priority
 */
function changeUrgentColorEdit(priorityImg1, priorityImg2, priorityImg3, urgent, medium, low) {
    urgent.classList.add('urgent');
    low.classList.remove('low');
    medium.classList.remove('medium');
    priorityImg1.classList.add('white');
    priorityImg2.classList.remove('white');
    priorityImg3.classList.remove('white');
}

/**
 * Is changing the color from the priority
 *
 * 
 */
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
        changeMediumColorEdit(priorityImg1, priorityImg2, priorityImg3, urgent, medium, low);
    }
}

/**
 * Is changing the color from the priority at the edit
 *
 * @param {string} priorityImg1 - displays the current priority image
 * @param {string} priorityImg2 - displays the current priority image
 * @param {string} priorityImg3 - displays the current priority image
 * @param {string} urgent - displays the current priority
 * @param {string} medium - displays the current priority
 * @param {string} low - displays the current priority
 */
function changeMediumColorEdit(priorityImg1, priorityImg2, priorityImg3, urgent, medium, low) {
    medium.classList.add('medium');
    urgent.classList.remove('urgent');
    low.classList.remove('low');
    priorityImg1.classList.remove('white');
    priorityImg2.classList.add('white');
    priorityImg3.classList.remove('white');
}

/**
 * Is changing the color from the priority
 *
 * 
 */
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
        changeLowColorEdit(priorityImg1, priorityImg2, priorityImg3, urgent, medium, low);
    }
}


/**
 * Is changing the color from the priority at the edit
 *
 * @param {string} priorityImg1 - displays the current priority image
 * @param {string} priorityImg2 - displays the current priority image
 * @param {string} priorityImg3 - displays the current priority image
 * @param {string} urgent - displays the current priority
 * @param {string} medium - displays the current priority
 * @param {string} low - displays the current priority
 */
function changeLowColorEdit(priorityImg1, priorityImg2, priorityImg3, urgent, medium, low) {
    low.classList.add('low')
    urgent.classList.remove('urgent')
    medium.classList.remove('medium')
    priorityImg1.classList.remove('white');
    priorityImg2.classList.remove('white');
    priorityImg3.classList.add('white');
}

/**
 * Is logging out the User and deletes the local storage
 *
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
 * Is logging out the user and deletes the Local Storage
 *
 * 
 */
function logOut() {
    localStorage.removeItem("loggedOnUser");
    window.location.href = `index.html?msg=Du hast dich erfolgreich ausgeloggt`;
}

/**
 * returns the category which is found
 *
 * @param {string} categoryName - Is the Value of the CategoryName
 */
function findCategory(categoryName) {
    return createdCategorys.find((obj) => obj.categoryName === categoryName);
}


/**
 * main function to add the task to the board
 *
 * 
 */
// Create New Task Function
async function addTaskToBoard() {
    showDropDown();
    let category = getNewCategory();
    let date = document.getElementById('task-date').value;
    let taskDescription = document.getElementById('task-description').value;
    let title = document.getElementById('task-title').value;
    if (!validateInput(category)) {
        return;
    }
    await addNewItemToTestData(title, category, taskDescription, date);
    renderCreatedTask(title);
    openPopupUserFeedback();
    document.getElementById('user-feedback-popup-message').innerHTML = `Added task ${title} to the dashboard.`
    setTimeout(() => {
        closePopupUserFeedback();
        window.location.href = 'board.html';

    }, 2500);
}

function openPopupUserFeedback() {
    let popup = document.getElementById('user-feedback-popup');
    document.getElementById('overlay-feedback').classList.remove('d-none');
    // overlay.style.display = 'flex';
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
 * if this function is true the other code can be go further on 
 *
 * @param {string} category - the matched category to the task
 */
function validateInput(category) {
    if (category === 'No-Category') {
        return false;
    }
    if (priority === undefined) {
        priorityAlert();
        return false;
    }
    return true;
}


/**
 * new item is getting pushed into the array and saved
 *
 * @param {string} title - is the new title which is getting added to task
 * @param {string} category - is the new category which is getting added to task
 * @param {string} taskDescription - is the new taskDescription which is getting added to task
 * @param {string} date - is the new date which is getting added to task
 */
async function addNewItemToTestData(title, category, taskDescription, date) {
    let lastItem = testData[testData.length - 1];
    let newId = Number(lastItem.id) + 1;
    let newItem;
    if (testData.length === 0) {
        newItem = getNewItemWithNoId(title, category, taskDescription, date);
    } else {
        newItem = getNewItemWithId(title, category, taskDescription, date, newId);
    }
    testData.push(newItem);
    await backend.setItem('testData', JSON.stringify(testData));
}


/**
 * Rendering Tasks 
 *
 * @param {string} title - is the new title which is getting added to task
 */
async function renderCreatedTask(title) {
    await includeHTML();
    clearInputFields();
    userAddedSuccessfull(title);
    selectNewCategory = '';
    document.getElementById('display-categories').innerHTML = `
    <p id="select-category-inner">Select task category</p>
    <img id="dropwdown-icon" class="dropdown-icon" src="../assets/icons/dropdown.png" alt="">`;
}


/**
 * Returns the new task with no already existing ID
 *
 * @param {string} title - is the new title which is getting added to task
 * @param {string} category - is the new category which is getting added to task
 * @param {string} taskDescription - is the new taskDescription which is getting added to task
 * @param {string} date - is the new date which is getting added to task
 */
function getNewItemWithNoId(title, category, taskDescription, date) {
    return {
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
}


/**
 * Returns the new Task with already existing ID
 *
 * @param {string} title - is the new title which is getting added to task
 * @param {string} category - is the new category which is getting added to task
 * @param {string} taskDescription - is the new taskDescription which is getting added to task
 * @param {string} date - is the new date which is getting added to task
 */
function getNewItemWithId(title, category, taskDescription, date, newId) {
    return {
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
}

/**
 * Shows an alert when no priority is selected
 *
 */
function priorityAlert() {
    let urgent = document.getElementById('urgent');
    let medium = document.getElementById('medium');
    let low = document.getElementById('low');
    urgent.classList.add('no_category_selected');
    medium.classList.add('no_category_selected');
    low.classList.add('no_category_selected');
    changePriorityInnerHtml(urgent, medium, low);
    changePriorityDefault(urgent, medium, low);
}


/**
 * Returns to the default without alert
 *
 * @param {string} urgent - priority low is urgent
 * @param {string} medium - priority low is medium
 * @param {string} low - priority low is shown
 */
function changePriorityDefault(urgent, medium, low) {
    setTimeout(() => {
        urgent.classList.remove('no_category_selected');
        medium.classList.remove('no_category_selected');
        low.classList.remove('no_category_selected');
        changePriorityDefaultInnerHtml(urgent, medium, low)
    }, 2500);
}

/**
 * Returns to the default template without alert
 *
 * @param {string} urgent - priority low is urgent
 * @param {string} medium - priority low is medium
 * @param {string} low - priority low is shown
 */
function changePriorityDefaultInnerHtml(urgent, medium, low) {
    urgent.innerHTML = `
    <span id="urgent-inner">Urgent</span>
    <img id="img1" src="../assets/icons/urgent.png" alt="">
    `;
    medium.innerHTML = `
    <span id="medium-inner">Medium</span>
    <img id="img2" src="../assets/icons/medium.png" alt="">
    `;
    low.innerHTML = `
    <span id="low-inner">Low</span>
    <img id="img3" src="../assets/icons/low.png" alt="">
    `;
}

/**
 * Returns to the alert to the priority
 *
 * @param {string} urgent - priority low is urgent
 * @param {string} medium - priority low is medium
 * @param {string} low - priority low is shown
 */
function changePriorityInnerHtml(urgent, medium, low) {
    urgent.innerHTML = 'Select';
    medium.innerHTML = 'Select';
    low.innerHTML = 'Select';
}

/**
 * slide back the add task popup
 *
 */
function slideBack() {
    document.getElementById('detail-main').classList.add('detail-main-slide-back');
    document.getElementById('detail-main').classList.add('d-nones');
}

/**
 * Returns the new Category which is selected
 *
 */
function getNewCategory() {
    if (selectNewCategory === '') {
        document.getElementById('select-category-inner').innerHTML = 'Keine Kategorie Ausgewählt !';
        document.getElementById('select-category-inner').classList.add('no_category_selected');
        setTimeout(() => {
            document.getElementById('select-category-inner').innerHTML = 'Select task category';
            document.getElementById('select-category-inner').classList.remove('no_category_selected');
        }, 2000);
        return 'No-Category';
    }
    else {
        return selectNewCategory;
    }
}

/**
 * Is removing the Prio after adding a new task to board
 *
 */
function removePrioritys() {
    urgent.classList.remove('urgent');
    priorityImg1.classList.remove('white');
    medium.classList.remove('medium');
    priorityImg2.classList.remove('white');
    low.classList.remove('low');
    priorityImg3.classList.remove('white');

}

/**
 * Is rendering the Subtasks into the task
 *
 */
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

/**
 * Adds the subtasks
 *
 */
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


/**
 * When you click to upen a detailed Task here it will get rendered the subtasks into the task
 *
 */
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
 * Deleting the subtask
 *
 * @param {string} i - index of the subtask
 */
function deleteSubtask(i) {
    subtaskArray.splice(i, 1);
    renderSubtasksInPopUp();
}

/**
 * Clearing all inputfield from the form
 *
 */
function clearInputFields() {
    clearAllValues();
    if (priority === 'Urgent') {
        changeUrgentColor();
    }
    if (priority === 'Medium') {
        changeMediumColor();
    }
    if (priority === 'Low') {
        changeLowColor();
    }
}

/**
 * Clearing all Values from the form
 *
 */
function clearAllValues() {
    document.getElementById('task-title').value = '';
    document.getElementById('select-category-inner').value = '';
    document.getElementById('task-date').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('task-subtask').value = '';
    document.getElementById('select-contact-add').value = '';
    subtaskArray = [];
    document.getElementById('subtasks').innerHTML = '';
}

/**
 * You don't confirm the form and just want to reset the form inputs
 *
 */
function resetForm() {
    document.getElementById("createtask-form").reset();
    clearInputFields();
}

/**
 * the help me section will added
 *
 */
function showHelpMeSection() {
    document.getElementById('help-me-container').classList.remove('d-none');
    document.getElementById('createtask-form').classList.add('d-none');
}

/**
 * the help me section will get removed
 *
 */
function hideHelpMeSection() {
    document.getElementById('help-me-container').classList.add('d-none');
    document.getElementById('createtask-form').classList.remove('d-none');
}



let displayCategories = document.getElementById('display-categories');
let categorys = document.getElementById('show-categorys');
let addNewCategory = document.getElementById('add-new-category');
let newCategoryName = document.getElementById('new-category-name');
let categoryAlert = document.getElementById('category-alert');
let newCategoryContainer = document.getElementById('new-category-container');
let newCategory = document.getElementById('new-category');


/**
 * Category is getting added to task
 *
 */
// render categorys from array
function renderCategorys() {
    let categorys = document.getElementById('created-categorys');
    categorys.innerHTML = '';
    for (let i = 0; i < createdCategorys.length; i++) {
        let createdCategory = createdCategorys[i];
        let categoryElement = createCategoryElement(i, createdCategory);
        categorys.appendChild(categoryElement);
    }
}


/**
 * a category will get added to the selection
 *
 * @param {string} index - index of the category
 * @param {string} createdCategory - category data
 */
function createCategoryElement(index, createdCategory) {
    let categoryElement = document.createElement('div');
    categoryElement.id = `new-category-${index}`;
    categoryElement.classList.add('new-category');
    categoryElement.innerHTML = getCategoryTemplate(createdCategory);
    let removeButton = createRemoveButton(index, createdCategory);
    categoryElement.appendChild(removeButton);
    categoryElement.addEventListener('click', function () {
        document.getElementById('select-category-inner').innerHTML = getCategoryTemplate(createdCategory);
        selectNewCategory = createdCategory;
        document.getElementById('show-categorys').classList.add('d-none');
    });
    return categoryElement;
}


/**
 * a category will get added to the selection and there is a remove button added
 *
 * @param {string} index - index of the category
 * @param {string} createdCategory - category data
 */
function createRemoveButton(index, createdCategory) {
    let removeButton = document.createElement('button');
    removeButton.id = 'remove-button';
    removeButton.textContent = 'X';

    removeButton.addEventListener('click', function (event) {
        event.stopPropagation();
        if (createdCategorys[index] === document.getElementById('select-category-inner').textContent) {
            document.getElementById('select-category-inner').textContent = 'Select task category';
        }
        createdCategorys.splice(index, 1);
        renderCategorys();
    });

    return removeButton;
}

/**
 * a category will get added to the selection
 *
 * @param {string} createdCategory - category data
 */
function getCategoryTemplate(createdCategory) {
    return `
    <div class="new_category_item">
        <div id="category_Name_to_Task">${createdCategory['categoryName']}</div>
        <div class="${createdCategory['categoryColor']}"></div>
    </div>`;
}


/**
 * a category will get added to the selection
 *
 */
// hide or show categorylist
displayCategories.addEventListener('click', function () {

    if (categorys.classList.contains('d-none')) {
        categorys.classList.remove('d-none');
        newCategory.classList.remove('d-none');
    } else {
        categorys.classList.add('d-none');
        newCategory.classList.add('d-none');
    }
    renderCategorys();
});

/**
 * a category will get added to the selection
 *
 */
// show new category input when clicking on 'create new category'
newCategory.addEventListener('click', function () {

    categorys.classList.add('d-none');
    newCategoryContainer.classList.remove('d-none');
    displayCategories.classList.add('d-none');

});

/**
 * a category will get added to the selection
 *
 */
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

/**
 * the color of the prio will be changed
 *
 * @param {string} color - color of the prio
 */
function displayColor(color) {
    let clickedImage = event.target;
    let parentContainer = clickedImage.parentNode;
    let colorImages = parentContainer.querySelectorAll('img');
    colorImages.forEach(image => {
        if (image === clickedImage) {
            newCategoryColor = color;
            image.classList.remove('d-none');
        } else {
            image.classList.add('d-none');
        }
    });
}

/**
 * a category will get hidden
 *
 */
function hideNewCategory() {
    categorys.classList.remove('d-none');
    document.getElementById('show-categorys').classList.add('d-none');
    displayCategories.classList.remove('d-none');
    newCategoryContainer.classList.add('d-none');
    newCategoryName.value = '';
    categoryAlert.classList.add('d-none');
    const colorImages = document.querySelectorAll('.new-category-colors img');
    colorImages.forEach(image => {
        image.classList.remove('d-none');
    });
}

/**
 * a dropdown for selection the contacts to a task
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
 * a dropdown for selection the contacts to a task
 *
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
 * a contact that is already assigned will get deleted
 *
 * @param {string} i - index of the category
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