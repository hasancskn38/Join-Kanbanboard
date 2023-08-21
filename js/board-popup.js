let currentEditIndex;

/**
 * open popup for more information on a task
 * @param {*} i is each element from testData JSON array
 */
function openTaskPopUp(i) {
    let test = testData[i];
    let contact = contacts[i];
    let taskPopUp = document.getElementById(`task-popup`);
    document.querySelector('body').classList.add('overflow-hidden');
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    document.getElementById('side_bar').style.zIndex = 1;
    taskPopUp.classList.remove('d-none');
    document.getElementById('overlay').classList.remove('d-none');
    taskPopUp.innerHTML = openTaskPopUpTemplate(test, i, contact);
    showResponsiveStage(i);
    renderContactPopupInitials(i);
    renderContactInitials(i);
    changePriorityColorPopUp();
}


function renderContactPopupInitials(i) {
    let task = testData[i];
    let assignedContactsContainer = document.getElementById(`assigned-popup-contacts-${i}`);
    let existingSpans = assignedContactsContainer.getElementsByTagName('span');
    for (let j = 0; j < task['assignedContacts'].length; j++) {
        let contactName = task['assignedContacts'][j];
        let foundMatch = false;
        for (let k = 0; k < existingSpans.length; k++) {
            if (existingSpans[k].innerHTML === contactName) {
                foundMatch = true;
                break;
            }
        }
        if (!foundMatch) {
            let spanElement = document.createElement('span');
            spanElement.innerHTML = contactName;
            assignedContactsContainer.appendChild(spanElement);
        }
    }
}


