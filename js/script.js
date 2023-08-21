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


/**
 * changes the priority color to urgent
 *
 */
function changeUrgentColor() {
    let priorityImg1 = document.getElementById('img1');
    let priorityImg2 = document.getElementById('img2');
    let priorityImg3 = document.getElementById('img3');
    let urgent = document.getElementById('urgent');
    let medium = document.getElementById('medium');
    let low = document.getElementById('low');
    if (urgent.classList.contains('urgent')) {
        urgent.classList.remove('urgent');
        priorityImg1.classList.remove('white');

    } else {
        urgentChange(priorityImg1, priorityImg2, priorityImg3, urgent, medium, low);
    }
}


/**
 * changes the priority to the default one
 *
 */
function changeMediumColor() {
    let priorityImg1 = document.getElementById('img1');
    let priorityImg2 = document.getElementById('img2');
    let priorityImg3 = document.getElementById('img3');
    let urgent = document.getElementById('urgent');
    let medium = document.getElementById('medium');
    let low = document.getElementById('low');
    if (medium.classList.contains('medium')) {
        medium.classList.remove('medium');
        priorityImg2.classList.remove('white');

    } else {
        mediumChange(priorityImg1, priorityImg2, priorityImg3, urgent, medium, low);
    }
}


/**
 * changes the priority to the default one
 *
 */
function changeLowColor() {
    let priorityImg1 = document.getElementById('img1');
    let priorityImg2 = document.getElementById('img2');
    let priorityImg3 = document.getElementById('img3');
    let urgent = document.getElementById('urgent');
    let medium = document.getElementById('medium');
    let low = document.getElementById('low');
    if (low.classList.contains('low')) {
        low.classList.remove('low')
        priorityImg3.classList.remove('white');
    } else {
        lowChange(priorityImg1, priorityImg2, priorityImg3, urgent, medium, low);
    }
}

/**
 * changes the priority to the default one
 *
 * @param {string} priorityImg1 - urgent prio
 * @param {string} priorityImg2 - medium prio
 * @param {string} priorityImg3 - low prio
 * @param {string} urgent - urgent prio
 * @param {string} medium - medium prio
 * @param {string} low - low prio
 */
function urgentChange(priorityImg1, priorityImg2, priorityImg3, urgent, medium, low) {
    urgent.classList.add('urgent');
    low.classList.remove('low');
    medium.classList.remove('medium');
    priorityImg1.classList.add('white');
    priorityImg2.classList.remove('white');
    priorityImg3.classList.remove('white');
}

/**
 * changes the priority to the default one
 *
 * @param {string} priorityImg1 - urgent prio
 * @param {string} priorityImg2 - medium prio
 * @param {string} priorityImg3 - low prio
 * @param {string} urgent - urgent prio
 * @param {string} medium - medium prio
 * @param {string} low - low prio
 */
function mediumChange(priorityImg1, priorityImg2, priorityImg3, urgent, medium, low) {
    medium.classList.add('medium');
    urgent.classList.remove('urgent');
    low.classList.remove('low');
    priorityImg1.classList.remove('white');
    priorityImg2.classList.add('white');
    priorityImg3.classList.remove('white');
}

/**
 * changes the priority to the default one
 *
 * @param {string} priorityImg1 - urgent prio
 * @param {string} priorityImg2 - medium prio
 * @param {string} priorityImg3 - low prio
 * @param {string} urgent - urgent prio
 * @param {string} medium - medium prio
 * @param {string} low - low prio
 */
function lowChange(priorityImg1, priorityImg2, priorityImg3, urgent, medium, low) {
    low.classList.add('low')
    urgent.classList.remove('urgent')
    medium.classList.remove('medium')
    priorityImg1.classList.remove('white');
    priorityImg2.classList.remove('white');
    priorityImg3.classList.add('white');
}

