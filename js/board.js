setURL('https://gruppe-447.developerakademie.net/join/smallest_backend_ever');

let testData = [
    {
        title: 'Finish UI',
        cat: 'Design',
        description: 'This is a Task Description',
        status: 'todo',
        date: '05-08-2022',
        priority: 'Urgent',
        assignedContacts: ['HC', 'CD'],
        id: '0'
    },

    {
        title: 'Finish Backend',
        cat: 'Marketing',
        description: 'This is a Task Description',
        status: 'inprogress',
        date: '05-08-2022',
        priority: 'Urgent',
        assignedContacts: ['HC', 'CD', 'CD'],
        id: '1'
    },

    {
        title: 'Look for Social Media Marketing Agency',
        cat: 'Backoffice',
        description: 'This is a Task Description',
        status: 'feedback',
        date: '05-08-2022',
        priority: 'Urgent',
        assignedContacts: ['CD', 'CD'],
        id: '2'
    },

    {
        title: 'Call with Steven',
        cat: 'Sales',
        description: 'This is a Task Description',
        status: 'done',
        date: '05-08-2022',
        priority: 'Medium',
        assignedContacts: ['HC', 'CD'],
        id: '3'
    },

    {
        title: 'Call with Test',
        cat: 'Sales',
        description: 'This is a Task Description',
        status: 'done',
        date: '05-08-2022',
        priority: 'Low',
        assignedContacts: ['CF'],
        id: '4'
    }
];

let contacts = [];
let priorityColor;
let priority;
let currentDraggedItemId;
let newPriority;
let searchedTaskArray = [];
let selectElement = document.getElementById('select-contact');
let initialsDiv = document.getElementById('initials-div');


/**
 * This function implements the template.html
 *  */
async function includeHTML() {
    await loadDataFromServer();
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
    renderData();
}
 
async function loadDataFromServer() {
    await downloadFromServer();
    contacts = await JSON.parse(backend.getItem('contacts')) || [];
    testData = await JSON.parse(backend.getItem('testData')) || [];
}


/**
 * render the data from the testData JSON Array
 */
function renderData() {
    let stageToDo = document.getElementById('stage-todo');
    stageToDo.innerHTML = '';
    let stageProgress = document.getElementById('stage-progress');
    stageProgress.innerHTML = '';
    let stageFeedBack = document.getElementById('stage-feedback');
    stageFeedBack.innerHTML = '';
    let stageDone = document.getElementById('stage-done');
    stageDone.innerHTML = '';

    if (searchedTaskArray.length === 0) {
        renderDefaultTaskArray(stageToDo, stageProgress, stageFeedBack, stageDone);
    }
    else {
        renderSearchedTaskArray(stageToDo, stageProgress, stageFeedBack, stageDone);
    }
    stagesContentWhenEmpty();
    hideOrShowPriorityLevels();
    changePriorityColorPopUp();
}

function renderDefaultTaskArray(stageToDo, stageProgress, stageFeedBack, stageDone) {
    for (let i = 0; i < testData.length; i++) {
        let test = testData[i];
        if (test.status === 'todo') {
            stageToDo.innerHTML += toDoTemplate(i, test);
            renderContactInitials(i, test);
        }
        else if (test.status === 'inprogress') {
            stageProgress.innerHTML += progressTemplate(i, test);
            renderContactInitials(i, test);
        }
        else if (test.status === 'feedback') {
            stageFeedBack.innerHTML += feedBackTemplate(i, test);
            renderContactInitials(i, test);
        } 
        else if (test.status === 'done') {
            stageDone.innerHTML += doneTemplate(i, test);
            renderContactInitials(i, test);
        }
        renderColors(i);
    }
}


