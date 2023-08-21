/**
 * adding a subtask to task
 *
 */
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

/**
 * adding the subtask into the popup task
 *
 */
function renderSubtasksInPopUp() {
    let subTasks = document.getElementById('subtasks');
    subTasks.innerHTML = '';
    for (let i = 0; i < subtaskArray.length; i++) {
        let subtaskInput = subtaskArray[i];
        subTasks.innerHTML += `<li class="subtask-list">${subtaskInput} <button type="button" onclick="deleteSubtask(${i})" id="delete-subtask">❌</button></li>`;
    }

}


/**
 * delete
 * 
 * @param {*} i used to specify the index of the subtask that should be deleted from the subtaskArray
 */
function deleteSubtask(i) {
    subtaskArray.splice(i, 1);
    renderSubtasksInPopUp();
}

/**
 * is to find the category of the task
 *
 */
function findCategory(categoryName) {
    return createdCategorys.find((obj) => obj.categoryName === categoryName);
}

/**
 * creating an element for a category
 *
 */
function createCategoryElement(i, createdCategory) {
    let categoryElement = document.createElement('div');
    categoryElement.id = `new-category-${i}`;
    categoryElement.classList.add('new-category');
    categoryElement.innerHTML = `
    <div class="new_category_item">
        <div id="category-name">${createdCategory['categoryName']}</div>
        <div class="${createdCategory['categoryColor']}"></div>
    </div>
    `;
    return categoryElement;
}


/**
 * remove button from the category
 *
 * @param {string} i - index of task
 * @param {string} createdCategorys - category which is in the task
 */
function createRemoveButton(i, createdCategorys) {
    let removeButton = document.createElement('button');
    removeButton.id = 'remove-button';
    removeButton.textContent = 'X';
    removeButton.addEventListener('click', async function (event) {
        event.stopPropagation();
        if (createdCategorys[i] === document.getElementById('select-category-inner').textContent) {
            document.getElementById('select-category-inner').textContent = 'Select task category';
        }
        createdCategorys.splice(i, 1);
        await backend.setItem('createdCategorys', JSON.stringify(createdCategorys));
        renderCategorys();
    });
    return removeButton;
}


/**
 * adds the category to the available categories
 *
 * @param {string} categoryElement - created element for the category
 * @param {string} createdCategorys - category which is in the task
 */
function addCategoryClickEvent(categoryElement, createdCategory) {
    categoryElement.addEventListener('click', function () {
        document.getElementById('select-category-inner').innerHTML = `
        <div class="new_category_item">
            <div id="category_Name_to_Task">${createdCategory['categoryName']}</div>
            <div class="${createdCategory['categoryColor']}"></div>
        </div>`;
        selectNewCategory = createdCategory;
        document.getElementById('show-categorys').classList.add('d-none');
    });
}

/**
 * adds the category to the available categories into the container
 *
 * @param {string} categoryElement - created element for the category
 * @param {string} createdCategorys - category which is in the task
 */
function renderCategorys() {
    let categorys = document.getElementById('created-categorys');
    categorys.innerHTML = '';
    for (let i = 0; i < createdCategorys.length; i++) {
        let createdCategory = createdCategorys[i];
        let categoryElement = createCategoryElement(i, createdCategory);
        let removeButton = createRemoveButton(i, createdCategorys);
        categoryElement.appendChild(removeButton);
        addCategoryClickEvent(categoryElement, createdCategory);
        categorys.appendChild(categoryElement);
    }
}


/**
 * adds the category to the available categories
 *
 */
displayCategories.addEventListener('click', async function () {
    if (categorys.classList.contains('d-none')) {
        categorys.classList.remove('d-none');
        newCategory.classList.remove('d-none');
    } else {
        categorys.classList.add('d-none');
        newCategory.classList.add('d-none');
    }
});


/**
 * adds the category to the available categories
 *
 */
newCategory.addEventListener('click', function () {
    categorys.classList.add('d-none');
    newCategoryContainer.classList.remove('d-none');
    displayCategories.classList.add('d-none');
});

/**
 * adds the category to the available categories and the color will be shown
 *
 * @param {string} color - color of the category
 */
function displayColor(color) {
    let clickedImage = event.target;
    let parentContainer = clickedImage.parentNode;
    let colorImages = parentContainer.querySelectorAll('img');
    colorImages.forEach(image => {
        if (image === clickedImage) {
            newCategoryColor = color;
            image.classList.remove('d-none');
        } else {
            image.classList.add('d-none');
        }
    });
}

/**
 * clears the subtasks input value
 *
 */
