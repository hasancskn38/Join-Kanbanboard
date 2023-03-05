<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
=======
=======
>>>>>>> parent of ef59c3e (asd)
let testData = [
    {
        title: 'Finish UI',
        cat: 'Design',
        description: 'This is a Task Description',
        status: 'todo',
        date: '05-08-2022',
        priority: 'Urgent',
        assignedContacts: ['HC', 'CD'],
        id: '0'
    },
<<<<<<< HEAD
=======

    {
        title: 'Finish Backend',
        cat: 'Marketing',
        description: 'This is a Task Description',
        status: 'inprogress',
        date: '05-08-2022',
        priority: 'Urgent',
        assignedContacts: ['HC', 'CD', 'CD'],
        id: '1'
    },

    {
        title: 'Look for Social Media Marketing Agency',
        cat: 'Backoffice',
        description: 'This is a Task Description',
        status: 'feedback',
        date: '05-08-2022',
        priority: 'Urgent',
        assignedContacts: ['CD', 'CD'],
        id: '2'
    },

    {
        title: 'Call with Steven',
        cat: 'Sales',
        description: 'This is a Task Description',
        status: 'done',
        date: '05-08-2022',
        priority: 'Medium',
        assignedContacts: ['HC', 'CD'],
        id: '3'
    },

    {
        title: 'Call with Test',
        cat: 'Sales',
        description: 'This is a Task Description',
        status: 'done',
        date: '05-08-2022',
        priority: 'Low',
        assignedContacts: ['CF'],
        id: '4'
    },
];

>>>>>>> parent of ef59c3e (asd)

    {
        title: 'Finish Backend',
        cat: 'Marketing',
        description: 'This is a Task Description',
        status: 'inprogress',
        date: '05-08-2022',
        priority: 'Urgent',
        assignedContacts: ['HC', 'CD', 'CD'],
        id: '1'
    },

    {
        title: 'Look for Social Media Marketing Agency',
        cat: 'Backoffice',
        description: 'This is a Task Description',
        status: 'feedback',
        date: '05-08-2022',
        priority: 'Urgent',
        assignedContacts: ['CD', 'CD'],
        id: '2'
    },

    {
        title: 'Call with Steven',
        cat: 'Sales',
        description: 'This is a Task Description',
        status: 'done',
        date: '05-08-2022',
        priority: 'Medium',
        assignedContacts: ['HC', 'CD'],
        id: '3'
    },

    {
        title: 'Call with Test',
        cat: 'Sales',
        description: 'This is a Task Description',
        status: 'done',
        date: '05-08-2022',
        priority: 'Low',
        assignedContacts: ['CF'],
        id: '4'
    },
];

>>>>>>> parent of ef59c3e (asd)

>>>>>>> parent of 7c201d2 (worked on summary)
=======

>>>>>>> parent of 7c201d2 (worked on summary)



>>>>>>> parent of 7c201d2 (worked on summary)
// Generate Greeting Based on real world time
// setInterval(function() {
//     let date = new Date();
//     let hours = date.getHours();
//     // then we declare a var named timeOfDay
//     let timeOfDay;
//     if (hours < 12) {
//         timeOfDay = 'Good Morning !';
//     } else if(hours >= 12 && hours < 17) {
//         timeOfDay = 'Good afternoon !';
//     } else {
//         timeOfDay = 'Good evening !';
//     }
//     document.getElementById('greeting').innerHTML = timeOfDay ;
// }, 1000);

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


renderTasks();


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
        if ( testData[i]['priority'] == 'Urgent')
        inUrgent++;
    }
    return inUrgent;
}