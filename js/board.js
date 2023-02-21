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
    let taskPopUp = document.getElementById(`task-popup-${i}`)
    taskPopUp.classList.remove('d-none');
    document.getElementById('overlay').classList.remove('d-none');
    // document.querySelector('body').classList.add('overflow-hidden');

}

function closeTaskPopUp() {
    document.getElementById('task-popup').classList.add('d-none');
    document.getElementById('overlay').classList.add('d-none');
    // document.querySelector('body').classList.remove('overflow-hidden');
}

// Create New Task Function
function createTask() {
    let contact = document.getElementById('select-contact').value;
    let date = document.getElementById('task-date').value;
    let title = document.getElementById('task-title').value;
    let category = document.getElementById('select-category').value;
    let taskDescription = document.getElementById('task-description').value;
    const lastItem = testData[testData.length - 1];
    const newId = Number(lastItem.id) + 1;
    let newItem = { 
    "title": title,
    "cat": category,
    "description": taskDescription,
    "status": 'todo',
    "id": newId.toString(),
    };
    testData.push(newItem);
    // Clear Input Fields
    title = '';
    category = '';
    taskDescription = '';
    renderData();
}


function deleteTask(i) {
    setTimeout(
      function() {
        testData.splice(i ,1)
    renderData();
      }, 100);
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
    let title = document.getElementById('task-title').value;
    let category = document.getElementById('select-category').value;
    let contact = document.getElementById('select-contact').value;
    let date = document.getElementById('task-date').value;
    let taskDescription = document.getElementById('task-description').value;
        event.preventDefault()
        if(!title || !date || !taskDescription || !category || !contact) {
            alert('Please fill in all required fields');
        return;
        } else {
            createTask();
            closeAddTaskPopUp();
            resetInputs();
            renderData();
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

// let bin = document.getElementById('remove-task')

// function showRemoveTaskBin() {
//     setTimeout(
//       function() {
//         bin.classList.remove('d-none')
//       }, 100);
//   }

// function hideRemoveTaskBin() {
//     setTimeout(
//       function() {
//         bin.classList.add('d-none')
//       }, 100);
//   }

// Drag and Drop Function
let currentDraggedItem
function startDragging(id) {
    currentDraggedItem = id
    // showRemoveTaskBin()
}


function allowDrop(ev) {
    ev.preventDefault();
  }


function dropItem(status) {
    testData[currentDraggedItem]['status'] = status
    renderData();
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