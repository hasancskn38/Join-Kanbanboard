setURL('https://gruppe-447.developerakademie.net/join/smallest_backend_ever');

let testData = [];
let contacts = [];
let priorityColor;
let priority;
let currentDraggedItemId;
let newPriority;
let searchedTaskArray = [];
let subtaskArray = [];
let selectElement = document.getElementById('select-contact');
let initialsDiv = document.getElementById('initials-div');
let dropDownShow = false;
let assignedContacts = [];
let createdCategorys = [];
let newCategoryColor;

/**
 * Function to block dates that are in the past
 */
let today = new Date().toISOString().split('T')[0];
document.getElementById('task-date').setAttribute('min', today);


async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        let element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
    renderAllBackendData();
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
    document.getElementById('display_logged_on_user').innerHTML = `${loggedOnUserFirstChartToUpperCase}`;
}

async function renderAllBackendData() {
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    testData = JSON.parse(backend.getItem('testData')) || [];
    createdCategorys = JSON.parse(backend.getItem('createdCategorys')) || [];
    // renderAllContacts();
    parseLoggedOnUser();
}

 function renderAllContacts() {
     let contactContainer = document.getElementById('select-contact');
     contactContainer.innerHTML = '';
     contactContainer.innerHTML = `<option value="" disabled="" selected="" hidden="">Select contacts to assign</option>`;
     for (let i = 0; i < contacts.length; i++) {
         let contact = contacts[i];
         contactContainer.innerHTML += `<option value="${contact['name']}">${contact['name']}</option>`;
     }
 }

     document.getElementById('urgent').addEventListener('click', function () {
         setPriority('Urgent');
     });

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


function addSubtask() {
    let subtaskInput = document.getElementById('task-subtask').value;
    renderSubtasksInPopUp(subtaskInput);
    subtaskArray.push(subtaskInput);
    document.getElementById('task-subtask').value = '';
}

function renderSubtasksInPopUp(subtaskInput) {
    let subTasks = document.getElementById('subtasks');
    subTasks.innerHTML += `<ul class="subtask-list">${subtaskInput}</ul>`;
}

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
        urgent.classList.add('urgent');
        low.classList.remove('low');
        medium.classList.remove('medium');
        priorityImg1.classList.add('white');
        priorityImg2.classList.remove('white');
        priorityImg3.classList.remove('white');
    }
}


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
        medium.classList.add('medium');
        urgent.classList.remove('urgent');
        low.classList.remove('low');
        priorityImg1.classList.remove('white');
        priorityImg2.classList.add('white');
        priorityImg3.classList.remove('white');
    }
}



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
        low.classList.add('low')
        urgent.classList.remove('urgent')
        medium.classList.remove('medium')
        priorityImg1.classList.remove('white');
        priorityImg2.classList.remove('white');
        priorityImg3.classList.add('white');
    }
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
    window.location.href = `index.html?msg=Du hast dich erfolgreich ausgeloggt`;
}

function findCategory(categoryName) {
    return createdCategorys.find((obj) => obj.categoryName === categoryName);
  }



// Create New Task Function
async function addTaskToBoard() {
    showDropDown();
    document.getElementById('display-categories').innerHTML = `
    <p id="select-category-inner">Select task category</p>
    <img id="dropwdown-icon" class="dropdown-icon" src="../assets/icons/dropdown.png" alt="">`;
    let title = document.getElementById('task-title').value;
    let categoryName = document.getElementById('category_Name_to_Task').innerHTML;
    let category = findCategory(categoryName);
    let date = document.getElementById('task-date').value;
    let taskDescription = document.getElementById('task-description').value;
    let lastItem = testData[testData.length - 1];
    if (testData.length === 0) {
        let newItem = {
            "title": title,
            "cat": {
                categoryName: category['categoryName'],
                categoryColor: category['categoryColor']
            },
            "description": taskDescription,
            "status": 'todo',
            "priority": priority,
            "date": date,
            "assignedContacts": assignedContacts,
            "subtasks": renderSubtasks(),
            "id": 0
        };
        testData.push(newItem);
        await backend.setItem('testData', JSON.stringify(testData));
        // Condition to check if the selected item is already passed
    } else {
        let newId = Number(lastItem.id) + 1;
        let newItem = {
            "title": title,
            "cat": {
                categoryName: category['categoryName'],
                categoryColor: category['categoryColor']
            },
            "description": taskDescription,
            "status": 'todo',
            "priority": priority,
            "date": date,
            "assignedContacts": assignedContacts,
            "subtasks": renderSubtasks(),
            "id": newId.toString()
        };
        testData.push(newItem);
        await backend.setItem('testData', JSON.stringify(testData));
        await includeHTML();
        clearInputFields();
        userAddedSuccessfull(title);
    }
}




