/**
 * render the data from the testData JSON Array
 */
function renderData() {
    let stageToDo = document.getElementById('stage-todo');
    let stageProgress = document.getElementById('stage-progress');
    let stageFeedBack = document.getElementById('stage-feedback');
    let stageDone = document.getElementById('stage-done');
    setStageInnerHtml(stageToDo, stageProgress, stageFeedBack, stageDone);
    if (searchedTaskArray.length === 0) {
        renderDefaultTaskArray(stageToDo, stageProgress, stageFeedBack, stageDone);
    }
    if (searchedTaskArray.length !== 0) {
        renderSearchedTaskArray(stageToDo, stageProgress, stageFeedBack, stageDone);
    }
    renderDataFinished();
}


/**
 * renders all stages onto the board
 *
 * @param {string} stageToDo - Container for the tasks todo
 * @param {string} stageProgress - Container for the tasks progress
 * @param {string} stageFeedBack - Container for the tasks Feedback
 * @param {string} stageDone - Container for the tasks Done
 */
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


/**
 * rendering all searched task to the board
 *
 * @param {string} stageToDo - Container for the tasks todo
 * @param {string} stageProgress - Container for the tasks progress
 * @param {string} stageFeedBack - Container for the tasks Feedback
 * @param {string} stageDone - Container for the tasks Done
 */
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

/**
 * renders the task data
 *
 */
function renderDataFinished() {
    hideOrShowPriorityLevels();
    renderCategorys();
}


/**
 * render contact initials after a task has been assigned to a contact
 * @param {*} i is every item from the JSON Array
 * @param {*} test is the loop variable that will contain the value of the current element of the for loop
 *  */
function renderContactInitials(i) {
    let test = testData[i];
    let assignedContactsContainer = document.getElementById(`assigned-contacts-${i}`);
    assignedContactsContainer.innerHTML = '';

    for (let j = 0; j < test['assignedContacts'].length; j++) {
        let contactInitial = test['assignedContacts'][j].substring(0, 2).toUpperCase();

        // Check if the contact initial is already present in the container
        if (!isContactInitialPresent(assignedContactsContainer, contactInitial)) {
            let backgroundColor;
            
            // Set the background color based on the contact initial
            switch (contactInitial) {
                case 'HA':
                    backgroundColor = 'rgb(142, 236, 134)'; // Red color
                    break;
                case 'MA':
                    backgroundColor = 'rgb(245, 34, 37)';
                    break;
                case 'CH':
                    backgroundColor = 'rgb(215, 219, 134)'; // Blue color
                    break;
            }
            let spanElement = document.createElement('span');
            spanElement.id = 'assigned-contact-span';
            spanElement.innerHTML = contactInitial;
            spanElement.style.backgroundColor = backgroundColor;
            assignedContactsContainer.appendChild(spanElement);
        }
    }
}


function isContactInitialPresent(container, contactInitial) {
    // Get all the existing span elements within the container
    let spanElements = container.getElementsByTagName('span');
    // Iterate through the existing span elements and check if any matches the contact initial
    for (let i = 0; i < spanElements.length; i++) {
        if (spanElements[i].innerHTML === contactInitial) {
            return true; // Contact initial is already present
        }
    }
    return false; // Contact initial is not present
}

/**
 * is finding the correct category
 *
 * @param {string} categoryName - category name from right task
 */
function findCategory(categoryName) {
    return createdCategorys.find((obj) => obj.categoryName === categoryName);
}


/**
 * rendering the searched task to board
 * 
 * @param {string} searchTerm - searched value
 * @param {Array} resultsTodo - array with results todo
 * @param {Array} resultsProgress - array with results progress
 * @param {Array} resultsFeedback - array with results feedbacl
 * @param {Array} resultsDone - array with results done
 */
function renderSearchedTaskToBoard(searchTerm, resultsTodo, resultsProgress, resultsFeedback, resultsDone) {
    testData.forEach((task, i) => {
        if (task.title.toLowerCase().includes(searchTerm) ||
            task.description.toLowerCase().includes(searchTerm)) {
            let resultItem = document.createElement("div");
            if (task['subtasks'].length > 0) {
                let finishedSubtasks = getFinishedSubtasks(task);
                resultItem.innerHTML = getResultItemWithSubtask(task, finishedSubtasks, i);
            } else {
                resultItem.innerHTML = getResultItemWithoutSubtask(task, i);
            }
            changeContactInitials(task, resultsTodo, resultsProgress, resultsFeedback, resultsDone, resultItem, i);
        }
    });
}

/**
 * rendering the subtasks
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
 * changed the contacts initials
 * 
 * @param {string} task - right task
 * @param {Array} resultsTodo - array with results todo
 * @param {Array} resultsProgress - array with results progress
 * @param {Array} resultsFeedback - array with results feedback
 * @param {Array} resultsDone - array with results done
 * @param {Array} i - index of contact
 */
function changeContactInitials(task, resultsTodo, resultsProgress, resultsFeedback, resultsDone, resultItem, i) {
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