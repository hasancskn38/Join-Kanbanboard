// Implement Templates
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


// Render Content of data.js
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
        }
        else if(test.status === 'inprogress') {
            stageProgress.innerHTML += progressTemplate(i, test)
        }
        else if(test.status === 'feedback') {
            stageFeedBack.innerHTML += feedBackTemplate(i ,test)
        } else {
            stageDone.innerHTML += doneTemplate(i, test)
    }
    renderColors(i);
    }
    stagesContentWhenEmpty();
    hideOrShowPriorityLevels();
}


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

// Render Contacts from Contact JSON Array
const selectElement = document.getElementById('select-contact');
const initialsDiv = document.getElementById('initials-div');

// Set the select element to allow multiple selections
selectElement.setAttribute('multiple', true);

// Populate the select element with options for each contact name
contacts.forEach(contact => {
    const optionElement = document.createElement('option');
    optionElement.value = contact.name;
    optionElement.textContent = contact.name;
    selectElement.appendChild(optionElement);
});

// Function to create a single initial span element
function createInitial(name, randomColor) {
    const span = document.createElement('span');
    span.textContent = name.charAt(0).toUpperCase();
    span.style.backgroundColor = randomColor;
    return span;
}

// Function to get the initials of a name
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
  

// Function to set the background color of the initialsDiv
function setBackgroundColors(selectedContacts) {
    const backgroundColors = selectedContacts.map(contact => contact.randomColors);
}

// Event listener for the select element
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
        const space = document.createTextNode(' ');
        initialsDiv.appendChild(space);
    });
    // Set the background color of the initialsDiv
    setBackgroundColors(selectedContacts);
});


function openTaskPopUp(i) {
    let test = testData[i]
    let contact = contacts[i]
    let taskPopUp = document.getElementById(`task-popup`)
    document.querySelector('body').classList.add('overflow-hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    taskPopUp.classList.remove('d-none');
    document.getElementById('overlay').classList.remove('d-none');
    taskPopUp.innerHTML = openTaskPopUpTemplate(test, i, contact)
    renderColors(i);
    changePriorityColorPopUp();
}


function closeTaskPopUp() {
    document.getElementById('task-popup').classList.add('d-none');
    document.getElementById('overlay').classList.add('d-none');
    document.querySelector('body').classList.remove('overflow-hidden');
}


// let subtaskArray = []
// function renderSubtasks(i) {
//     let subtasks = document.getElementById('subtasks')
//     subtasks.innerHTML = '';
//     for (let i = 0; i < subtaskArray.length; i++) {
//         const subtask = subtaskArray[i];
//         subtasks.innerHTML += renderSubtasksTemplate(subtask, i)
//     }
//     renderData();
//     renderColors(i)
// }


// function addSubtask(i) {
//     let subtaskInput = document.getElementById('task-subtask').value;
//     subtaskArray.push(subtaskInput);
//     renderSubtasks();
//     renderData();
//     document.getElementById('task-subtask').value = '';
//     renderColors(i)
// }


// function deleteSubtask(i) {
//     subtaskArray.splice(i, 1)
//     renderSubtasks();
//     renderData();
//     renderColors(i)
// }


// Function to prevent that add subtask button submits form
// let preventButton = document.getElementById('add-subtask')
// preventButton.addEventListener('click', function(event) {
//     // Prevent the form from being submitted
//     event.preventDefault();
//   });

function openEditTask(i) {
    let test = testData[i]
    let contact = contacts[i]
    let editTask = document.getElementById('edit-task-popup')
    let taskPopUp = document.getElementById(`task-popup`).classList.add('d-none')
    editTask.classList.remove('d-none')
    editTask.innerHTML = openEditTaskPopUp(test, i)
}


function submitChanges(i) {
    let newInput = document.getElementById(`input-edit-${i}`)
    newInput.innerHTML = newInput.value
}


function closeEditTask() {
    document.getElementById(`task-popup`).classList.remove('d-none')
    document.getElementById('edit-task-popup').classList.add('d-none')
}


function changePriorityColorPopUp() {
    let priority = document.getElementById('priority-popup')
    if(priority.innerHTML == 'Urgent') {
        priority.classList.add('urgent-popup')
    } else if(priority.innerHTML == 'Medium') {
        priority.classList.add('medium-popup')
    } if(priority.innerHTML == 'Low') {
        priority.classList.add('low-popup')
    }
}


function renderColors(i) {
    let category = document.getElementById(`category-${i}`);
    if(category.innerHTML == 'Design') {
        category.classList.add('design')
    }
    if(category.innerHTML == 'Backoffice') {
        category.classList.add('backoffice')
    }
    if(category.innerHTML == 'Sales') {
        category.classList.add('sales')
    }
    if(category.innerHTML == 'Marketing') {
        category.classList.add('marketing')
    }
}

let priority = 'urgent';
function setPriority(value) {
    priority = value;
}

document.getElementById('urgent').addEventListener('click', function() {
    setPriority('urgent');
});

document.getElementById('medium').addEventListener('click', function() {
    setPriority('medium');
});

document.getElementById('low').addEventListener('click', function() {
    setPriority('low');
});

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
            "contact": assignedContacts,
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
            "assignedContact": assignedContacts,
            "id": newId.toString(),
        };
        testData.push(newItem);
    }
    closeAddTaskPopUp();
    clearInputFields();
    removePrioritys();
    renderData();
}


