setURL('https://gruppe-447.developerakademie.net/join/smallest_backend_ever');

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


/**
 * This function implements the template.html
 *  */
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
    await loadDataFromServer();
}

async function loadDataFromServer() {
    await downloadFromServer();
    contacts = await JSON.parse(backend.getItem('contacts')) || [];
    testData = await JSON.parse(backend.getItem('testData')) || [];
    renderData();
    parseLoggedOnUser();
}

function parseLoggedOnUser() {
    let loggedOnUser = JSON.parse(localStorage.getItem("loggedOnUser"));
    let loggedOnUserFirstChart = loggedOnUser.charAt(0);
    let loggedOnUserFirstChartToUpperCase = loggedOnUserFirstChart.toUpperCase();
    document.getElementById('display_logged_on_user').innerHTML = `${loggedOnUserFirstChartToUpperCase}`;
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
}

function renderDefaultTaskArray(stageToDo, stageProgress, stageFeedBack, stageDone) {
    for (let i = 0; i < testData.length; i++) {
        let test = testData[i];
        let finishedSubTasks = countFinishedSubtasks(test);
        if (test.status === 'todo') {
            stageToDo.innerHTML += toDoTemplate(i, test, finishedSubTasks);
            renderContactInitials(i, test, finishedSubTasks);
        }
        else if (test.status === 'inprogress') {
            stageProgress.innerHTML += progressTemplate(i, test, finishedSubTasks);
            renderContactInitials(i, test, finishedSubTasks);
        }
        else if (test.status === 'feedback') {
            stageFeedBack.innerHTML += feedBackTemplate(i, test, finishedSubTasks);
            renderContactInitials(i, test, finishedSubTasks);
        }
        else if (test.status === 'done') {
            stageDone.innerHTML += doneTemplate(i, test, finishedSubTasks);
            renderContactInitials(i, test, finishedSubTasks);
        }
        renderColors(i);
    }
}


function renderSearchedTaskArray(stageToDo, stageProgress, stageFeedBack, stageDone) {
    for (let i = 0; i < searchedTaskArray.length; i++) {
        let task = searchedTaskArray[i];
        let finishedSubTasks = countFinishedSubtasks(task);
        if (task.status === 'todo') {
            stageToDo.innerHTML += toDoTemplate(i, task, finishedSubTasks);
            renderContactInitials(i, task, finishedSubTasks);
        }
        else if (task.status === 'inprogress') {
            stageProgress.innerHTML += progressTemplate(i, task, finishedSubTasks);
            renderContactInitials(i, task, finishedSubTasks);
        }
        else if (task.status === 'feedback') {
            stageFeedBack.innerHTML += feedBackTemplate(i, task, finishedSubTasks);
            renderContactInitials(i, task, finishedSubTasks);
        }
        else if (task.status === 'done') {
            stageDone.innerHTML += doneTemplate(i, task, finishedSubTasks);
            renderContactInitials(i, task, finishedSubTasks);
        }
        renderColors(i);
    }
}

