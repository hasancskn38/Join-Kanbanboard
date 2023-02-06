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
        
    } else {
        urgent.classList.add('urgent')
        low.classList.remove('low')
        medium.classList.remove('medium')
    }
}

function changeMediumColor() {
    if(medium.classList.contains('medium')) {
        medium.classList.remove('medium') 
        
    } else {
        medium.classList.add('medium')
        urgent.classList.remove('urgent')
        low.classList.remove('low')
    }
}

function changeLowColor() {
    if(low.classList.contains('low')) {
        low.classList.remove('low')
        
    } else {
        low.classList.add('low')
        urgent.classList.remove('urgent')
        medium.classList.remove('medium')
    }
    
}