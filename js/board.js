// Render Content of data.js
function renderTasks() {
    let stageToDo = document.getElementById('stage-todo')
    stageToDo.innerHTML = '';
    
        stageToDo.innerHTML += /*html*/`
        <h3 id="category">${tasks[1][0]['cat']}</h3>
        <h4 class="blue">${tasks[1][0]['title']}</h4>
        <p class="grey">${tasks[1][0]['desc']}</p>
        <div id="progress-bar" style="width: 50%; height: 10px; background-color: lightgrey;"> 
        <div id="progress" style="background-color: blue; height: 100%; width: 0%;"></div>
        </div>
        <div class="contact-initials">
        <p>${usersBoard[0]['short_name']}</p>
        <p>${usersBoard[1]['short_name']}</p>
        </div>
        `
        renderColors();    
}

document.getElementById("submit-button").addEventListener("click", function() {
        let title = document.getElementById('task-title').value;
        let date = document.getElementById('task-date').value;
        let urgent = document.getElementById('urgent').innerHTML
        let medium = document.getElementById('medium').innerHTML
        let low = document.getElementById('low').innerHTML
        let taskDescription = document.getElementById('task-description').value;
        let subtask = document.getElementById('task-subtask').value
        console.log(title, date,taskDescription, subtask, urgent ,medium , low);
        
});

function renderColors() {
    let category = document.getElementById('category');
    if(category.innerHTML == 'Design') {
        category.classList.add('design')
    }
    if(category.innerHTML == 'Media') {
        category.classList.add('media')
    }
    if(category.innerHTML == 'Backooffice') {
        category.classList.add('backoffice')
    }
    if(category.innerHTML == 'Sales') {
        category.classList.add('sales')
    }
    if(category.innerHTML == 'Development') {
        category.classList.add('development')
    }
    
}

function createTask() {

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
    document.getElementById('popup').classList.remove('hide');
    document.getElementById('popup').classList.add('show');
    document.getElementById('popup').classList.remove('d-none');

}

function closeAddTaskPopUp() {
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('popup').classList.add('hide');
    document.getElementById('popup').classList.remove('show');
}

let priorityImg = document.getElementById('img')
let urgent = document.getElementById('urgent')
let medium = document.getElementById('medium')
let low = document.getElementById('low')
// Change the Color of the different Priority Levels
function changeUrgentColor() {
    if(urgent.classList.contains('urgent')) {
        urgent.classList.remove('urgent') 
        priorityImg.classList.add('white');
        
    } else {
        urgent.classList.add('urgent')
        low.classList.remove('low')
        medium.classList.remove('medium')
        priorityImg.classList.add('white');
    }
}

function changeMediumColor() {
    if(medium.classList.contains('medium')) {
        medium.classList.remove('medium') 
        priorityImg.classList.add('white');
        
    } else {
        medium.classList.add('medium')
        urgent.classList.remove('urgent')
        low.classList.remove('low')
        priorityImg.classList.add('white');
    }
}

function changeLowColor() {
    if(low.classList.contains('low')) {
        low.classList.remove('low')
        priorityImg.classList.add('white');
        
    } else {
        low.classList.add('low')
        urgent.classList.remove('urgent')
        medium.classList.remove('medium')
        priorityImg.classList.add('white');
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


// var progressBar = document.getElementById("progress-bar");
// var progress = document.getElementById("progress");
// var width = 1;

// function updateProgress() {
//   if (width >= 100) {
//     clearInterval(id);
//   } else {
//     width++;
//     progress.style.width = width + "%";
//   }
// }

// var id = setInterval(updateProgress, 10);
