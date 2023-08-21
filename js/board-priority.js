// Change the Color of the different Priority Levels
let priorityImg1 = document.getElementById('img1');
let priorityImg2 = document.getElementById('img2');
let priorityImg3 = document.getElementById('img3');
let urgent = document.getElementById('urgent');
let medium = document.getElementById('medium');
let low = document.getElementById('low');


function changeUrgentColor() {
    if (urgent.classList.contains('urgent')) {
        urgent.classList.remove('urgent');
        priorityImg1.classList.remove('white');

    } else {
        urgent.classList.add('urgent');
        low.classList.remove('low');
        medium.classList.remove('medium');
        priorityImg1.classList.add('white');
        priorityImg2.classList.remove('white');
        priorityImg3.classList.remove('white');
    }
}


function changeMediumColor() {
    if (medium.classList.contains('medium')) {
        medium.classList.remove('medium');
        priorityImg2.classList.remove('white');

    } else {
        medium.classList.add('medium');
        urgent.classList.remove('urgent');
        low.classList.remove('low');
        priorityImg1.classList.remove('white');
        priorityImg2.classList.add('white');
        priorityImg3.classList.remove('white');
    }
}



function changeLowColor() {
    if (low.classList.contains('low')) {
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
        if (test.priority == 'Urgent') {
            urgentMain.classList.remove('d-none');
            mediumMain.classList.add('d-none');
            lowMain.classList.add('d-none');
        } 
        if (test.priority == 'Medium') {
            urgentMain.classList.add('d-none');
            mediumMain.classList.remove('d-none');
            lowMain.classList.add('d-none');
        } 
        if (test.priority == 'Low') {
            urgentMain.classList.add('d-none');
            mediumMain.classList.add('d-none');
            lowMain.classList.remove('d-none');
        }
    }
}

document.getElementById('urgent').addEventListener('click', function () {
    setPriority('Urgent');
});

document.getElementById('medium').addEventListener('click', function () {
    setPriority('Medium');
});

document.getElementById('low').addEventListener('click', function () {
    setPriority('Low');
});

function setPriority(value) {
    priority = value;
}

/**
 * Shows an alert when no prio is selected
 *
 */
function priorityAlert() {
    let urgent = document.getElementById('urgent');
    let medium = document.getElementById('medium');
    let low = document.getElementById('low');
    urgent.classList.add('no_category_selected');
    medium.classList.add('no_category_selected');
    low.classList.add('no_category_selected');
    changePriorityInnerHtml(urgent, medium, low);
    changePriorityDefault(urgent, medium, low);
}


/**
 * changes the priority to the default one
 *
 * @param {string} urgent - urgent prio
 * @param {string} medium - medium prio
 * @param {string} low - low prio
 */
function changePriorityDefaultInnerHtml(urgent, medium, low) {
    urgent.innerHTML = `
    <span id="urgent-inner">Urgent</span>
    <img id="img1" src="../assets/icons/urgent.png" alt="">
    `;
    medium.innerHTML = `
    <span id="medium-inner">Medium</span>
    <img id="img2" src="../assets/icons/medium.png" alt="">
    `;
    low.innerHTML = `
    <span id="low-inner">Low</span>
    <img id="img3" src="../assets/icons/low.png" alt="">
    `;
}

/**
 * Adds the background color when opening popup
 *
 */
function changePriorityColorPopUp() {
    priorityColor = document.getElementById(`test-priority`);
    if (priorityColor.innerHTML == 'Urgent') {
        priorityColor.classList.add('urgent-popup');
    }
    if (priorityColor.innerHTML == 'Medium') {
        priorityColor.classList.add('medium-popup');
    }
    if (priorityColor.innerHTML == 'Low') {
        priorityColor.classList.add('low-popup');
    }
}


/**
 * changing prio colors
 *
 * @param {string} i - index of the right task
 */
