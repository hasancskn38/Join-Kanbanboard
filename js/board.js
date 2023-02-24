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
    stagesContentWhenEmpty()
    renderContactsSelect()
}


function stagesContentWhenEmpty() {
    let stageToDo = document.getElementById('stage-todo')
    let stageProgress = document.getElementById('stage-progress')
    // stageProgress.innerHTML = '';
    let stageFeedBack = document.getElementById('stage-feedback')
    // stageFeedBack.innerHTML = '';
    let stageDone = document.getElementById('stage-done')
    // stageDone.innerHTML = '';
    if(stageToDo.innerHTML == '') {
        stageToDo.innerHTML += /*html*/`<div class="empty-container">
        <h2>There are no todos</h2>
    </div>`
    } if(stageProgress.innerHTML == '') {
        stageProgress.innerHTML += /*html*/`<div class="empty-container">
        <h2>There are no tasks in progress</h2>
    </div>`
    } if(stageFeedBack.innerHTML == '') {
        stageFeedBack.innerHTML += /*html*/`<div class="empty-container">
        <h2>There are no tasks that need feedback</h2>
    </div>`
    } if(stageDone.innerHTML == '') {
        stageDone.innerHTML += /*html*/`<div class="empty-container">
        <h2>There are no tasks that are done</h2>
    </div>`
    }
}


function renderContactsSelect() {
    let contactList = document.getElementById('select-contact')
    contacts.forEach(contact => {
        const option = document.createElement("option");
        option.value = contact.id;
        option.text = `${contact.name}`;
        contactList.appendChild(option);
      });
}


// Search Task 
function searchTask() {
    let input = document.getElementById('search-input').value
    let container = document.querySelectorAll('test')
    input = input.toLowerCase().trim();
    container.innerHTML = '';
    for (let i = 0; i < testData.length; i++) {
        let taskName = testData[i]['cat'];
        if(taskName.toLowerCase().includes(input)) {
            container.innerHTML += renderData();
        } 
    }
}


function openTaskPopUp(i) {
    let test = testData[i]
    let contact = contacts[i]
    let date = document.getElementById('task-date').value;
    document.querySelector('body').classList.add('overflow-hidden');
    let taskPopUp = document.getElementById(`task-popup`)
    window.scrollTo({ top: 0, behavior: 'smooth' });
    taskPopUp.classList.remove('d-none');
    document.getElementById('overlay').classList.remove('d-none');
    taskPopUp.innerHTML = /*html*/`
    <div class="task-popup-container">
                    <button class="cursor" onclick="closeTaskPopUp()">X</button>
                    <h3 id="category-${i}">${test.cat}</h3>
                    <h1 class="grey">${test.title}</h1>
                    <p class="blue">${test.description}</p>
                    <ul>
                        <li><b>Due Date:</b> ${test.date}</li>
                        <li><b>Priority:</b><span id="priority-popup">${test.priority}</span> </li>
                        <li><b>Assigned to:</b>
                            <ul>
                                <li class="contact-container"><span>DD</span>${contact.name}</li>
                            </ul>
                        </li>
                    </ul>
                    <img onclick="openEditTask(${i})" class="edit-button cursor" src="../assets/icons/editbutton.png" alt="">
                </div>
    `
    renderColors(i);
    changePriorityColorPopUp()
}


function closeTaskPopUp() {
    document.getElementById('task-popup').classList.add('d-none');
    document.getElementById('overlay').classList.add('d-none');
    document.querySelector('body').classList.remove('overflow-hidden');
}

let subtaskArray = []
function renderSubtasks() {
    let subtasks = document.getElementById('subtasks')
    subtasks.innerHTML = '';
    for (let i = 0; i < subtaskArray.length; i++) {
        const subtask = subtaskArray[i];
        subtasks.innerHTML += /*html*/`
            <li>${subtask}<button class="cursor" onclick="deleteSubtask(${i})">X</button></li>
        `
    }
    renderData();
}

function addSubtask() {
    let subtaskInput = document.getElementById('task-subtask').value
    subtaskArray.push(subtaskInput);
    renderSubtasks();
    renderData();
    document.getElementById('task-subtask').value = '';
}

function deleteSubtask(i) {
    subtaskArray.splice(i, 1)
    renderSubtasks();
    renderData();
}

// Function to prevent that add subtask button submits form
let preventButton = document.getElementById('add-subtask')
preventButton.addEventListener('click', function(event) {
    // Prevent the form from being submitted
    event.preventDefault();
  });

function openEditTask(i) {
    let test = testData[i]
    let contact = contacts[i]
    let editTask = document.getElementById('edit-task-popup')
    let taskPopUp = document.getElementById(`task-popup`).classList.add('d-none')
    editTask.classList.remove('d-none')
    editTask.innerHTML = /*html*/ `<div class="edit-task-container">
        <button class="cursor" onclick="closeTaskPopUp() closeEditTask()">X</button>
        <h1>${test.title}</h1>
        <h2>Description</h2>
        <textarea>${test.description}</textarea>
        <h2 class="date-header">Due date</h2>
        <label for="appointment">
            <div class="date">
                <input id="task-date" class="cursor" placeholder="dd/mm/yyyy" type="date"
                    id="appointment" name="appointment">
            </div>
        </label>
        <div class="priority">
        <div class="priority-levels cursor" id="urgent" onclick="changeUrgentColor()"><span
                id="urgent-inner">Urgent</span><img id="img1" src="../assets/icons/urgent.png"
                alt=""></div>
        <div class="priority-levels cursor" id="medium" onclick="changeMediumColor()"><span
                id="medium-inner">Medium</span> <img id="img2" src="../assets/icons/medium.png"
                alt=""></div>
        <div class="priority-levels cursor" id="low" onclick="changeLowColor()"><span
                id="low-inner">Low</span><img id="img3" src="../assets/icons/low.png" alt=""></div>
    </div>
    <select id="select-contact" class="select-contact cursor">
        <option value="" disabled selected hidden>Select contacts to assign</option>
    </select>
    </div>`
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


// Create New Task Function
function createTask() {
    let title = document.getElementById('task-title').value;
    let category = document.getElementById('select-category').value;
    let taskDescription = document.getElementById('task-description').value;
    const lastItem = testData[testData.length - 1];
    if(testData.length == 0) {
        let newItem = { 
            "title": title,
            "cat": category,
            "description": taskDescription,
            "status": 'todo',
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
            "id": newId.toString(),
            }; 
            testData.push(newItem);
    }
    renderData();
    // Clear Input Fields
    title = '';
    category = '';
    taskDescription = '';
}


function deleteTask(i) {
    testData.splice(i ,1)
    renderData();
  }


function resetInputs() {
    let title = document.getElementById('task-title').value;
    let category = document.getElementById('select-category').value;
    let taskDescription = document.getElementById('task-description').value;
    title = '';
    category = '';
    taskDescription = '';
}


function handleSubmit(event) {
        event.preventDefault()
            createTask();
            closeAddTaskPopUp();
            resetInputs();
            renderData();
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
let currentDraggedItem
function startDragging(id, i) {
    currentDraggedItem = id
    renderColors(i);
    // showRemoveTaskBin()
}


function allowDrop(ev, i) {
    ev.preventDefault();
    renderColors(i);
  }


function dropItem(status, i) {
    testData[currentDraggedItem]['status'] = status
    renderData();
    renderColors(i);
    // hideRemoveTaskBin()
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