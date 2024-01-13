setURL('https://hasan-coskun.com/join/smallest_backend_ever');
let contacts = [];
let letters = [];
let testData = [];

/**
 * This function implements the template.html
 *  
 * */
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

/**
 * getting current pages url
 *
 * 
 */
function getCurrentPage() {
    let currentPagePath = window.location.pathname;
    let htmlName = currentPagePath.split("/").pop().substring(0, currentPagePath.split("/").pop().lastIndexOf("."));
    document.getElementById(`menu_${htmlName}`).classList.add(htmlName);
}


/**
 * getting current user which is logged on
 *
 * 
 */
function parseLoggedOnUser() {
    let loggedOnUser = JSON.parse(localStorage.getItem("loggedOnUser"));
    let loggedOnUserFirstChart = loggedOnUser.charAt(0);
    let loggedOnUserFirstChartToUpperCase = loggedOnUserFirstChart.toUpperCase();
    document.getElementById('logged_on_user').innerHTML = `
    <div class="greet_user">
    <h5 id="greeting"></h5>
    <span>${loggedOnUser}</span>
    </div>`
    ;
    document.getElementById('display_logged_on_user').innerHTML = `${loggedOnUserFirstChartToUpperCase}`;
}

/**
 * getting the current date for greeting the user which is logged on
 *
 * 
 */
// Generate Greeting Based on real world time
setInterval(function () {
    let date = new Date();
    let hours = date.getHours();
    let timeOfDay;
    if (hours < 12) {
        timeOfDay = 'Good Morning,';
    } else if (hours >= 12 && hours < 17) {
        timeOfDay = 'Good afternoon,';
    } else {
        timeOfDay = 'Good evening, ';
    }
    document.getElementById('greeting').innerHTML = timeOfDay, ',';
}, 1000);



/**
 * Loading all data from the JSON at the backend
 *
 * 
 */
async function loadDataFromServer() {
    await downloadFromServer();
    contacts = await JSON.parse(backend.getItem('contacts')) || [];
    testData = await JSON.parse(backend.getItem('testData')) || [];
}

/**
 * shows the help me section 
 *
 * 
 */
function showHelpMeSection() {
    document.getElementById('help-me-container').classList.remove('d-none');
    document.getElementById('main_right').classList.add('d-none');

}

/**
 * hides the help me section 
 *
 * 
 */
// Hide Help me Container
function hideHelpMeSection() {
    document.getElementById('help-me-container').classList.add('d-none');
    document.getElementById('main_right').classList.remove('d-none');
}

/**
 * Rendering all task to the different sections to display
 *
 * 
 */
function renderTasks() {
    countTasksOnBoard();
    countTasksInProcess();
    countAwaitingFeedback();
    countTasksInDone();
    countTasksToDo();
    countUrgent();
    parseLoggedOnUser();
}


/**
 * log out the user which is logged on and deletes the local storage
 *
 * 
 */
function userLogout() {
    if (!document.getElementById('log_out_button').classList.contains('dontShow')) {
        document.getElementById('log_out_button').classList.add('dontShow');
    }
    else {
        document.getElementById('log_out_button').classList.remove('dontShow');
    }
}

/**
 * log out the user which is logged on and deletes the local storage
 *
 * 
 */
function logOut() {
    localStorage.removeItem("loggedOnUser");
    window.location.href = `index.html?msg=Du hast dich erfolgreich ausgeloggt`;
}

function goToBoardSection() {
    window.location.href = 'board.html';
}

/**
 * Is counting the tasks in this section and is rendering this into the html
 *
 * 
 */
function countTasksOnBoard() {
    let testDataLength = testData.length;
    let number = 0;
    let container = document.getElementById('onBoardNum');

    if (testDataLength === 0) {
        container.innerHTML = 0;
    }
    let intervalId = setInterval(() => {
        number++;
        container.innerHTML = number;
        if (number === testDataLength) {
            clearInterval(intervalId);
        }
    }, 500 / testDataLength);
}

/**
 * Is counting the tasks in this section and is rendering this into the html
 *
 * 
 */
