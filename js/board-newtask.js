let categorys = document.getElementById('show-categorys');
let addNewCategory = document.getElementById('add-new-category');
let newCategoryName = document.getElementById('new-category-name');
let categoryAlert = document.getElementById('category-alert');
let newCategoryContainer = document.getElementById('new-category-container');
let newCategory = document.getElementById('new-category');
let editDropDownClicked = false;

/**
 * Renders categories from an array.
 * 
 * @param {number} i - The index of the created category.
 * @param {Object} createdCategory - The created category object.
 * @returns {HTMLElement} The category element.
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
 * Creates a remove button for a category.
 * 
 * @param {number} i - The index of the category.
 * @param {Array} createdCategorys - The array of created categories.
 * @returns {HTMLButtonElement} The remove button element.
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
 * Adds a click event to a category element.
 * 
 * @param {HTMLElement} categoryElement - The category element.
 * @param {Object} createdCategory - The created category object.
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
 * Renders the categories on the page.
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


// hide or show categorylist
displayCategories.addEventListener('click', async function () {
    if (categorys.classList.contains('d-none')) {
        categorys.classList.remove('d-none');
        newCategory.classList.remove('d-none');
    } else {
        categorys.classList.add('d-none');
        newCategory.classList.add('d-none');
    }
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

/**
 * Displays the selected color and updates the new category color.
 * 
 * @param {string} color - The selected color.
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
 * Hides the new category input and restores the default state.
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
 * opens the dropdown for to select the contact
 *
 */
function showDropDownEdit(value) {
  let i = currentEditIndex; // Access the stored 'i' value from the global variable
  editDropDownClicked = true;

  if (dropDownShow === false) {
    for (let j = 0; j < contacts.length; j++) {
      let contact = contacts[j];
      document.getElementById(`contact_dropdown_${value}`).innerHTML += `
        <div onclick="selectContact(${j})" class="dropdown_content"><div>${contact['name']}</div> <div class="dropdown_checkbox" id="dropdown_checkbox${j}">▢</div> </div>`;
    }

    if (editDropDownClicked) {
      isContactNamePresent(i);
    }

    return (dropDownShow = true);
  }

  if (dropDownShow === true) {
    document.getElementById(`contact_dropdown_${value}`).innerHTML = '';
    return (dropDownShow = false);
  }
}
  


function showDropDown(value) {
    if (dropDownShow === false) {
      for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        document.getElementById(`contact_dropdown_${value}`).innerHTML += `
          <div onclick="selectContact(${i})" class="dropdown_content"><div>${contact['name']}</div> <div class="dropdown_checkbox" id="dropdown_checkbox${i}">▢</div> </div>`;
      }
      return (dropDownShow = true);
    }
    if (dropDownShow === true) {
      document.getElementById(`contact_dropdown_${value}`).innerHTML = '';
      return (dropDownShow = false);
    }
  }
  

/**
 * Select the contact for the task
 *
 * @param {string} i - index of the contact
 */
function selectContact(i) {
    let contact = contacts[i];
    let alreadyAssigned = alreadyAssignedContact(i);
    if (alreadyAssigned) {
      document.getElementById(`dropdown_checkbox${i}`).innerHTML = '▢';
      let assignedContact = assignedContacts.find(ac => ac.name === contact.name);
      let j = assignedContacts.indexOf(assignedContact);
      assignedContacts.splice(j, 1); // Corrected index to remove the assigned contact
    } else {
      document.getElementById(`dropdown_checkbox${i}`).innerHTML = '▣';
      assignedContacts.push(contact.name);
    }
  }
  
  /**
   * Check if the contact is already assigned
   *
   * @param {string} i - index of the contact
   * @returns {boolean} - true if already assigned, false otherwise
   */
  function alreadyAssignedContact(i) {
    let container = document.getElementById(`dropdown_checkbox${i}`).innerHTML;
    if (container === '▣') {
      return true;
    } else {
      return false;
    }
  }