function isContactNamePresent(i) {
    let task = testData[i];
    for (let j = 0; j < contacts.length; j++) {
        let contact = contacts[j];
        for (let k = 0; k < task['assignedContacts'].length; k++) {
            let contactName = task['assignedContacts'][k];
            if (contact['name'] === contactName) {
                selectContact(j);
                return;
            }
        }
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


/**
 * Adds the subtask to task
 *
 */
function renderSubtasksInPopUp(value) {
    let subTasks = document.getElementById(`subtasks_${value}`);
    subTasks.innerHTML = '';
    for (let i = 0; i < subtaskArray.length; i++) {
        let subtaskInput = subtaskArray[i];
        subTasks.innerHTML += `<li class="subtask-list">${subtaskInput} <button type="button" onclick="deleteSubtask(${i})" id="delete-subtask">❌</button></li>`;
    }

}

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
    renderEditPriorityColors(i);
    showSubtasks(i);
    currentEditIndex = i; // Store the value of 'i' in the global variable
  }
  

/**
 * renders the subtask to the board
 *
 * @param {string} i - index of the right task
 */
function showSubtasks(i) {
    let subTasks = testData[i]['subtasks'];
    let container = document.getElementById('show_subtasks');
    container.innerHTML = '';
    for (let j = 0; j < subTasks.length; j++) {
        let subTask = subTasks[j];
        if (subTask['status'] === 'finished') {
            container.innerHTML += renderFinishedSubtask(subTask, j, i);
        } else {
            container.innerHTML += renderNonFinishedSubtask(subTask, j, i);
        }
    }
}

/**
 * rendering finished subtasks to the task
 *
 * @param {string} subTask - subtask values
 * @param {string} j - index of the right subtask
 * @param {string} i - index of the right task
 */
function renderFinishedSubtask(subTask, j, i) {
    return `
    <div class="subtask">
        <div>${subTask['subtask']}</div>
        <div id="subtask${j}">
            <button onclick="openSubtask(${i}, ${j})">✔️</button>
        </div>
    </div>
    `;
}

/**
 * rendering finished subtasks to the task
 *
 * @param {string} subTask - subtask values
 * @param {string} j - index of the right subtask
 * @param {string} i - index of the right task
 */
function renderNonFinishedSubtask(subTask, j, i) {
    return `
    <div class="subtask">
        <div>${subTask['subtask']}</div>
        <div id="subtask${j}">
            <button onclick="finishSubtask(${i}, ${j})">🔲</button>
        </div>
    </div>
    `;
}


/**
 * changing the stage from progress to feedback 
 *
 * @param {string} i - index of the right task
 */
async function updateStageOption(i) {
    let stageValue = document.getElementById(`stage_option${i}`);
    testData[i]['status'] = stageValue.value;
    await backend.setItem('testData', JSON.stringify(testData));
    await includeHTML();
}


/**
 * rendering finished subtasks to the task
 *
 * @param {string} j - index of the right subtask
 * @param {string} i - index of the right task
 */
async function openSubtask(i, j) {
    testData[i]['subtasks'][j]['status'] = 'open';
    await backend.setItem('testData', JSON.stringify(testData));
    let container = document.getElementById(`subtask${j}`);
    container.innerHTML = `<button onclick="finishSubtask(${i}, ${j})">🔲</button>`;
}

/**
 * rendering finished subtasks to the task
 *
 * @param {string} subTask - subtask values
 * @param {string} j - index of the right subtask
 * @param {string} i - index of the right task
 */
async function finishSubtask(i, j) {
    testData[i]['subtasks'][j]['status'] = 'finished';
    await backend.setItem('testData', JSON.stringify(testData));
    let container = document.getElementById(`subtask${j}`);
    container.innerHTML = `<button onclick="openSubtask(${i}, ${j})">✔️</button>`;
}


/**
 * saves the changes
 *
 * @param {string} i - index of task
 */
async function submitChanges(i) {
    document.getElementById('search-input').value = '';
    searchTask();
    let newTaskName = document.getElementById(`input-edit-${i}`).value;
    let newDescription = document.getElementById(`edit-description${i}`).value;
    let newDate = document.getElementById(`task-date-edit${i}`).value;
    let urgentEdit = document.getElementById('urgent-edit');
    let mediumEdit = document.getElementById('medium-edit');
    let lowEdit = document.getElementById('low-edit');
    let assignedContacts = document.getElementById(`assigned-contacts-${i}`);
    await saveChangesSubmit(newTaskName, newDescription, newDate, urgentEdit, mediumEdit, lowEdit, i, assignedContacts);
}

/**
 * changes the task with ne info
 *
 * @param {string} newTaskName - new name for task
 * @param {string} newDescription - new description for task
 * @param {string} newDate - new date for task
 * @param {string} urgentEdit - prio for the task
 * @param {string} mediumEdit - prio for the task
 * @param {string} lowEdit - prio for the task
 * @param {string} i - index of the task
 */
async function saveChangesSubmit(newTaskName, newDescription, newDate, urgentEdit, mediumEdit, lowEdit, i) {
    let test = testData[i];
    if (newPriority == undefined) {
        getChangesWithPrio(test, newTaskName, newDescription, newDate);
        await saveSubmitChanges();
    } else if (!urgentEdit.classList.contains('urgent') & !mediumEdit.classList.contains('medium') & !lowEdit.classList.contains('low')) {
        alert('Please choose a priority level for your task');
    } else {
        getChangesWithoutPrio(test, newTaskName, newDescription, newDate);
        await saveSubmitChanges();
    }
}

/**
 * changes the task with ne info
 *
 * @param {string} newTaskName - new name for task
 * @param {string} newDescription - new description for task
 * @param {string} newDate - new date for task
 * @param {string} test - task from array
 */
function getChangesWithPrio(test, newTaskName, newDescription, newDate) {
    test.title = newTaskName;
    test.description = newDescription;
    test.assignedContacts = assignedContacts;
    test.priority;
    test.date = newDate;
}

/**
 * changes the task with ne info
 *
 * @param {string} newTaskName - new name for task
 * @param {string} newDescription - new description for task
 * @param {string} newDate - new date for task
 * @param {string} test - task from array
 */
function getChangesWithoutPrio(test, newTaskName, newDescription, newDate) {
    test.title = newTaskName;
    test.description = newDescription;
    test.priority = newPriority;
    test.assignedContacts = assignedContacts;
    test.date = newDate;
}


/**
 * saves the changes to the task in backend
 *
 */
async function saveSubmitChanges() {
    await backend.setItem('testData', JSON.stringify(testData));
    closeEditTask();
    closeTaskPopUp();
    hideOrShowPriorityLevels();
    await includeHTML();
}

/**
 * checking for prio in task
 *
 */
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

/**
 * close edit task popup
 *
 */
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
    inputClear(input, selectContacts, taskDate, taskDescription, subTasks, subTasksPopup);
}

/**
 * clearing all input fields
 *
 * @param {string} input - new name for task
 * @param {string} selectContacts - contacts in task
 * @param {string} taskDate - date for task
 * @param {string} taskDescription - task description 
 * @param {string} subTasks - subtask from task
 * @param {string} subTasksPopup - subtask from task in popup
 */
function inputClear(input, selectContacts, taskDate, taskDescription, subTasks, subTasksPopup) {
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


/**
 * opens the popup of the shown task
 *
 */
function openAddTaskPopUp(value) {
    taskStatus = value;
    document.getElementById('overlay').classList.remove('d-none');
    document.querySelector('body').classList.add('overflow-hidden');
    document.getElementById('popup').classList.remove('hide');
    document.getElementById('popup').classList.add('show');
    document.getElementById('popup').classList.remove('d-none');
    document.getElementById('side_bar').style.zIndex = 1;
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}