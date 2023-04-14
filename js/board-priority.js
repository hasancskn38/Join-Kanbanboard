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