function renderSearchedTaskArray(stageToDo, stageProgress, stageFeedBack, stageDone) {
    for (let i = 0; i < searchedTaskArray.length; i++) {
        let task = searchedTaskArray[i];
        if (task.status === 'todo') {
            stageToDo.innerHTML += toDoTemplate(i, task);
            renderContactInitials(i, task);
        }
        else if (task.status === 'inprogress') {
            stageProgress.innerHTML += progressTemplate(i, task);
            renderContactInitials(i, task);
        }
        else if (task.status === 'feedback') {
            stageFeedBack.innerHTML += feedBackTemplate(i, task);
            renderContactInitials(i, task);
        } 
        else if (task.status === 'done') {
            stageDone.innerHTML += doneTemplate(i, task);
            renderContactInitials(i, task);
        }
        renderColors(i);
    }
}


/**
 * render contact initials after a task has been assigned to a contact
 * @param {*} i is every item from the JSON Array
 * @param {*} test is the loop variable that will contain the value of the current element of the for loop
 *  */
function renderContactInitials(i, test, selectedContacts) {
    let assignedContactsContainer = document.getElementById(`assigned-contacts-${i}`);
    assignedContactsContainer.innerHTML = '';
    for (let i = 0; i < test.assignedContacts.length; i++) {
        assignedContactsContainer.innerHTML +=
            `<span>${test.assignedContacts[i]}</span>`
    }
}

/**
 * render the content of a stage when it is empty
 */
function stagesContentWhenEmpty() {
    let stageToDo = document.getElementById('stage-todo');
    let stageProgress = document.getElementById('stage-progress');
    let stageFeedBack = document.getElementById('stage-feedback');
    let stageDone = document.getElementById('stage-done');
    if (stageToDo.innerHTML == '') {
        stageToDo.innerHTML += emptyTodoTemplate();
    } if (stageProgress.innerHTML == '') {
        stageProgress.innerHTML += emptyProgressTemplate();
    } if (stageFeedBack.innerHTML == '') {
        stageFeedBack.innerHTML += emptyFeedbackTemplate();
    } if (stageDone.innerHTML == '') {
        stageDone.innerHTML += emptyDoneTemplate();
    }
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


// Create New Task Function
function createTask() {
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
            "id": 0,
        };
        testData.push(newItem);
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
    }
    closeAddTaskPopUp();
    renderData();
    clearInputFields();
    removePrioritys();
}


function handleSubmit(event) {
    event.preventDefault();
    createTask();
    closeAddTaskPopUp();
}


function deleteTask(i) {
    testData.splice(i, 1);
    closeEditTask();
    closeTaskPopUp();
    renderData();
}


//TODO Remove commenting after contacts JSON Array problem is solved
// Populate select element with options for each contact name by iterating through the contacts JSON
 contacts.forEach(contact => {
    const optionElement = document.createElement('option');
     optionElement.value = contact.name;
     optionElement.textContent = contact.name;
     selectElement.appendChild(optionElement);
 });


/**
 * create initials of a contact
 * @param {*} name is each name of the contacts from JSON Array
 * @param {*} randomColor is the randomColor from each contact
 * @returns 
 */
function createInitial(name, randomColor) {
    let span = document.createElement('span');
    span.textContent = name.charAt(0).toUpperCase();
    span.style.backgroundColor = randomColor;
    return span;
}


/**
 * get initials of a contact
 * @param {*} name is each name of the contacts from JSON Array
 * @param {*} randomColor is the randomColor from each contact
 * @returns 
 */
function getInitials(name, randomColor) {
    let names = name.split(' ');
    let initials = [];
    for (let i = 0; i < names.length; i += 2) {
        let span = document.createElement('span');
        let initialsPair = names[i].charAt(0).toUpperCase();
        if (i + 1 < names.length) {
            initialsPair += names[i + 1].charAt(0).toUpperCase();
            i++;
        }
        span.textContent = initialsPair;
        span.style.backgroundColor = randomColor;
        initials.push(span);
    }
    return initials;
}


/**
 * sets the background-color of the selected contacts to each of their randomColors
 * @param {*} selectedContacts is a const that is declared which is an array of the selected items from the select field
 */
function setBackgroundColors(selectedContacts) {
    let backgroundColors = selectedContacts.map(contact => contact.randomColors);
}

