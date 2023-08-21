setURL('https://hasan-coskun.developerakademie.net/join/smallest_backend_ever');
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
let selectNewCategory = '';
let overlay = document.getElementById('overlay');
let displayCategories = document.getElementById('display-categories');

/**
 * Function to block dates that are in the past
 */
let today = new Date().toISOString().split('T')[0];
document.getElementById('task-date').setAttribute('min', today);

/**
 * This function implements the template.html
 *  
 * */
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

/**
 * the user is already assigned and gets removed from the selection 
 *
 */
function getCurrentPage() {
    let currentPagePath = window.location.pathname;
    let htmlName = currentPagePath.split("/").pop().substring(0, currentPagePath.split("/").pop().lastIndexOf("."));
    document.getElementById(`menu_${htmlName}`).classList.add(htmlName);
}

/**
 * loading the data from backend and saves it to a variable
 *
 */
async function loadDataFromServer() {
    await downloadFromServer();
    contacts = await JSON.parse(backend.getItem('contacts')) || [];
    createdCategorys = await JSON.parse(backend.getItem('createdCategorys')) || [];
    testData = await JSON.parse(backend.getItem('testData')) || [];
    renderData();
    parseLoggedOnUser();
}

/**
 * parsing logged on user
 *
 */
function parseLoggedOnUser() {
    let loggedOnUser = JSON.parse(localStorage.getItem("loggedOnUser"));
    let loggedOnUserFirstChart = loggedOnUser.charAt(0);
    let loggedOnUserFirstChartToUpperCase = loggedOnUserFirstChart.toUpperCase();
    document.getElementById('display_logged_on_user').innerHTML = `${loggedOnUserFirstChartToUpperCase}`;
}

/**
 * added if condition that checks if openEditTask is open
 *
 */
function closeOverlay() {
    if (openEditTask) {
        closeEditTask();
    }
    closeTaskPopUp();
    closeAddTaskPopUp();
}

overlay.addEventListener('click', closeOverlay);


/**
 * clears all stages on the board before rendering
 *
 * @param {string} stageToDo - Container for the tasks todo
 * @param {string} stageProgress - Container for the tasks progress
 * @param {string} stageFeedBack - Container for the tasks Feedback
 * @param {string} stageDone - Container for the tasks Done
 */
function setStageInnerHtml(stageToDo, stageProgress, stageFeedBack, stageDone) {
    stageToDo.innerHTML = '';
    stageProgress.innerHTML = '';
    stageFeedBack.innerHTML = '';
    stageDone.innerHTML = '';
}


/**
 * is counting the finished subtasks and returning
 *
 * @param {string} test - task of the right array
 */
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
 * Create New Task Function
 *
 */
async function createTask() {
    let title = document.getElementById('task-title').value;
    let category = getNewCategory();
    if (!validateInput(title, category)) {
        return;
    }
    let date = document.getElementById('task-date').value;
    let taskDescription = document.getElementById('task-description').value;
    let newItem = createNewItem(title, category, taskDescription, date);
    await saveItem(newItem);
    updateUI();
}

/**
 * deleting the task from array and saves to backend
 *
 * @param {string} i - index of the right task
 */
async function deleteTask(i) {
    testData.splice(i, 1);
    await backend.setItem('testData', JSON.stringify(testData));
    closeEditTask();
    closeTaskPopUp();
    await includeHTML();
}

/**
 * Adds the subtask to task
 *
 */
