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
    renderContactsSelect();
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
function renderContactsSelect() {
    let contactList = document.getElementById('select-contact')
    contacts.forEach(contact => {
        const option = document.createElement("option");
        option.value = contact.id;
        option.text = `${contact.name}`;
        contactList.appendChild(option);
      });
}


//TODO: Finish Search Task Function
// function searchTask() {
//     let input = document.getElementById('search-input').value
//     let container = document.querySelectorAll('test')
//     input = input.toLowerCase().trim();
//     container.innerHTML = '';
//     for (let i = 0; i < testData.length; i++) {
//         let taskName = testData[i]['cat'];
//         if(taskName.toLowerCase().includes(input)) {
//             container.innerHTML += renderData();
//         } 
//     }
// }


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
    renderContactsSelect();
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


// Create New Task Function
function createTask() {
    let title = document.getElementById('task-title').value;
    let category = document.getElementById('select-category').value;
    let date = document.getElementById('task-date').value
    let taskDescription = document.getElementById('task-description').value;
    const lastItem = testData[testData.length - 1];
    if(testData.length == 0) {
        let newItem = { 
            "title": title,
            "cat": category,
            "description": taskDescription,
            "status": 'todo',
            "date": date,
            "id":  0,
            }; 
            testData.push(newItem);

    } else {
        const newId = Number(lastItem.id) + 1;
        let newItem = { 
            "title": title,
            "cat": category,
            "description": taskDescription,
            "status": 'todo',
            "date": date,
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
    let input = document.getElementById('task-title')
    let selectCategory = document.getElementById('select-category')
    let selectContacts = document.getElementById('select-contact')
    let taskDate = document.getElementById('task-date')
    let taskDescription = document.getElementById('task-description')
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
    currentDraggedItemId = id
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
        // if not add urgent 
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

//TODO Finish hideorshowpriority levels
// Function to show or hide the Priority Levels on drag and drop
function hideOrShowPriorityLevels() {
    let lowMain = document.getElementById('low-main')
    let lowUrgent = document.getElementById('urgent-main')
    let lowMedium = document.getElementById('medium-main')
    for (let i = 0; i < testData.length; i++) {
        const test = testData[i];
        if(test.priority == 'Urgent') {
            lowUrgent.classList.remove('d-none')
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