//TODO Remove commenting after problem with contacts json array is solved
// Eventlistener for each select item, which has the function to create a span for each initals of a contact
 selectElement.addEventListener('change', function () {
     // Get the selected contact objects
     const selectedContacts = Array.from(this.selectedOptions).map(option => {
         return contacts.find(contact => contact.name === option.value);
     });
     // Get the initials of the selected contacts
     const initials = selectedContacts.flatMap(contact => getInitials(contact.name, contact.randomColors));
     // Remove any existing children from the initials div
     initialsDiv.innerHTML = '';
     // Add the new initials spans to the initials div
     initials.forEach(span => {
         initialsDiv.appendChild(span);
         // Add a space between the initials
         const space = document.createTextNode('');
         initialsDiv.appendChild(space);
     });
     // Set the background color of the initialsDiv
     setBackgroundColors(selectedContacts);
 });


/**
 * open popup for more information on a task
 * @param {*} i is each element from testData JSON array
 */
function openTaskPopUp(i) {
    let test = testData[i];
    let contact = contacts[i];
    let taskPopUp = document.getElementById(`task-popup`);
    document.querySelector('body').classList.add('overflow-hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    taskPopUp.classList.remove('d-none');
    document.getElementById('overlay').classList.remove('d-none');
    taskPopUp.innerHTML = openTaskPopUpTemplate(test, i, contact);
    renderColors(i);
    renderContactInitials(i, test);
    changePriorityColorPopUp();
}


function changePriorityColorPopUp() {
    priorityColor = document.getElementById(`test-priority`)
    if (priorityColor.innerHTML == 'Urgent') {
        priorityColor.classList.add('urgent-popup');
    } 
    if (priorityColor.innerHTML == 'Medium') {
        priorityColor.classList.add('medium-popup');
    } 
    if (priorityColor.innerHTML == 'Low') {
        priorityColor.classList.add('low-popup');
    }
}

/**
 * close popup and return to the main page
 */
function closeTaskPopUp() {
    document.getElementById('task-popup').classList.add('d-none');
    document.getElementById('overlay').classList.add('d-none');
    document.querySelector('body').classList.remove('overflow-hidden');
}

// array where the subtask are stored 
let subtaskArray = [];
/**
 * render subtasks from subtaskArray
 */
function renderSubtasks() {
    let subtasks = document.getElementById('subtasks');
    subtasks.innerHTML = '';
    for (let i = 0; i < subtaskArray.length; i++) {
        let subtask = subtaskArray[i];
        subtasks.innerHTML += renderSubtasksTemplate(subtask, i);
    }
    renderData();
}

/**
 * add value of input field to subtask list
 */
function addSubtask() {
    let subtaskInput = document.getElementById('task-subtask').value;
    subtaskArray.push(subtaskInput);
    renderSubtasks();
    document.getElementById('task-subtask').value = '';
}


/**
 * render subtasks in popup 
 */
function renderSubtasksInPopUp() {
    let subTasks = document.getElementById('subtask');
}


/**
 * 
 * @param {*} i used to specify the index of the subtask that should be deleted from the subtaskArray
 */
function deleteSubtask(i) {
    subtaskArray.splice(i, 1);
    renderSubtasks();
    renderData();
}


// Function to prevent that add subtask button submits form
let preventButton = document.getElementById('add-subtask')
preventButton.addEventListener('click', function (event) {
    // Prevent the form from being submitted
    event.preventDefault();
});


/**
 * opens the popup where someone change specific aspects of each task
 * @param {*} i used to specify the index of the element from the testData JSON
 */
function openEditTask(i) {
    let test = testData[i];
    let contact = contacts[i];
    let editTask = document.getElementById('edit-task-popup');
    let taskPopUp = document.getElementById(`task-popup`).classList.add('d-none');
    editTask.classList.remove('d-none');
    editTask.innerHTML = openEditTaskPopUp(test, i);
    assignContactsToTask('edit');
    renderEditPriorityColors();
}

function renderEditPriorityColors(i) {
    test = testData[i]
    let priority = document.getElementById('test-priority');
    let urgentEdit = document.getElementById('urgent-edit');
    let mediumEdit = document.getElementById('medium-edit');
    let lowEdit = document.getElementById('low-edit');
    let priorityImg1Edit = document.getElementById(`img1-edit`);
    let priorityImg2Edit = document.getElementById(`img2-edit`);
    let priorityImg3Edit = document.getElementById(`img3-edit`);
    
    if(priority.innerHTML == 'Urgent') {
        urgentEdit.classList.add('urgent');
        priorityImg1Edit.classList.add('white');
    }
    if(priority.innerHTML == 'Medium') {
        mediumEdit.classList.add('medium');
        priorityImg2Edit.classList.add('white');
    }
    if(priority.innerHTML == 'Low') {
        lowEdit.classList.add('low');
        priorityImg3Edit.classList.add('white');
    }
}


function editPriority(value) {
    newPriority = value;
}


function changeUrgentColorEdit() {
    let priorityImg1Edit = document.getElementById(`img1-edit`);
    let priorityImg2Edit = document.getElementById(`img2-edit`);
    let priorityImg3Edit = document.getElementById(`img3-edit`);
    let urgentEdit = document.getElementById(`urgent-edit`);
    let mediumEdit = document.getElementById(`medium-edit`);
    let lowEdit = document.getElementById(`low-edit`);
    if (urgentEdit.classList.contains('urgent')) {
        urgentEdit.classList.remove('urgent');
        priorityImg1Edit.classList.remove('white');

    } else {
        urgentEdit.classList.add('urgent');
        lowEdit.classList.remove('low');
        mediumEdit.classList.remove('medium');
        priorityImg1Edit.classList.add('white');
        priorityImg2Edit.classList.remove('white');
        priorityImg3Edit.classList.remove('white');
    }
}


function changeMediumColorEdit() {
    let priorityImg1Edit = document.getElementById(`img1-edit`);
    let priorityImg2Edit = document.getElementById(`img2-edit`);
    let priorityImg3Edit = document.getElementById(`img3-edit`);
    let urgentEdit = document.getElementById(`urgent-edit`);
    let mediumEdit = document.getElementById(`medium-edit`);
    let lowEdit = document.getElementById(`low-edit`);
    if (mediumEdit.classList.contains('medium')) {
        mediumEdit.classList.remove('medium');
        priorityImg2Edit.classList.remove('white');

    } else {
        mediumEdit.classList.add('medium');
        urgentEdit.classList.remove('urgent');
        lowEdit.classList.remove('low');
        priorityImg1Edit.classList.remove('white');
        priorityImg2Edit.classList.add('white');
        priorityImg3Edit.classList.remove('white');
    }
}


function changeLowColorEdit() {
    let priorityImg1Edit = document.getElementById(`img1-edit`);
    let priorityImg2Edit = document.getElementById(`img2-edit`);
    let priorityImg3Edit = document.getElementById(`img3-edit`);
    let urgentEdit = document.getElementById(`urgent-edit`);
    let mediumEdit = document.getElementById(`medium-edit`);
    let lowEdit = document.getElementById(`low-edit`);
    if (lowEdit.classList.contains('low')) {
        lowEdit.classList.remove('low');
        priorityImg3Edit.classList.remove('white');
    } else {
        lowEdit.classList.add('low');
        urgentEdit.classList.remove('urgent');
        mediumEdit.classList.remove('medium');
        priorityImg1Edit.classList.remove('white');
        priorityImg2Edit.classList.remove('white');
        priorityImg3Edit.classList.add('white');
    }
}


function submitChanges(i) {
    let test = testData[i];
    let newTaskName = document.getElementById(`input-edit-${i}`).value;
    // let taskName = document.getElementById('task-popup-header');
    let newDescription = document.getElementById('edit-description').value;
    let newDate = document.getElementById('task-date-edit').value;
    // let taskTitle = document.getElementById('task-title');
    let newCategory = document.getElementById('select-category-edit').value
    let newCategoryPopUp = document.getElementById(`category-${i}`)
    if(newPriority == undefined) {
    test.title = newTaskName
    test.description = newDescription
    test.cat = newCategory
    test.priority 
    test.date = newDate
    newCategoryPopUp = newCategory
    }
    else {
    test.title = newTaskName
    test.description = newDescription
    test.cat = newCategory
    test.priority = newPriority
    test.date = newDate
    newCategoryPopUp = newCategory
    }
    closeEditTask();
    closeTaskPopUp();
    hideOrShowPriorityLevels();
    renderData();
    renderColors(i);
}


// close edit task popup
function closeEditTask() {
    document.getElementById(`task-popup`).classList.remove('d-none');
    document.getElementById('edit-task-popup').classList.add('d-none');
}



function renderColors(i) {
    let category = document.getElementById(`category-${i}`);
    if (category.innerHTML == 'Design') {
      category.classList.add('design');
    }
    if (category.innerHTML == 'Backoffice') {
      category.classList.add('backoffice');
    }
    if (category.innerHTML == 'Sales') {
      category.classList.add('sales');
    }
    if (category.innerHTML == 'Marketing') {
      category.classList.add('marketing');
    }
}


function deleteTask(i) {
    testData.splice(i, 1);
    closeEditTask();
    closeTaskPopUp();
    renderData();
}


/**
 * clear the input fields 
 */
function clearInputFields() {
    let input = document.getElementById('task-title');
    let selectCategory = document.getElementById('select-category');
    let selectContacts = document.getElementById('select-contact');
    let taskDate = document.getElementById('task-date');
    let taskDescription = document.getElementById('task-description');
    document.getElementById('initials-div').innerHTML = '';
    input.value = '';
    selectCategory.value = '';
    selectContacts.value = '';
    taskDate.value = '';
    taskDescription.value = '';
}


// Remove any priority levels
function removePrioritys() {
    urgent.classList.remove('urgent');
    priorityImg1.classList.remove('white');
    medium.classList.remove('medium');
    priorityImg2.classList.remove('white');
    low.classList.remove('low');
    priorityImg3.classList.remove('white');
}


// Drag and Drop Function Start


function startDragging(id) {
    for (let i = 0; i < testData.length; i++) {
        let index = testData[i]['id'];
        if (index == id) {
            currentDraggedItemId = i;
        }
    }
}


function allowDrop(ev) {
    ev.preventDefault();
}


function dropItem(status) {
    testData[currentDraggedItemId]['status'] = status;
    renderData();
}
// Drag and Drop Function End


// openAddTaskPopUp Function
function openAddTaskPopUp() {
    document.getElementById('overlay').classList.remove('d-none');
    document.querySelector('body').classList.add('overflow-hidden');
    document.getElementById('popup').classList.remove('hide');
    document.getElementById('popup').classList.add('show');
    document.getElementById('popup').classList.remove('d-none');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    assignContactsToTask('add');
}


function assignContactsToTask(value) {
    let contactList = document.getElementById(`select-contact-${value}`);
    contactList.innerHTML = '';
    contactList.innerHTML = `<option value="" disabled="" selected="" hidden="">Select contacts to assign</option>`;
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        contactList.innerHTML += `<option value="${contact['name']}">${contact['name']}</option>`;
    }
}

function closeAddTaskPopUp() {
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('popup').classList.add('hide');
    document.getElementById('popup').classList.remove('show');
    document.querySelector('body').classList.remove('overflow-hidden');
}

// Show Help me Container
function showHelpMeSection() {
    document.getElementById('help-me-container').classList.remove('d-none');
    document.querySelector('main').classList.add('d-none');
}


// Hide Help me Container
function hideHelpMeSection() {
    document.getElementById('help-me-container').classList.add('d-none');
    document.querySelector('main').classList.remove('d-none');
}

function searchTask() {
    let input = document.getElementById('search-input').value.toLowerCase();
    searchedTaskArray = [];
    for (let j = 0; j < testData.length; j++) {
        let task = testData[j]['title'].toLowerCase();
        let searchedTask = testData[j];
        if (input == '') {
            searchedTaskArray = [];
            renderData();
        }
        if (task.includes(input)) {
            searchedTaskArray.push(searchedTask);
        }
    }
    renderData();
} 