function addSubtask() {
    let subtaskInput = document.getElementById('task-subtask').value;
    if (subtaskInput.length <= 2) {
        alert('Mindestens 3 Zeichen sind nötig um ein Subtask zu');
    } else {
        subtaskArray.push(subtaskInput);
        renderSubtasksInPopUp('popup');
        document.getElementById('task-subtask').value = '';
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

/**
 * validated the right input
 *
 * @param {string} title - category title
 * @param {string} category - category from the right task
 */
function validateInput(title, category) {
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
 * creating the new item to the task
 *
 * @param {string} title - category title
 * @param {string} category - category from the right task
 * @param {string} taskDescription - task description 
 * @param {string} date - current date
 */
function createNewItem(title, category, taskDescription, date) {
    let lastItem = testData[testData.length - 1];
    if (testData.length === 0) {
        return getNewItemWithNoId(title, category, taskDescription, date);
    } else {
        let newId = Number(lastItem.id) + 1;
        return getNewItemWithId(title, category, taskDescription, date, newId);
    }
}

/**
 * saving the new item to the task
 *
 * @param {string} newItem - new item from the task with different values
 */
async function saveItem(newItem) {
    testData.push(newItem);
    await backend.setItem('testData', JSON.stringify(testData));
}

/**
 * updates and refeshes the complete board
 *
 */
async function updateUI() {
    showDropDown('popup');
    closeAddTaskPopUp();
    await includeHTML();
    clearInputFields();
    removePrioritys();
    selectNewCategory = '';
    subtaskArray = [];
    assignedContacts = [];
}

/**
 * creating the new item to the task
 *
 * @param {string} title - category title
 * @param {string} category - category from the right task
 * @param {string} taskDescription - task description 
 * @param {string} date - current date
 */
function getNewItemWithNoId(title, category, taskDescription, date) {
    return {
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
}

/**
 * creating the new item to the task
 *
 * @param {string} title - category title
 * @param {string} category - category from the right task
 * @param {string} taskDescription - task description 
 * @param {string} date - current date
 */
function getNewItemWithId(title, category, taskDescription, date, newId) {
    return {
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
}


/**
 * getting new category for task
 *
 */
function getNewCategory() {
    if (selectNewCategory === '') {
        document.getElementById('select-category-inner').innerHTML = 'Keine Kategorie Ausgewählt !';
        document.getElementById('select-category-inner').classList.add('no_category_selected');
        setTimeout(() => {
            document.getElementById('select-category-inner').innerHTML = 'Select task category';
            document.getElementById('select-category-inner').classList.remove('no_category_selected');
        }, 2500);
        return 'No-Category';
    } else {
        return selectNewCategory;
    }
}

/**
 * is creating a task
 *
 * @param {string} event - event that is produced through clicking
 */
async function handleSubmit(event) {
    event.preventDefault();
    await createTask();
}


/**
 * responsive values generated
 *
 * @param {string} i - index of the right task
 */
function showResponsiveStage(i) {
    setInterval(() => {
        let screenWidth = window.innerWidth;
        if (document.getElementById(`stage_option${i}`) == undefined) {
            return;
        }
        if (screenWidth <= 830) {
            document.getElementById(`stage_option${i}`).classList.remove('d-none');
        } else {
            document.getElementById(`stage_option${i}`).classList.add('d-none');
        }
    }, 100);
}


// Function to prevent that add subtask button submits form
let preventButton = document.getElementById('add-subtask');
preventButton.addEventListener('click', function (event) {
    // Prevent the form from being submitted
    event.preventDefault();
});


// Drag and Drop Function Start

/**
 * starts drag function 
 *
 * @param {string} id - id for task 
 */
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

/**
 * allows the drop function 
 *
 * @param {string} ev - event for dragged object
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * renders where the dropped item gets
 *
 * @param {string} status - status of the task
 */
async function dropItem(status) {
    testData[currentDraggedItemId]['status'] = status;
    await backend.setItem('testData', JSON.stringify(testData));
    await includeHTML();
}
// Drag and Drop Function End


/**
 * is closing the task popup and the default board will be shown
 *
 */
function closeAddTaskPopUp() {
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('popup').classList.add('hide');
    document.getElementById('popup').classList.remove('show');
    document.querySelector('body').classList.remove('overflow-hidden');
    document.getElementById('side_bar').style.zIndex = 11;
}

/**
 * is deleteing the logged on user from the local storage and is logging it out
 *
 */
function userLogout() {
    if (!document.getElementById('log_out_button').classList.contains('dontShow')) {
        document.getElementById('log_out_button').classList.add('dontShow');
    } else {
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
 * shows the help me section
 *
 */
function showHelpMeSection() {
    document.getElementById('help-me-container').classList.remove('d-none');
    document.getElementById('main-column').classList.add('d-none');
}

/**
 * hides the help me section
 *
 */
function hideHelpMeSection() {
    document.getElementById('help-me-container').classList.add('d-none');
    document.getElementById('main-column').classList.remove('d-none');
}


/**
 * rendering the searched task to board
 * 
 */
function searchTask() {
    let searchTerm = document.getElementById('search-input').value.toLowerCase();
    let resultsTodo = document.getElementById('stage-todo');
    let resultsProgress = document.getElementById('stage-progress');
    let resultsFeedback = document.getElementById('stage-feedback');
    let resultsDone = document.getElementById('stage-done');
    clearResults(resultsTodo, resultsProgress, resultsFeedback, resultsDone);
    if (searchTerm === '') {
        renderData();
        return;
    };
    renderSearchedTaskToBoard(searchTerm, resultsTodo, resultsProgress, resultsFeedback, resultsDone);
}


/**
 * rendering the searched task to board
 * 
 * @param {Array} resultsTodo - array with results todo
 * @param {Array} resultsProgress - array with results progress
 * @param {Array} resultsFeedback - array with results feedbacl
 * @param {Array} resultsDone - array with results done
 */
function clearResults(resultsTodo, resultsProgress, resultsFeedback, resultsDone) {
    resultsProgress.innerHTML = '';
    resultsTodo.innerHTML = '';
    resultsFeedback.innerHTML = '';
    resultsDone.innerHTML = '';
}


/**
 * counts the finished subtasks
 * 
 * @param {string} task - right task
 */
-
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