function countTasksInProcess() {
    let testDataLength = returnTasksProgress();
    let number = 0;
    let container = document.getElementById('numProgress');
    if (testDataLength === 0) {
        container.innerHTML = 0;
    }
    else {
        let intervalId = setInterval(() => {
            number++;
            container.innerHTML = number;
            if (number === testDataLength) {
                clearInterval(intervalId);
            }
        }, 500 / testDataLength);
    }
}

/**
 * Is counting the tasks in this section and is rendering this into the html
 *
 * 
 */
function returnTasksProgress() {
    let inProgress = 0;
    for (let i = 0; i < testData.length; i++) {
        if (testData[i]['status'] == 'inprogress') {
            inProgress++;
        }
    }
    return inProgress;
}


/**
 * Is counting the tasks in this section and is rendering this into the html
 *
 * 
 */
function countAwaitingFeedback() {
    let container = document.getElementById('awaitingFeedbackNum');
    let testDataLength = returnTasksFeedback();
    let number = 0;
    if (testDataLength === 0) {
        container.innerHTML = 0;
    }
    else {
        let intervalId = setInterval(() => {
            number++;
            container.innerHTML = number;
            if (number === testDataLength) {
                clearInterval(intervalId);
            }
        }, 500 / testDataLength);
    }
}


/**
 * Is counting the tasks in this section and is rendering this into the html
 *
 * 
 */
function returnTasksFeedback() {
    let inAwaitingFeedback = 0;
    for (let i = 0; i < testData.length; i++) {
        if (testData[i]['status'] == 'feedback') {
            inAwaitingFeedback++;
        }
    }
    return inAwaitingFeedback;
}

/**
 * Is counting the tasks in this section and is rendering this into the html
 *
 * 
 */
function countTasksInDone() {
    let container = document.getElementById('numDone');
    let testDataLength = returnTasksDone();
    let number = 0;
    if (testDataLength === 0) {
        container.innerHTML = 0;
    }
    else {
        let intervalId = setInterval(() => {
            number++;
            container.innerHTML = number;
            if (number === testDataLength) {
                clearInterval(intervalId);
            }
        }, 500 / testDataLength);
    }
}


/**
 * Is counting the tasks in this section and is rendering this into the html
 *
 * 
 */
function returnTasksDone() {
    let inDone = 0;
    for (let i = 0; i < testData.length; i++) {
        if (testData[i]['status'] == 'done') {
            inDone++;
        }
    }
    return inDone;
}


/**
 * Is counting the tasks in this section and is rendering this into the html
 *
 * 
 */
function countTasksToDo() {
    let container = document.getElementById('numToDo');
    let testDataLength = returnTasksToDo();
    let number = 0;

    if (testDataLength === 0) {
        container.innerHTML = 0;
    }
    else {
        let intervalId = setInterval(() => {
            number++;
            container.innerHTML = number;
            if (number === testDataLength) {
                clearInterval(intervalId);
            }
        }, 500 / testDataLength);
    }
}


/**
 * Is counting the tasks in this section and is rendering this into the html
 *
 * 
 */
function returnTasksToDo() {
    let inToDo = 0;
    for (let i = 0; i < testData.length; i++) {
        if (testData[i]['status'] == 'todo') {
            inToDo++;
        }
    }
    return inToDo;
}


/**
 * Is counting the tasks in this section and is rendering this into the html
 *
 * 
 */
function countUrgent() {
    let container = document.getElementById('numUrgent');
    let testDataLength = returnTasksUrgent();
    let number = 0;
    if (testDataLength === 0) {
        container.innerHTML = 0;
    }
    else {
        let intervalId = setInterval(() => {
            number++;
            container.innerHTML = number;
            if (number === testDataLength) {
                clearInterval(intervalId);
            }
        }, 500 / testDataLength);
    }
}


/**
 * Is counting the tasks in this section and is rendering this into the html
 *
 * 
 */
function returnTasksUrgent() {
    let inUrgent = 0;
    for (let i = 0; i < testData.length; i++) {
        if (testData[i]['priority'] == 'Urgent')
            inUrgent++;
    }
    return inUrgent;
}