function renderEditPriorityColors(i) {
    test = testData[i];
    let priority = document.getElementById('test-priority');
    let urgentEdit = document.getElementById('urgent-edit');
    let mediumEdit = document.getElementById('medium-edit');
    let lowEdit = document.getElementById('low-edit');
    let priorityImg1Edit = document.getElementById(`img1-edit`);
    let priorityImg2Edit = document.getElementById(`img2-edit`);
    let priorityImg3Edit = document.getElementById(`img3-edit`);
    changePrioritytoBoard(priority, urgentEdit, priorityImg1Edit, mediumEdit, priorityImg2Edit, lowEdit, priorityImg3Edit);
}


/**
 * changing prio colors
 *
 * @param {string} priority - index of the right task
 * @param {string} urgentEdit - prio of the task
 * @param {string} mediumEdit - prio of the task
 * @param {string} lowEdit - prio of the task
 * @param {string} priorityImg1Edit - prio img of the task
 * @param {string} priorityImg2Edit - prio img of the task
 * @param {string} priorityImg3Edit - prio img of the task
 */
function changePrioritytoBoard(priority, urgentEdit, priorityImg1Edit, mediumEdit, priorityImg2Edit, lowEdit, priorityImg3Edit) {
    if (priority.innerHTML == 'Urgent') {
        urgentEdit.classList.add('urgent');
        priorityImg1Edit.classList.add('white');
    }
    if (priority.innerHTML == 'Medium') {
        mediumEdit.classList.add('medium');
        priorityImg2Edit.classList.add('white');
    }
    if (priority.innerHTML == 'Low') {
        lowEdit.classList.add('low');
        priorityImg3Edit.classList.add('white');
    }
}

/**
 * changing prio 
 *
 * @param {string} value - new prio value 
 */
function editPriority(value) {
    newPriority = value;
}

/**
 * changes the priority color to urgent
 *
 */
function changeUrgentColorEdit() {
    let priorityImg1Edit = document.getElementById(`img1-edit`);
    let priorityImg2Edit = document.getElementById(`img2-edit`);
    let priorityImg3Edit = document.getElementById(`img3-edit`);
    let urgentEdit = document.getElementById(`urgent-edit`);
    let mediumEdit = document.getElementById(`medium-edit`);
    let lowEdit = document.getElementById(`low-edit`);
    if (urgentEdit.classList.contains('urgent')) {
        urgentEdit.classList.remove('urgent');
        priorityImg1Edit.classList.remove('white');

    } else {
        changeUrgentEditToBoard(urgentEdit, lowEdit, mediumEdit, priorityImg1Edit, priorityImg2Edit, priorityImg3Edit);
    }
}

/**
 * changes the priority color to medium
 *
 * @param {string} urgentEdit - prio of the task
 * @param {string} mediumEdit - prio of the task
 * @param {string} lowEdit - prio of the task
 * @param {string} priorityImg1Edit - prio img of the task
 * @param {string} priorityImg2Edit - prio img of the task
 * @param {string} priorityImg3Edit - prio img of the task
 */
function changeUrgentEditToBoard(urgentEdit, lowEdit, mediumEdit, priorityImg1Edit, priorityImg2Edit, priorityImg3Edit) {
    urgentEdit.classList.add('urgent');
    lowEdit.classList.remove('low');
    mediumEdit.classList.remove('medium');
    priorityImg1Edit.classList.add('white');
    priorityImg2Edit.classList.remove('white');
    priorityImg3Edit.classList.remove('white');
}

/**
 * changes the priority color to medium
 *
 */
function changeMediumColorEdit() {
    let priorityImg1Edit = document.getElementById(`img1-edit`);
    let priorityImg2Edit = document.getElementById(`img2-edit`);
    let priorityImg3Edit = document.getElementById(`img3-edit`);
    let urgentEdit = document.getElementById(`urgent-edit`);
    let mediumEdit = document.getElementById(`medium-edit`);
    let lowEdit = document.getElementById(`low-edit`);
    if (mediumEdit.classList.contains('medium')) {
        mediumEdit.classList.remove('medium');
        priorityImg2Edit.classList.remove('white');

    } else {
        changeMediumEditToBoard(urgentEdit, lowEdit, mediumEdit, priorityImg1Edit, priorityImg2Edit, priorityImg3Edit);
    }
}

