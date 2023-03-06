let currentDraggedItemId;

/**
 * This function implements the template.html
 *  */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); 
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


/**
 * render the data from the testData JSON Array
 */
function renderData() {
    let stageToDo = document.getElementById('stage-todo')
    stageToDo.innerHTML = '';
    let stageProgress = document.getElementById('stage-progress')
    stageProgress.innerHTML = '';
    let stageFeedBack = document.getElementById('stage-feedback')
    stageFeedBack.innerHTML = '';
    let stageDone = document.getElementById('stage-done')
    stageDone.innerHTML = '';
    for (let i = 0; i < testData.length; i++) {
        const test = testData[i];
        if(test.status === 'todo') {
            stageToDo.innerHTML += toDoTemplate(i, test)
            renderContactInitials(i, test);
        }
        else if(test.status === 'inprogress') {
            stageProgress.innerHTML += progressTemplate(i, test)
            renderContactInitials(i, test);
        }
        else if(test.status === 'feedback') {
            stageFeedBack.innerHTML += feedBackTemplate(i ,test)
            renderContactInitials(i, test);
        } else if(test.status === 'done') {
            stageDone.innerHTML += doneTemplate(i, test)
            renderContactInitials(i, test);
    }
    renderColors(i);
    }
    stagesContentWhenEmpty();
    hideOrShowPriorityLevels();
    changePriorityColorPopUp();
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
    let stageToDo = document.getElementById('stage-todo')
    let stageProgress = document.getElementById('stage-progress')
    let stageFeedBack = document.getElementById('stage-feedback')
    let stageDone = document.getElementById('stage-done')
    if(stageToDo.innerHTML == '') {
        stageToDo.innerHTML += emptyTodoTemplate()
    } if(stageProgress.innerHTML == '') {
        stageProgress.innerHTML += emptyProgressTemplate()
    } if(stageFeedBack.innerHTML == '') {
        stageFeedBack.innerHTML += emptyFeedbackTemplate()
    } if(stageDone.innerHTML == '') {
        stageDone.innerHTML += emptyDoneTemplate();
    }
}


// Create New Task Function
function createTask() {
    let title = document.getElementById('task-title').value;
    let category = document.getElementById('select-category').value;
    let date = document.getElementById('task-date').value;
    let taskDescription = document.getElementById('task-description').value;
    let assignedContacts = Array.from(document.getElementById('select-contact').selectedOptions)
        .map(option => {
            const fullName = option.value;
            const nameArr = fullName.split(' ');
            const initials = nameArr[0].charAt(0) + nameArr[nameArr.length - 1].charAt(0);
            return initials.toUpperCase();
    });

    const lastItem = testData[testData.length - 1];
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
        const newId = Number(lastItem.id) + 1;
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
    clearInputFields();
    removePrioritys();
    renderData();
}


function handleSubmit(event) {
    event.preventDefault();
    createTask();
    renderData();
    closeAddTaskPopUp();
}


function deleteTask(i) {
    testData.splice(i ,1);
    closeEditTask();
    closeTaskPopUp();
    renderData();
    renderColors(i);
}


// Render Contacts from Contact JSON Array
const selectElement = document.getElementById('select-contact');
const initialsDiv = document.getElementById('initials-div');


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
    const span = document.createElement('span');
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
    const names = name.split(' ');
    const initials = [];
    for (let i = 0; i < names.length; i += 2) {
      const span = document.createElement('span');
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
    const backgroundColors = selectedContacts.map(contact => contact.randomColors);
}

// Eventlistener for each select item, which has the function to create a span for each initals of a contact
selectElement.addEventListener('change', function() {
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


/**
 * close popup and return to the main page
 */
function closeTaskPopUp() {
    document.getElementById('task-popup').classList.add('d-none');
    document.getElementById('overlay').classList.add('d-none');
    document.querySelector('body').classList.remove('overflow-hidden');
}

// array where the subtask are stored 
let subtaskArray = []
/**
 * render subtasks from subtaskArray
 */
function renderSubtasks() {
    let subtasks = document.getElementById('subtasks')
    subtasks.innerHTML = '';
    for (let i = 0; i < subtaskArray.length; i++) {
        const subtask = subtaskArray[i];
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
    // renderData();
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
preventButton.addEventListener('click', function(event) {
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
}


// TODO Finish the function to change Tasks
function submitChanges(i) {
    const test = testData[i];
    let newTaskName = document.getElementById(`input-edit-${i}`).value;
    let taskName = document.getElementById('task-popup-header');
    let newDescription = document.getElementById('edit-description').value;
    let newDate = document.getElementById('task-date-edit').value;
    let taskTitle = document.getElementById('task-title');
    for (let i = 0; i < testData.length; i++) {
        // const test = testData[i];
        taskName.innerHTML = newTaskName
        taskTitle.innerHTML = newTaskName
    }
    closeEditTask();
    // renderData();
    // closeAddTaskPopUp();
}


// close edit task popup
function closeEditTask() {
    document.getElementById(`task-popup`).classList.remove('d-none');
    document.getElementById('edit-task-popup').classList.add('d-none');
}


function renderColors(i) {
    let test = testData[i];
    let category = document.getElementById(`category-${i}`);
    if(test.cat == 'Design') {
        category.classList.add('design')
    }
    if(test.cat == 'Backoffice') {
        category.classList.add('backoffice')
    }
    if(test.cat == 'Sales') {
        category.classList.add('sales')
    }
    if(test.cat == 'Marketing') {
        category.classList.add('marketing')
    }
}


let priority = 'Urgent';

function setPriority(value) {
    priority = value;
}

document.getElementById('urgent').addEventListener('click', function() {
    setPriority('Urgent');
});

document.getElementById('medium').addEventListener('click', function() {
    setPriority('Medium');
});

document.getElementById('low').addEventListener('click', function() {
    setPriority('Low');
});

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
    input.value = "";
    selectCategory.value = "";
    selectContacts.value = "";
    taskDate.value = "";
    taskDescription.value = "";
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
        if(index == id) {
            currentDraggedItemId = i;
        }
    }
}


function allowDrop(ev) {
    ev.preventDefault();
}


function dropItem(status) {
    testData[currentDraggedItemId]['status'] = status
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