function removePrioritys() {
    urgent.classList.remove('urgent');
    priorityImg1.classList.remove('white');
    medium.classList.remove('medium');
    priorityImg2.classList.remove('white');
    low.classList.remove('low');
    priorityImg3.classList.remove('white');

}


function renderSubtasks() {
    let resultArray = [];
    for (let i = 0; i < subtaskArray.length; i++) {
        let subtask = subtaskArray[i];
        let obj = {
            "subtask": subtask,
            "status": 'open'
        };
        resultArray.push(obj);
    }
    return resultArray;
}

function userAddedSuccessfull(title) {
    let container = document.getElementById('successfull_added');
    addAnimation();
    container.innerHTML = '';
    container.innerHTML = `
    <div>
    Aufgabe 
    <br>
    <b>${title}</b> 
    <br>
    erstellt!
    </div> 
    `;
}

function addSubtask() {
    let subtaskInput = document.getElementById('task-subtask').value;
    if (subtaskInput.length <= 2) {
        alert('Mindestens 3 Zeichen sind nötig um ein Subtask zu');
    }
    else {
        subtaskArray.push(subtaskInput);
        renderSubtasksInPopUp();
        document.getElementById('task-subtask').value = '';
    }
}



function renderSubtasksInPopUp() {
    let subTasks = document.getElementById('subtasks');
    subTasks.innerHTML = '';
    for (let i = 0; i < subtaskArray.length; i++) {
        let subtaskInput = subtaskArray[i];
        subTasks.innerHTML += `<li class="subtask-list">${subtaskInput} <button type="button" onclick="deleteSubtask(${i})" id="delete-subtask">❌</button></li>`;
    }
   
}

function deleteSubtask(i) {
    subtaskArray.splice(i, 1);
    renderSubtasksInPopUp();
}

function addAnimation() {
    let animation = document.getElementById('successfull_added');
    animation.classList.remove('display_opacity');
    animation.classList.add('successfull_added_animation');

    setTimeout(() => {
        animation.classList.remove('successfull_added_animation');
        animation.classList.add('display_opacity');
        window.location.href = 'board.html';
    }, 3000);
}

function clearInputFields() {
    document.getElementById('task-title').value = '';
    document.getElementById('select-category-inner').value = '';
    document.getElementById('task-date').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('task-subtask').value = '';
    document.getElementById('select-contact-add').value = '';
    subtaskArray = [];
    document.getElementById('subtasks').innerHTML = '';
    if (priority == 'Urgent') {
        changeUrgentColor();
    }
    if (priority == 'Medium') {
        changeMediumColor();
    }
    if (priority == 'Low') {
        changeLowColor();
    }
}

function resetForm() {
    document.getElementById("createtask-form").reset();
    clearInputFields();
}

function showHelpMeSection() {
    document.getElementById('help-me-container').classList.remove('d-none');
    document.getElementById('createtask-form').classList.add('d-none');
    document.getElementById('side_bar').classList.add('d-none');
}

function hideHelpMeSection() {
    document.getElementById('help-me-container').classList.add('d-none');
    document.getElementById('createtask-form').classList.remove('d-none');
    document.getElementById('side_bar').classList.remove('d-none');
}



let displayCategories = document.getElementById('display-categories');
let categorys = document.getElementById('show-categorys');
let addNewCategory = document.getElementById('add-new-category');
let newCategoryName = document.getElementById('new-category-name');
let categoryAlert = document.getElementById('category-alert');
let newCategoryContainer = document.getElementById('new-category-container');
let newCategory = document.getElementById('new-category');

