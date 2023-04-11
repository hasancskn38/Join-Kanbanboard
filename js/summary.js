setURL('https://gruppe-447.developerakademie.net/join/smallest_backend_ever');
let contacts = [];
let letters = [];
let testData = [];

// Implement Templates
async function includeHTML() {
    await loadDataFromServer();
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
    renderTasks();
    getCurrentPage();
}

function getCurrentPage() {
    let currentPagePath = window.location.pathname;
    let htmlName = currentPagePath.split("/").pop().substring(0, currentPagePath.split("/").pop().lastIndexOf("."));
    document.getElementById(`menu_${htmlName}`).classList.add(htmlName);
}

function parseLoggedOnUser() {
    let loggedOnUser = JSON.parse(localStorage.getItem("loggedOnUser"));
    let loggedOnUserFirstChart = loggedOnUser.charAt(0);
    let loggedOnUserFirstChartToUpperCase = loggedOnUserFirstChart.toUpperCase();
    document.getElementById('logged_on_user').innerHTML = `
    <h5 id="greeting"></h5>
    <span>${loggedOnUser}</span>`;
    document.getElementById('display_logged_on_user').innerHTML = `${loggedOnUserFirstChartToUpperCase}`;
}


// Generate Greeting Based on real world time
setInterval(function() {
    let date = new Date();
    let hours = date.getHours();
    let timeOfDay;
    if (hours < 12) {
        timeOfDay = 'Good Morning !';
    } else if(hours >= 12 && hours < 17) {
        timeOfDay = 'Good afternoon !';
    } else {
        timeOfDay = 'Good evening !';
    }
    document.getElementById('greeting').innerHTML = timeOfDay, ',' ;
}, 1000);


async function loadDataFromServer() {
    await downloadFromServer();
    contacts = await JSON.parse(backend.getItem('contacts')) || [];
    testData = await JSON.parse(backend.getItem('testData')) || [];
}

function showHelpMeSection() {
    document.getElementById('help-me-container').classList.remove('d-none');
    document.querySelector('main').classList.add('d-none');
}


// Hide Help me Container
function hideHelpMeSection() {
    document.getElementById('help-me-container').classList.add('d-none');
    document.querySelector('main').classList.remove('d-none');
}

function renderTasks() {
    let boardNum = document.getElementById('onBoardNum');
    boardNum.innerHTML = countTasksOnBoard();
    let numProgress = document.getElementById('numProgress');
    numProgress.innerHTML = countTasksInProcess();
    let awaitingFeedbackNum = document.getElementById('awaitingFeedbackNum');
    awaitingFeedbackNum.innerHTML = countAwaitingFeedback();
    let numDone = document.getElementById('numDone');
    numDone.innerHTML = countTasksInDone();
    let numToDo = document.getElementById('numToDo');
    numToDo.innerHTML = countTasksToDo();
    let numUrgent = document.getElementById('numUrgent');
    numUrgent.innerHTML = countUrgent();
    parseLoggedOnUser();
}

function userLogout() {
    if (!document.getElementById('log_out_button').classList.contains('dontShow')) {
        document.getElementById('log_out_button').classList.add('dontShow');
    }
    else {
        document.getElementById('log_out_button').classList.remove('dontShow');
    }
}

function logOut() {
    localStorage.removeItem("loggedOnUser");
    window.location.href = `login.html?msg=Du hast dich erfolgreich ausgeloggt`;
}

function countTasksOnBoard() {
    let onBoard = testData.length;
    return onBoard;
}


function countTasksInProcess() {
    let inProgress = 0;
    for (let i = 0; i < testData.length; i++) {
        if (testData[i]['status'] == 'inprogress') {
            inProgress++;
        }
    }
    return inProgress;
}


function countAwaitingFeedback() {
    let inAwaitingFeedback = 0;
    for (let i = 0; i < testData.length; i++) {
        if (testData[i]['status'] == 'feedback') {
            inAwaitingFeedback++;
        }
    }
    return inAwaitingFeedback;
}


function countTasksInDone() {
    let inDone = 0;
    for (let i = 0; i < testData.length; i++) {
        if (testData[i]['status'] == 'done') {
            inDone++;
        }
    }
    return inDone;
}


function countTasksToDo() {
    let inToDo = 0;
    for (let i = 0; i < testData.length; i++) {
        if (testData[i]['status'] == 'todo') {
            inToDo++;
        }
    }
    return inToDo;
}


function countUrgent() {
    let inUrgent = 0;
    for (let i = 0; i < testData.length; i++) {
        if (testData[i]['priority'] == 'Urgent')
            inUrgent++;
    }
    return inUrgent;
}