function clearSubtasksInput() {
    document.getElementById('task-subtask').value = '';
}

/**
 * adds the category to the available categories
 *
 */
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

/**
 * hides the category to the available categories
 *
 */
function hideNewCategory() {
    categorys.classList.remove('d-none');
    document.getElementById('show-categorys').classList.add('d-none');
    displayCategories.classList.remove('d-none');
    newCategoryContainer.classList.add('d-none');
    newCategoryName.value = '';
    categoryAlert.classList.add('d-none');
    let colorImages = document.querySelectorAll('.new-category-colors img');
    colorImages.forEach(image => {
        image.classList.remove('d-none');
    });
}

/**
 * opens the popup of the shown task
 *
 */
function openAddTaskPopUp() {
    document.getElementById('overlay').classList.remove('d-none');
    document.querySelector('body').classList.add('overflow-hidden');
    document.getElementById('popup').classList.remove('hide');
    document.getElementById('popup').classList.add('show');
    document.getElementById('popup').classList.remove('d-none');
    document.getElementById('side_bar').style.zIndex = 1;
    let subtaskdiv = document.getElementById('subtasks');
    subtaskdiv.innerHTML = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

/**
 * setting the priority to the task
 *
 * @param {string} value - value of the element
 */
function setPriority(value) {
    priority = value;
}

/**
 * is creating a task
 *
 * @param {string} event - event that is produced through clicking
 */
async function handleSubmit(event) {
    event.preventDefault();
    await createTask();
}


/**
 * is closing the task popup and the default board will be shown
 *
 */
function closeAddTaskPopUp() {
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('popup').classList.add('hide');
    document.getElementById('popup').classList.remove('show');
    document.querySelector('body').classList.remove('overflow-hidden');
}


/**
 * stores new item and will get into the array
 *
 * @param {string} details - details is the detailes of the task
 * @param {string} id - id of the task
 */
async function createAndStoreNewItem(details, id) {
    let newItem;
    if (id !== null) {
        newItem = getNewItemWithId(details.title, details.category, details.taskDescription, details.date, id);
    } else {
        newItem = getNewItemWithNoId(details.title, details.category, details.taskDescription, details.date);
    }
    testData.push(newItem);
    await backend.setItem('testData', JSON.stringify(testData));
}

/**
 * Is creating the task
 *
 */
async function createTask() {
    let details = await getTaskDetails();
    let lastItemId = getLastItemId();

    if (details.category === 'No-Category') {
        return;
    }
    if (priority === undefined) {
        priorityAlert();
        return;
    }

    let newId = (lastItemId !== null) ? lastItemId + 1 : null;
    await createAndStoreNewItem(details, newId);

    closeAddTaskPopUp();
    clearInputFields();
    removePrioritys();
    selectNewCategory = '';
}


/**
 * the new item will be returned to the creat task function 
 *
 * @param {string} title - title of the task
 * @param {string} category - category of the task
 * @param {string} taskDescription - task description 
 * @param {string} date - current date
 */
function getNewItemWithNoId(title, category, taskDescription, date) {
    return {
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
}

/**
 * getting new category for task
 *
 */
function getNewCategory() {
    if (selectNewCategory === '') {
        document.getElementById('select-category-inner').innerHTML = 'Keine Kategorie Ausgewählt !';
        document.getElementById('select-category-inner').classList.add('no_category_selected');
        setTimeout(() => {
            document.getElementById('select-category-inner').innerHTML = 'Select task category';
            document.getElementById('select-category-inner').classList.remove('no_category_selected');
        }, 2000);
        return 'No-Category';
    }
    else {
        return selectNewCategory;
    }
}

/**
 * the new item will be returned to the creat task function 
 *
 * @param {string} title - title of the task
 * @param {string} category - category of the task
 * @param {string} taskDescription - task description 
 * @param {string} date - current date
 */
function getNewItemWithId(title, category, taskDescription, date, newId) {
    return {
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
}

/**
 * shows an alert when no prio is selected
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

/**
 * rendering the subtasks
 *
 */
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


/**
 * removing the prio
 *
 */
function removePrioritys() {
    let priorityImg1 = document.getElementById('img1');
    let priorityImg2 = document.getElementById('img2');
    let priorityImg3 = document.getElementById('img3');
    let urgent = document.getElementById('urgent');
    let medium = document.getElementById('medium');
    let low = document.getElementById('low');
    urgent.classList.remove('urgent');
    priorityImg1.classList.remove('white');
    medium.classList.remove('medium');
    priorityImg2.classList.remove('white');
    low.classList.remove('low');
    priorityImg3.classList.remove('white');
}
