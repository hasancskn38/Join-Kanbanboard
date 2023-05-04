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
let dropDownShow = false;
let assignedContacts = [];
let createdCategorys = [];
let newCategoryColor;
let taskStatus;
let overlay = document.getElementById('overlay');
let displayCategories = document.getElementById('display-categories');
/**
 * Function to block dates that are in the past
 */
let today = new Date().toISOString().split('T')[0];
document.getElementById('task-date').setAttribute('min', today);


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
    getCurrentPage();
}

function getCurrentPage() {
    let currentPagePath = window.location.pathname;
    let htmlName = currentPagePath.split("/").pop().substring(0, currentPagePath.split("/").pop().lastIndexOf("."));
    document.getElementById(`menu_${htmlName}`).classList.add(htmlName);
}

async function loadDataFromServer() {
    await downloadFromServer();
    contacts = await JSON.parse(backend.getItem('contacts')) || [];
    createdCategorys = await JSON.parse(backend.getItem('createdCategorys')) || [];
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

// added if condition that checks if openEditTask is open
function closeOverlay() {
    if (openEditTask) {
        closeEditTask();
    }
    closeTaskPopUp();
    closeAddTaskPopUp();
}

overlay.addEventListener('click', closeOverlay);

/**
 * render the data from the testData JSON Array
 */
function renderData() {
    let stageToDo = document.getElementById('stage-todo');
    let stageProgress = document.getElementById('stage-progress');
    let stageFeedBack = document.getElementById('stage-feedback');
    let stageDone = document.getElementById('stage-done');
    stageToDo.innerHTML = '';
    stageProgress.innerHTML = '';
    stageFeedBack.innerHTML = '';
    stageDone.innerHTML = '';

    if (searchedTaskArray.length === 0) {
        renderDefaultTaskArray(stageToDo, stageProgress, stageFeedBack, stageDone);
    }
    if (searchedTaskArray.length !== 0) {
        renderSearchedTaskArray(stageToDo, stageProgress, stageFeedBack, stageDone);
    }
    stagesContentWhenEmpty();
    hideOrShowPriorityLevels();
    renderCategorys();
}

function renderDefaultTaskArray(stageToDo, stageProgress, stageFeedBack, stageDone) {
    for (let i = 0; i < testData.length; i++) {
        let test = testData[i];
        let finishedSubTasks = countFinishedSubtasks(test);
        if (test.status === 'todo') {
            stageToDo.innerHTML += taskTemplate(i, test, finishedSubTasks);
        }
        if (test.status === 'progress') {
            stageProgress.innerHTML += taskTemplate(i, test, finishedSubTasks);
        }
        if (test.status === 'feedback') {
            stageFeedBack.innerHTML += taskTemplate(i, test, finishedSubTasks);
        }
        if (test.status === 'done') {
            stageDone.innerHTML += taskTemplate(i, test, finishedSubTasks);
        }
        renderContactInitials(i);
    }
}





function renderSearchedTaskArray(stageToDo, stageProgress, stageFeedBack, stageDone) {
    for (let i = 0; i < searchedTaskArray.length; i++) {
        let test = searchedTaskArray[i];
        let finishedSubTasks = countFinishedSubtasks(test);
        if (test.status === 'todo') {
            stageToDo.innerHTML += taskTemplate(i, test, finishedSubTasks);
        }
        if (test.status === 'inprogress') {
            stageProgress.innerHTML += taskTemplate(i, test, finishedSubTasks);
        }
        if (test.status === 'feedback') {
            stageFeedBack.innerHTML += taskTemplate(i, test, finishedSubTasks);
        }
        if (test.status === 'done') {
            stageDone.innerHTML += taskTemplate(i, test, finishedSubTasks);
        }
        renderContactInitials(i);
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
function renderContactInitials(i) {
    let task = testData[i];
    let assignedContactsContainer = document.getElementById(`assigned-contacts-${i}`);
    assignedContactsContainer.innerHTML = '';
    for (let j = 0; j < task['assignedContacts'].length; j++) {
        assignedContactsContainer.innerHTML +=
            `<span>${task['assignedContacts'][j].substring(0, 2).toUpperCase()}</span>`;
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
        stageToDo.innerHTML = emptyTaskTemplate();
    }
    if (stageProgress.innerHTML == '') {
        stageProgress.innerHTML = emptyTaskTemplate();
    }
    if (stageFeedBack.innerHTML == '') {
        stageFeedBack.innerHTML = emptyTaskTemplate();
    }
    if (stageDone.innerHTML == '') {
        stageDone.innerHTML = emptyTaskTemplate();
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

function findCategory(categoryName) {
    return createdCategorys.find((obj) => obj.categoryName === categoryName);
}

// Create New Task Function
async function createTask() {
    let title = document.getElementById('task-title').value;
    let categoryName = document.getElementById('category_Name_to_Task').innerHTML;
    let category = findCategory(categoryName);
    let date = document.getElementById('task-date').value;
    let taskDescription = document.getElementById('task-description').value;
    let lastItem = testData[testData.length - 1];
    if (testData.length === 0) {
        let newItem = {
            "title": title,
            "cat": {
                categoryName: category['categoryName'],
                categoryColor: category['categoryColor']
            },
            "description": taskDescription,
            "status": taskStatus,
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
            "status": taskStatus,
            "priority": priority,
            "date": date,
            "assignedContacts": assignedContacts,
            "subtasks": renderSubtasks(),
            "id": newId.toString()
        };
        testData.push(newItem);
        await backend.setItem('testData', JSON.stringify(testData));
        showDropDown('popup');
        closeAddTaskPopUp();
        await includeHTML();
        clearInputFields();
        removePrioritys();
    }
}


async function handleSubmit(event) {
    event.preventDefault();
    await createTask();
    subtaskArray = [];
    assignedContacts = [];

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
    document.getElementById('side_bar').style.zIndex = 1;
    taskPopUp.classList.remove('d-none');
    document.getElementById('overlay').classList.remove('d-none');
    taskPopUp.innerHTML = openTaskPopUpTemplate(test, i, contact);
    showResponsiveStage(i);
    renderContactPopupInitials(i);
    changePriorityColorPopUp();
}

function showResponsiveStage(i) {
    setInterval(() => {
        let screenWidth = window.innerWidth;
        if (document.getElementById(`stage_option${i}`) == undefined) {
            return;
        }
        if (screenWidth <= 830) {
            document.getElementById(`stage_option${i}`).classList.remove('d-none');
        }
        else {
            document.getElementById(`stage_option${i}`).classList.add('d-none');
        }
    }, 100);
}

function renderContactPopupInitials(i) {
    let task = testData[i];
    let assignedContactsContainer = document.getElementById(`assigned-popup-contacts-${i}`);
    assignedContactsContainer.innerHTML = '';
    for (let j = 0; j < task['assignedContacts'].length; j++) {
        assignedContactsContainer.innerHTML +=
            `<span>${task['assignedContacts'][j]}</span>`;
    }
}

// Adds the background color when opening popup
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
    document.getElementById('side_bar').style.zIndex = 11;
}


function addSubtask() {
    let subtaskInput = document.getElementById('task-subtask').value;
    if (subtaskInput.length <= 2) {
        alert('Mindestens 3 Zeichen sind nötig um ein Subtask zu');
    }
    else {
        subtaskArray.push(subtaskInput);
        renderSubtasksInPopUp('popup');
        document.getElementById('task-subtask').value = '';
    }
}



function renderSubtasksInPopUp(value) {
    let subTasks = document.getElementById(`subtasks_${value}`);
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
    renderSubtasksInPopUp('popup');
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
    document.getElementById('side_bar').style.zIndex = 1;
    // assignContactsToTask('edit', test);
    renderEditPriorityColors(i);
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
        <button onclick="finishSubtask(${i}, ${j})">🔲</button>
        </div>
        </div>
        `;
        }
    }

}

async function updateStageOption(i) {
    let stageValue = document.getElementById(`stage_option${i}`);
    testData[i]['status'] = stageValue.value;
    await backend.setItem('testData', JSON.stringify(testData));
    await includeHTML();
}


async function openSubtask(i, j) {
    testData[i]['subtasks'][j]['status'] = 'open';
    await backend.setItem('testData', JSON.stringify(testData));
    let container = document.getElementById(`subtask${j}`);
    container.innerHTML = `<button onclick="finishSubtask(${i}, ${j})">🔲</button>`;
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
    document.getElementById('search-input').value = '';
    searchTask();
    let test = testData[i];
    let newTaskName = document.getElementById(`input-edit-${i}`).value;
    let newDescription = document.getElementById(`edit-description${i}`).value;
    let newDate = document.getElementById(`task-date-edit${i}`).value;
    let urgentEdit = document.getElementById('urgent-edit');
    let mediumEdit = document.getElementById('medium-edit');
    let lowEdit = document.getElementById('low-edit');
    if (newPriority == undefined) {
        test.title = newTaskName;
        test.description = newDescription;
        test.assignedContacts = assignedContacts;
        test.priority;
        test.date = newDate;
        await backend.setItem('testData', JSON.stringify(testData));
        closeEditTask();
        closeTaskPopUp();
        hideOrShowPriorityLevels();
        await includeHTML();
    }
    else if (!urgentEdit.classList.contains('urgent') & !mediumEdit.classList.contains('medium') & !lowEdit.classList.contains('low')) {
        alert('Please choose a priority level for your task');
    }
    else {
        test.title = newTaskName;
        test.description = newDescription;
        test.priority = newPriority;
        test.assignedContacts = assignedContacts;
        test.date = newDate;
        await backend.setItem('testData', JSON.stringify(testData));
        closeEditTask();
        closeTaskPopUp();
        hideOrShowPriorityLevels();
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
    document.getElementById('side_bar').style.zIndex = 1;
}


/**
 * clear the input fields 
 */
function clearInputFields() {
    let input = document.getElementById('task-title');
    let selectContacts = document.getElementById('select-contact-add');
    let taskDate = document.getElementById('task-date');
    let taskDescription = document.getElementById('task-description');
    let subTasks = document.getElementById('task-subtask');
    let subTasksPopup = document.getElementById('subtasks_popup');
    displayCategories.innerHTML = `
    <p id="select-category-inner">Select task category</p>
    <img id="dropwdown-icon" class="dropdown-icon" src="../assets/icons/dropdown.png" alt="">
    `;
    subTasksPopup.innerHTML = '';
    subTasks.value = '';
    input.value = '';
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
    let stageContainer = document.getElementById('stage-container')
    stageContainer.style.transition = '';
    stageContainer.style.boxShadow = '';
    stageContainer.style.overflow = '';
    stageContainer.style.overflow = '';
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
function openAddTaskPopUp(value) {
    taskStatus = value;
    document.getElementById('overlay').classList.remove('d-none');
    document.querySelector('body').classList.add('overflow-hidden');
    document.getElementById('popup').classList.remove('hide');
    document.getElementById('popup').classList.add('show');
    document.getElementById('popup').classList.remove('d-none');
    document.getElementById('side_bar').style.zIndex = 1;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


function closeAddTaskPopUp() {
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('popup').classList.add('hide');
    document.getElementById('popup').classList.remove('show');
    document.querySelector('body').classList.remove('overflow-hidden');
    document.getElementById('side_bar').style.zIndex = 11;
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
    window.location.href = `index.html?msg=Du hast dich erfolgreich ausgeloggt`;
}
// Hide Help me Container
function hideHelpMeSection() {
    document.getElementById('help-me-container').classList.add('d-none');
    document.querySelector('main').classList.remove('d-none');
}


/* function searchTask() {
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
} */


function searchTask() {
    let searchTerm = document.getElementById('search-input').value.toLowerCase();
    let resultsTodo = document.getElementById('stage-todo');
    resultsTodo.innerHTML = '';
    let resultsProgress = document.getElementById('stage-progress');
    resultsProgress.innerHTML = '';
    let resultsFeedback = document.getElementById('stage-feedback');
    resultsFeedback.innerHTML = '';
    let resultsDone = document.getElementById('stage-done');
    resultsDone.innerHTML = '';


    if (searchTerm === '') {
        renderData();
        return;
    };

    testData.forEach((task, i) => {
        if (task.title.toLowerCase().includes(searchTerm) ||
            task.description.toLowerCase().includes(searchTerm)) {
            let resultItem = document.createElement("div");

            if (task['subtasks'].length > 0) {
                let finishedSubtasks = getFinishedSubtasks(task);
                resultItem.innerHTML = `
                <div onclick="openTaskPopUp(${i})" draggable="true" ondragstart="startDragging(${i})" id="stage-container" class="test">
                    <h3 class="task_${task['cat']['categoryColor']}" id="category-${i}">${task['cat']['categoryName']}</h3>
                    <h4>${task['description']}</h4>
                    <p id="task-title" class="grey">${task['title']}</p>

                    <div class="progress-container">
                    <progress style="width:80%" value="${finishedSubtasks}" max="${task['subtasks'].length}"></progress>
                    <div class="subtasks-done">${finishedSubtasks}/${task.subtasks.length} Done</div>
                    </div>
                <div class="progress-container">
                <div class="subtasks-done"></div>
                </div>
               
                <div class="contact-priority-container">
                <div id="assigned-contacts-${i}" class="assigned-contact"></div>
                <div class="priority-level">
                    <img id="urgent-main-6" class="" src="../assets/icons/urgent.png">
                    <img id="medium-main-6" class="d-none" src="../assets/icons/medium.png">
                    <img id="low-main-6" class="d-none" src="../assets/icons/low.png"></div>
                </div>
                </div>
                `;
            }


            else {
                resultItem.innerHTML = `
                <div onclick="openTaskPopUp(${i})" draggable="true" ondragstart="startDragging(${i})" id="stage-container" class="test">
                    <h3 class="task_${task['cat']['categoryColor']}" id="category-${i}">${task['cat']['categoryName']}</h3>
                    <h4>${task['description']}</h4>
                    <p id="task-title" class="grey">${task['title']}</p>
                <div class="progress-container">
                <div class="subtasks-done"></div>
                </div>
               
                <div class="contact-priority-container">
                <div id="assigned-contacts-${i}" class="assigned-contact"></div>
                <div class="priority-level">
                    <img id="urgent-main-6" class="" src="../assets/icons/urgent.png">
                    <img id="medium-main-6" class="d-none" src="../assets/icons/medium.png">
                    <img id="low-main-6" class="d-none" src="../assets/icons/low.png"></div>
                </div>
                </div>
                `;
            }


            if (task['status'] === 'todo') {
                resultsTodo.appendChild(resultItem);
                renderContactInitials(i);
            }
            if (task['status'] === 'progress') {
                resultsProgress.appendChild(resultItem);
                renderContactInitials(i);
            }
            if (task['status'] === 'feedback') {
                resultsFeedback.appendChild(resultItem);
                renderContactInitials(i);
            }
            if (task['status'] === 'done') {
                resultsDone.appendChild(resultItem);
                renderContactInitials(i);
            }
        }
    });
}


function getFinishedSubtasks(task) {
    let amount = 0;
    for (let i = 0; i < task.subtasks.length; i++) {
        let subtask = task.subtasks[i];
        if (subtask.status == 'finished') {
            amount++;
        }
    }
    return amount;
}

let categorys = document.getElementById('show-categorys');
let addNewCategory = document.getElementById('add-new-category');
let newCategoryName = document.getElementById('new-category-name');
let categoryAlert = document.getElementById('category-alert');
let newCategoryContainer = document.getElementById('new-category-container');
let newCategory = document.getElementById('new-category');

// render categorys from array
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


// hide or show categorylist
displayCategories.addEventListener('click', async function () {
    if (categorys.classList.contains('d-none')) {
        categorys.classList.remove('d-none');
        newCategory.classList.remove('d-none');
    } else {
        categorys.classList.add('d-none');
        newCategory.classList.add('d-none');
    }
});


// show new category input when clicking on 'create new category'
newCategory.addEventListener('click', function () {
    categorys.classList.add('d-none');
    newCategoryContainer.classList.remove('d-none');
    displayCategories.classList.add('d-none');
});


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



function showDropDown(value) {
    if (dropDownShow == false) {
        for (let i = 0; i < contacts.length; i++) {
            let contact = contacts[i];
            document.getElementById(`contact_dropdown_${value}`).innerHTML += `
            <div onclick="selectContact(${i})"  class="dropdown_content"><div>${contact['name']}</div> <div class="dropdown_checkbox" id="dropdown_checkbox${i}">▢</div> </div>`;
        }
        return dropDownShow = true;
    }

    if (dropDownShow == true) {
        document.getElementById(`contact_dropdown_${value}`).innerHTML = '';
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