function countFinishedSubtasks(test) {
    let count = 0;
    for (let i = 0; i < test.subtasks.length; i++) {
        if (test.subtasks[i].status === 'finished') {
            count++;
        }
    }
    return count;
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
async function createTask() {
    let title = document.getElementById('task-title').value;
    let category = document.getElementById('select-category').value;
    let date = document.getElementById('task-date').value;
    let currentDate = new Date();
    let userDate = new Date(date);
    let taskDescription = document.getElementById('task-description').value;
    let assignedContacts = Array.from(document.getElementById('select-contact-add').selectedOptions)
        .map(option => {
            let fullName = option.value;
            let nameArr = fullName.split(' ');
            let initials = nameArr[0].charAt(0) + nameArr[nameArr.length - 1].charAt(0);
            return initials.toUpperCase();
        });
    let lastItem = testData[testData.length - 1];
    if (testData.length === 0) {
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
        // Condition to check if the selected item is already passed
    } else if (userDate < currentDate) {
        alert('The date you selected is already passed, please select a date in the future');
    }
    else {
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
        closeAddTaskPopUp();
        await includeHTML();
        clearInputFields();
        removePrioritys();
    }
}


async function handleSubmit(event) {
    event.preventDefault();
    await createTask();
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


async function deleteTask(i) {
    testData.splice(i, 1);
    await backend.setItem('testData', JSON.stringify(testData));
    closeEditTask();
    closeTaskPopUp();
    await includeHTML();
    location.reload();
}
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
    priorityColor = document.getElementById(`test-priority`);
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


function addSubtask() {
    let subtaskInput = document.getElementById('task-subtask').value;
    if (subtaskInput.length <= 2) {
        alert('Mindestens 3 Zeichen sind nötig um ein Subtask zu');
    }
    else {
        subtaskArray.push(subtaskInput);
        renderSubtasksInPopUp(subtaskInput);
        document.getElementById('task-subtask').value = '';
    }
}



function renderSubtasksInPopUp(subtaskInput) {
    let subTasks = document.getElementById('subtasks');
    subTasks.innerHTML += `<li class="subtask-list">${subtaskInput} <button type="button" id="delete-subtask">X</button></li>`;
}


/**
 * 
 * @param {*} i used to specify the index of the subtask that should be deleted from the subtaskArray
 */
function deleteSubtask(i) {
    subtaskArray.splice(i, 1);
    renderSubtasksInPopUp();
    renderData();
}


// Function to prevent that add subtask button submits form
let preventButton = document.getElementById('add-subtask');
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
    assignContactsToTask('edit', test);
    renderEditPriorityColors();
    showSubtasks(i);
}

function showSubtasks(i) {
    let subTasks = testData[i]['subtasks'];
    let container = document.getElementById('show_subtasks');
    container.innerHTML = '';
    for (let j = 0; j < subTasks.length; j++) {
        let subTask = subTasks[j];
        if (subTask['status'] === 'finished') {
            container.innerHTML += `
            <div class="subtask">
            <div>${subTask['subtask']}</div>
            <div id="subtask${j}">
            <button onclick="openSubtask(${i}, ${j})">✔️</button>
            </div>
            </div>
            `;
        }
        else {
            container.innerHTML += `
        <div class="subtask">
        <div>${subTask['subtask']}</div>
        <div id="subtask${j}">
        <button onclick="finishSubtask(${i}, ${j})">❌</button>
        </div>
        </div>
        `;
        }
    }

}

async function openSubtask(i, j) {
    testData[i]['subtasks'][j]['status'] = 'open';
    await backend.setItem('testData', JSON.stringify(testData));
    let container = document.getElementById(`subtask${j}`);
    container.innerHTML = `<button onclick="finishSubtask(${i}, ${j})">❌</button>`;
}

async function finishSubtask(i, j) {
    testData[i]['subtasks'][j]['status'] = 'finished';
    await backend.setItem('testData', JSON.stringify(testData));
    let container = document.getElementById(`subtask${j}`);
    container.innerHTML = `<button onclick="openSubtask(${i}, ${j})">✔️</button>`;
}

function renderEditPriorityColors(i) {
    test = testData[i];
    let priority = document.getElementById('test-priority');
    let urgentEdit = document.getElementById('urgent-edit');
    let mediumEdit = document.getElementById('medium-edit');
    let lowEdit = document.getElementById('low-edit');
    let priorityImg1Edit = document.getElementById(`img1-edit`);
    let priorityImg2Edit = document.getElementById(`img2-edit`);
    let priorityImg3Edit = document.getElementById(`img3-edit`);

    if (priority.innerHTML == 'Urgent') {
        urgentEdit.classList.add('urgent');
        priorityImg1Edit.classList.add('white');
    }
    if (priority.innerHTML == 'Medium') {
        mediumEdit.classList.add('medium');
        priorityImg2Edit.classList.add('white');
    }
    if (priority.innerHTML == 'Low') {
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


async function submitChanges(i) {
    let test = testData[i];
    let newTaskName = document.getElementById(`input-edit-${i}`).value;
    let newDescription = document.getElementById(`edit-description${i}`).value;
    let newDate = document.getElementById(`task-date-edit${i}`).value;
    let newCategory = document.getElementById(`select-category-edit${i}`).value;
    let newAssignedContact = Array.from(document.getElementById('select-contact-edit').selectedOptions)
        .map(option => {
            let fullName = option.value;
            let nameArr = fullName.split(' ');
            let initials = nameArr[0].charAt(0) + nameArr[nameArr.length - 1].charAt(0);
            return initials.toUpperCase();
        });
    let selectedContacts = document.getElementById('select-contact-add').value
    let newCategoryPopUp = document.getElementById(`category-${i}`);
    let urgentEdit = document.getElementById('urgent-edit')
    let mediumEdit = document.getElementById('medium-edit')
    let lowEdit = document.getElementById('low-edit')
    if (newPriority == undefined) {
        newPriority = checkForPrio();
        test.title = newTaskName;
        test.description = newDescription;
        test.assignedContacts = newAssignedContact;
        test.cat = newCategory;
        test.priority;
        test.date = newDate;
        newCategoryPopUp = newCategory;
        await backend.setItem('testData', JSON.stringify(testData));
        location.reload();
        closeEditTask();
        closeTaskPopUp();
        hideOrShowPriorityLevels();
        renderColors(i);
        await includeHTML();
    }
    else if (!urgentEdit.classList.contains('urgent') & !mediumEdit.classList.contains('medium') & !lowEdit.classList.contains('low')) {
        alert('Please choose a priority level for your task');
    }
    else {
        test.title = newTaskName;
        test.description = newDescription;
        test.cat = newCategory;
        test.assignedContacts = newAssignedContact;
        test.priority = newPriority;
        test.date = newDate;
        newCategoryPopUp = newCategory;
        await backend.setItem('testData', JSON.stringify(testData));
        location.reload();
        closeEditTask();
        closeTaskPopUp();
        hideOrShowPriorityLevels();
        renderColors(i);
        await includeHTML();
    }
}


function checkForPrio() {
    let urgent = document.getElementById('urgent-edit');
    if (urgent.classList.contains('urgent')) {
        return 'urgent';
    }
    let medium = document.getElementById('medium-edit');
    if (medium.classList.contains('medium')) {
        return 'medium';
    }
    let low = document.getElementById('low-edit');
    if (low.classList.contains('low')) {
        return 'low';
    }
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


/**
 * clear the input fields 
 */
function clearInputFields() {
    let input = document.getElementById('task-title');
    let selectCategory = document.getElementById('select-category');
    let selectContacts = document.getElementById('select-contact-add');
    let taskDate = document.getElementById('task-date');
    let taskDescription = document.getElementById('task-description');
    let subTasks = document.getElementById('task-subtask');
    subTasks.value = '';
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


async function dropItem(status) {
    testData[currentDraggedItemId]['status'] = status;
    await backend.setItem('testData', JSON.stringify(testData));
    await includeHTML();
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


function assignContactsToTask(value, test) {
    if (test == undefined) {
        let contactList = document.getElementById(`select-contact-${value}`);
        contactList.innerHTML = '';
        contactList.innerHTML = `<option value="" disabled="" selected="" hidden="">Select new contact to assign</option>`;
        for (let i = 0; i < contacts.length; i++) {
            let contact = contacts[i];
            contactList.innerHTML += `<option value="${contact['name']}">${contact['name']}</option>`;
        }
    }
    else {
        let contactList = document.getElementById(`select-contact-${value}`);
        contactList.innerHTML = '';
        contactList.innerHTML = `<option value="${test['assignedContacts']}" disabled="" selected="" hidden="">Select new contact to assign</option>`;
        for (let i = 0; i < contacts.length; i++) {
            let contact = contacts[i];
            contactList.innerHTML += `<option value="${contact['name']}">${contact['name']}</option>`;
        }
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
        if (input.trim() === '') {
            searchedTaskArray = [];
            renderData();
            break;
        }
        if (task.includes(input)) {
            searchedTaskArray.push(searchedTask);

        }
    }
    renderData();
} 