function deleteTask(i) {
    testData.splice(i ,1);
    closeEditTask();
    closeTaskPopUp();
    renderData();
}


function clearInputFields() {
    let input = document.getElementById('task-title');
    let selectCategory = document.getElementById('select-category');
    let selectContacts = document.getElementById('select-contact');
    let taskDate = document.getElementById('task-date');
    let taskDescription = document.getElementById('task-description');
    input.value = "";
    selectCategory.value = "";
    selectContacts.value = "";
    taskDate.value = "";
    taskDescription.value = "";
}


function handleSubmit(event, i) {
    event.preventDefault();
    createTask(i);
    renderData();
    closeAddTaskPopUp();
}

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


// Drag and Drop Function
let currentDraggedItemId

function startDragging(id) {
    for (let i = 0; i < testData.length; i++) {
        let index = testData[i]['id']
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

// Remove any priority levels
function removePrioritys() {
urgent.classList.remove('urgent')
priorityImg1.classList.remove('white')
medium.classList.remove('medium')
priorityImg2.classList.remove('white')
low.classList.remove('low')
priorityImg3.classList.remove('white')
}

// Change the Color of the different Priority Levels
let priorityImg1 = document.getElementById('img1')
let priorityImg2 = document.getElementById('img2')
let priorityImg3 = document.getElementById('img3')
let urgent = document.getElementById('urgent')
let medium = document.getElementById('medium')
let low = document.getElementById('low')


function changeUrgentColor() {
    if(urgent.classList.contains('urgent')) {
        urgent.classList.remove('urgent') 
        priorityImg1.classList.remove('white');
        
    } else {
        urgent.classList.add('urgent')
        low.classList.remove('low')
        medium.classList.remove('medium')
        priorityImg1.classList.add('white');
        priorityImg2.classList.remove('white');
        priorityImg3.classList.remove('white');
    }
}


function changeMediumColor() {
    if(medium.classList.contains('medium')) {
        medium.classList.remove('medium') 
        priorityImg2.classList.remove('white');
        
    } else {
        medium.classList.add('medium')
        urgent.classList.remove('urgent')
        low.classList.remove('low')
        priorityImg1.classList.remove('white');
        priorityImg2.classList.add('white');
        priorityImg3.classList.remove('white');
    }
}


function changeLowColor() {
    if(low.classList.contains('low')) {
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


// Function to show or hide the Priority Levels on drag and drop
function hideOrShowPriorityLevels() {
    for (let i = 0; i < testData.length; i++) {
    let lowMain = document.getElementById(`low-main-${i}`);
    let urgentMain = document.getElementById(`urgent-main-${i}`);
    let mediumMain = document.getElementById(`medium-main-${i}`);
      const test = testData[i];
      if (test.priority == 'urgent') {
        urgentMain.classList.remove('d-none');
        mediumMain.classList.add('d-none');
        lowMain.classList.add('d-none');
      } else if (test.priority == 'medium') {
        urgentMain.classList.add('d-none');
        mediumMain.classList.remove('d-none');
        lowMain.classList.add('d-none');
      } else if (test.priority == 'low') {
        urgentMain.classList.add('d-none');
        mediumMain.classList.add('d-none');
        lowMain.classList.remove('d-none');
      }
    }
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