// render categorys from array
function renderCategorys() {
    let categorys = document.getElementById('created-categorys');
    categorys.innerHTML = '';
    for (let i = 0; i < createdCategorys.length; i++) {
      let createdCategory = createdCategorys[i];
      let categoryElement = document.createElement('div');
      categoryElement.id = `new-category-${i}`;
      categoryElement.classList.add('new-category');
      categoryElement.innerHTML = `
        <div class="new_category_item">
            <div id="category_Name_to_Task">${createdCategory['categoryName']}</div>
            <div class="${createdCategory['categoryColor']}"></div>
        </div>
      `;
      // Create remove button
      let removeButton = document.createElement('button');
      removeButton.id = 'remove-button';
      removeButton.textContent = 'X';

      removeButton.addEventListener('click', function(event) {
        event.stopPropagation();
        if (createdCategorys[i] === document.getElementById('select-category-inner').textContent) {
          document.getElementById('select-category-inner').textContent = 'Select task category';
        }
        createdCategorys.splice(i, 1);
        renderCategorys();
      });
      categoryElement.appendChild(removeButton);
      // Add click event listener to select category
      categoryElement.addEventListener('click', function() {
        document.getElementById('select-category-inner').innerHTML = `
        <div class="new_category_item">
            <div id="category_Name_to_Task">${createdCategory['categoryName']}</div>
            <div class="${createdCategory['categoryColor']}"></div>
        </div>`;
        document.getElementById('show-categorys').classList.add('d-none')
      });

      categorys.appendChild(categoryElement);
    }
}
  

// hide or show categorylist
displayCategories.addEventListener('click', function () {
    
    if (categorys.classList.contains('d-none')) {
        categorys.classList.remove('d-none');
        newCategory.classList.remove('d-none');
    } else {
        categorys.classList.add('d-none');
        newCategory.classList.add('d-none');
    }
    renderCategorys();
});


// show new category input when clicking on 'create new category'
newCategory.addEventListener('click', function () {

    categorys.classList.add('d-none');
    newCategoryContainer.classList.remove('d-none');
    displayCategories.classList.add('d-none');

});


addNewCategory.addEventListener('click', async function () {
    if (newCategoryName.value == '') {
        categoryAlert.classList.remove('d-none');
    } else {
        let newCategory = {
            categoryName: newCategoryName.value,
            categoryColor: newCategoryColor
        };
        createdCategorys.push(newCategory);
        await backend.setItem('createdCategorys', JSON.stringify(createdCategorys));
        hideNewCategory();
    }
    renderCategorys();
    newCategoryColor = '';
});  


function displayColor(color) {
    // Get the clicked image
    const clickedImage = event.target;
    // Get the parent container of the clicked image
    const parentContainer = clickedImage.parentNode;
    // Get all the color images in the parent container
    const colorImages = parentContainer.querySelectorAll('img');
    // Loop through each color image
    colorImages.forEach(image => {
        // Check if the clicked image matches the current image in the loop
        if (image === clickedImage) {
            newCategoryColor = color;
            // Remove the "d-none" class from the clicked image
            image.classList.remove('d-none');
        } else {
            // Add the "d-none" class to all other color images
            image.classList.add('d-none');
        }
    });
}


function hideNewCategory() {
    categorys.classList.remove('d-none');
    document.getElementById('show-categorys').classList.add('d-none');
    displayCategories.classList.remove('d-none');
    newCategoryContainer.classList.add('d-none');
    newCategoryName.value = '';
    categoryAlert.classList.add('d-none');
    const colorImages = document.querySelectorAll('.new-category-colors img');
    colorImages.forEach(image => {
        image.classList.remove('d-none');
        
    });
}




function showDropDown() {
    if (dropDownShow == false) {
        for (let i = 0; i < contacts.length; i++) {
            let contact = contacts[i];
            document.getElementById('contact_dropdown').innerHTML += `
            <div onclick="selectContact(${i})"  class="dropdown_content"><div>${contact['name']}</div> <div class="dropdown_checkbox" id="dropdown_checkbox${i}">▢</div> </div>`;
        }
        return dropDownShow = true;
    }

    if (dropDownShow == true) {
        document.getElementById('contact_dropdown').innerHTML = ``;
        return dropDownShow = false;
    }
}

function selectContact(i) {
    let contact = contacts[i];
    let alreadyAssigned = alreadyAssignedContact(i);
    if (alreadyAssigned) {
        document.getElementById(`dropdown_checkbox${i}`).innerHTML = '▢';
        let assignedContact = assignedContacts.find(ac => ac.name == contact.name);
        let j = assignedContacts.indexOf(assignedContact);
        assignedContacts.splice(j, i);
    }
    if (!alreadyAssigned) {
        document.getElementById(`dropdown_checkbox${i}`).innerHTML = '▣';
        assignedContacts.push(contacts[i].name);
    }

}

function alreadyAssignedContact(i) {
    let container = document.getElementById(`dropdown_checkbox${i}`).innerHTML;
    console.log(container);
    if (container == '▣') {
        return true;
    }
    if (container == '▢') {
        return false;
    }
}