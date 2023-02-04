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
    document.getElementById('popup').classList.remove('d-none');
    document.getElementById('overlay').classList.remove('d-none');
}

function closeAddTaskPopUp() {
    document.getElementById('popup').classList.add('d-none');
    document.getElementById('overlay').classList.add('d-none');
}