/**
 * changes the priority color to medium
 *
 * @param {string} urgentEdit - prio of the task
 * @param {string} mediumEdit - prio of the task
 * @param {string} lowEdit - prio of the task
 * @param {string} priorityImg1Edit - prio img of the task
 * @param {string} priorityImg2Edit - prio img of the task
 * @param {string} priorityImg3Edit - prio img of the task
 */
function changeMediumEditToBoard(urgentEdit, lowEdit, mediumEdit, priorityImg1Edit, priorityImg2Edit, priorityImg3Edit) {
    mediumEdit.classList.add('medium');
    urgentEdit.classList.remove('urgent');
    lowEdit.classList.remove('low');
    priorityImg1Edit.classList.remove('white');
    priorityImg2Edit.classList.add('white');
    priorityImg3Edit.classList.remove('white');
}

/**
 * changes the priority color to low
 *
 */
function changeLowColorEdit() {
    let priorityImg1Edit = document.getElementById(`img1-edit`);
    let priorityImg2Edit = document.getElementById(`img2-edit`);
    let priorityImg3Edit = document.getElementById(`img3-edit`);
    let urgentEdit = document.getElementById(`urgent-edit`);
    let mediumEdit = document.getElementById(`medium-edit`);
    let lowEdit = document.getElementById(`low-edit`);
    if (lowEdit.classList.contains('low')) {
        lowEdit.classList.remove('low');
        priorityImg3Edit.classList.remove('white');
    } else {
        changeLowEditToBoard(urgentEdit, lowEdit, mediumEdit, priorityImg1Edit, priorityImg2Edit, priorityImg3Edit);
    }
}

/**
 * changes the priority color to low
 *
 * @param {string} urgentEdit - prio of the task
 * @param {string} mediumEdit - prio of the task
 * @param {string} lowEdit - prio of the task
 * @param {string} priorityImg1Edit - prio img of the task
 * @param {string} priorityImg2Edit - prio img of the task
 * @param {string} priorityImg3Edit - prio img of the task
 */
function changeLowEditToBoard(urgentEdit, lowEdit, mediumEdit, priorityImg1Edit, priorityImg2Edit, priorityImg3Edit) {
    lowEdit.classList.add('low');
    urgentEdit.classList.remove('urgent');
    mediumEdit.classList.remove('medium');
    priorityImg1Edit.classList.remove('white');
    priorityImg2Edit.classList.remove('white');
    priorityImg3Edit.classList.add('white');
}


/**
 * Remove any priority levels
 *
 */
function removePrioritys() {
    urgent.classList.remove('urgent');
    priorityImg1.classList.remove('white');
    medium.classList.remove('medium');
    priorityImg2.classList.remove('white');
    low.classList.remove('low');
    priorityImg3.classList.remove('white');
}

/**
 * changes the priority to the default one
 *
 * @param {string} urgent - urgent prio
 * @param {string} medium - medium prio
 * @param {string} low - low prio
 */
function changePriorityDefault(urgent, medium, low) {
    setTimeout(() => {
        urgent.classList.remove('no_category_selected');
        medium.classList.remove('no_category_selected');
        low.classList.remove('no_category_selected');
        changePriorityDefaultInnerHtml(urgent, medium, low)
    }, 2500);
}

/**
 * changes the priority to the default one
 *
 * @param {string} urgent - urgent prio
 * @param {string} medium - medium prio
 * @param {string} low - low prio
 */
function changePriorityInnerHtml(urgent, medium, low) {
    urgent.innerHTML = 'Auswählen';
    medium.innerHTML = 'Auswählen';
    low.innerHTML = 'Auswählen';
}
