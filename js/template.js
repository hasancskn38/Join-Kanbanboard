function taskTemplate(i, test, finishedSubTasks) {
    if (test['subtasks'].length === 0) {
        return `
    <div onclick="openTaskPopUp(${i})" draggable=true ondragstart="startDragging(${test['id']})"  id='stage-container' class="test">
    <h3 class="task_${test.cat.categoryColor}" id="category-${i}">${test.cat.categoryName}</h3>
    <h4>${test.description}</h4>
    <p id="task-title" class="grey">${test.title}</p>
    <div class="progress-container">
    <div class="subtasks-done"></div>
    </div>
   
    <div class="contact-priority-container">

    <div id="assigned-contacts-${i}" class="assigned-contact">
    
    </div>

    <div class="priority-level">
    <img id="urgent-main-${i}" class="" src="../assets/icons/urgent.png">
    <img id="medium-main-${i}" class="" src="../assets/icons/medium.png">
    <img id="low-main-${i}" class="" src="../assets/icons/low.png"></div>
    </div>
    </div>
    `;
    }
    if (test['subtasks'].length !== 0) {
        return `
    <div onclick="openTaskPopUp(${i})" draggable=true ondragstart="startDragging(${test['id']})"  id='stage-container' class="test">
    <h3 class="task_${test.cat.categoryColor}" id="category-${i}">${test.cat.categoryName}</h3>
    <h4>${test.description}</h4>
    <p id="task-title" class="grey">${test.title}</p>
    <div class="progress-container">
    <progress style=width:80% value="${finishedSubTasks}" max="${test['subtasks'].length}"></progress>
    <div class="subtasks-done">${finishedSubTasks}/${test['subtasks'].length} Done</div>
    </div>
   
    <div class="contact-priority-container">

    <div id="assigned-contacts-${i}" class="assigned-contact">
    
    </div>

    <div class="priority-level">
    <img id="urgent-main-${i}" class="" src="../assets/icons/urgent.png">
    <img id="medium-main-${i}" class="" src="../assets/icons/medium.png">
    <img id="low-main-${i}" class="" src="../assets/icons/low.png"></div>
    </div>
    </div>
    `;
    }

}



function renderShowContactsHTML(contactColor, bothFirstLetter, contactName, contactEmail, contactPhone, i) {
    return `
    <div class="border-for-contacts"></div>
     <div id="contact_nr${i}" class="over" onclick="openDetailContact('${bothFirstLetter}', '${contactColor}', '${contactName}', '${contactEmail}', '${contactPhone}', ${i})">
      <div class="over-div-letter-name-email">
      <div style="background-color: ${contactColor}" class="letter-circle">${bothFirstLetter}</div>
      <div>
        <div class="single-name">${contactName}</div>
        <span class="contact-email">${contactEmail}</span>
       </div>
       </div>
       </div>
    </div>
    <button onclick="openAddContact()" class="new-contact2">New Contact<img
                src="../assets/img/new.contact.png"></button>
    `;
}


function renderLetterContainerHTML(letter, i) {
    return `
    <div class="main-show-contact">
    <div class="first-great-letter" id="first-great-letter">${letter}</div>
    <div id="contactLetter${i}"></div>
    `;
}




function renderOpenDetailContact(bothFirstLetter, contactColor, contactName, contactEmail, contactPhone, i) {
    return `
    <div id="detail-main" class="detail-main">
    <span class="span-display-none">Kanban Project Management Tool</span>
    <div onclick="slideBack()" class="arrow-div"></div>
        <div class="contact-detail-header">
            <div style="background-color: ${contactColor}" class="big-letters">${bothFirstLetter}</div>
            <div>
                <div class="contact-detail-header-right">
                 <div class="contact-detail-name">${contactName}</div>
                 <div onclick="openAddTaskPopUp()" class="add-task-link">
                  <img class="plus-img" src="../assets/img/plus.small.png">Add Task</div>
                </div>
            </div>
        </div>
        <div class="contact-detail-body">
            <div class="contact-detail-body-top">
                <div class="detail-information">Contact Information</div>
                <div class="contact-detail-edit " onclick="openEdit('${contactName}', '${contactEmail}', '${contactPhone}', '${contactColor}', '${bothFirstLetter}', '${i}')">
                    <img class="pencil-img" src="../assets/img/pencil.small.png">
                    Edit Contact
                </div>
                <div class="contact-detail-edit" onclick="deleteContact(${i})">
                    <span class="red">Delete Contact</span>
                </div>
            </div>
            <div class="contact-detail-bottom">Email</div>
            <a class="contact-detail-email" href="mailto:${contactEmail}">${contactEmail}</a>
            <div class="contact-detail-bottom">Phone</div>
            <a class="contact-detail-phone" href="tel:${contactPhone}">${contactPhone}</a>
            <div class="edit-contact-responsive" onclick="openAddContact()"><img src="../assets/img/white_pencil.png"></div>
        </div>
    </div>
    `;
}


function redenderAddNewContactTemp2() {
    return `
    <div onclick="doNotClose(event)" id="add-contact-layout-2" class="add-contact-layout-2">
    <div class="add-contact-top">
        <img class="close-Img" src="../assets/img/close_icon.png" onclick="closeAddContact()">
        <img class="join-logo-contact" src="../assets/img/logo-white.png">
        <h2 class="add-contact-title">Add contact</h2>
        <h4 class="add-contact-info">Tasks are better with a team</h4>
    </div>
    <div class="add-contact-middle">
        <div class="user-img">
            <img class="user" src="../assets/img/Vector.png">
        </div>
        <div class="form">
            <form class="add-contact-form" onsubmit="AddNewContact(); return false;">
                <div class="add-contact-input-field">
                    <input id="new-contact-name" class="conact-name-form contacts-input" type="text"
                        placeholder="Name" required>
                    <img src="../assets/img/Input_Name.png">
                </div>
                <div class="add-contact-input-field">
                    <input id="new-contact-email" class="conact-name-form contacts-input" type="email"
                        placeholder="Email" required>
                    <img src="../assets/img/Input_Email.png">
                </div>
                <div class="add-contact-input-field">
                    <input id="new-contact-phone" class="conact-name-form contacts-input" type="number"
                        placeholder="Phone" required>
                    <img src="../assets/img/Input_Phone.png">
                </div>
                <div class="add-contact-button">
                    <button class="creat-contact">Create Contact<img src="../assets/img/new.contact.png"></button>
                </div>
            </form>
        </div>
    </div>
</div>
    `;
}


function renderOpenEdit(contactName, contactEmail, contactPhone, contactColor, bothFirstLetter, i) {
    return `
    <div onclick="doNotClose(event)" id="add-contact-layout-2" class="add-contact-layout-2">
    <div class="add-contact-top">
        <img class="close-Img" src="../assets/img/close_icon.png" onclick="closeAddContact()">
        <img class="join-logo-contact" src="../assets/img/logo-white.png">
        <h2 class="add-contact-title">Edit contact</h2>
    </div>
    <div class="add-contact-middle">
        <div style="background-color: ${contactColor}" class="big-letter-user">${bothFirstLetter}
        </div>
        <div class="form">
            <form class="add-contact-form" onsubmit="editContactSave(${i}); return false;">
                <div class="add-contact-input-field">
                    <input id="new-edit-contact-name" class="conact-name-form contacts-input" type="text"
                        placeholder="Name" required value="${contactName}">
                    <img src="../assets/img/Input_Name.png">
                </div>
                <div class="add-contact-input-field">
                    <input id="new-edit-contact-email" class="conact-name-form contacts-input" type="email"
                        placeholder="Email" required value="${contactEmail}">
                    <img src="../assets/img/Input_Email.png">
                </div>
                <div class="add-contact-input-field">
                    <input id="new-edit-contact-phone" class="conact-name-form contacts-input" type="number"
                        placeholder="Phone" required value="${contactPhone}">
                    <img src="../assets/img/Input_Phone.png">
                </div>
                <div class="create-contact-container">
                <button class="creat-contact">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>
    `;
}


function emptyTaskTemplate() {
    return `<div class="empty-container">
    <h2></h2>
</div>`;
}



function openTaskPopUpTemplate(test, i, contact) {
    if (test['status'] === 'todo') {
        return `
    <div class="task-popup-container">
                    <button class="cursor" onclick="closeTaskPopUp()">X</button>
                    <h3 class="task_${test.cat.categoryColor}" id="category-${i}">${test.cat.categoryName}</h3>
                    <h1 id="task-popup-header" class="grey task-popup-header">${test.title}</h1>
                    <p>${test.description}</p>
                    <ul>
                        <li><b>Due Date:</b> ${test.date}</li>
                        <li><b>Priority:</b><span id="test-priority">${test.priority}</span> </li>
                        <li><b>Assigned to:</b>
                        <div id="assigned-popup-contacts-${i}" class="assigned-contacts-popup">
                        
                        </div>
                        </li>
                    </ul>

                    <div id="subtasks-container"></div>
                    <select class="d-none" onchange="updateStageOption(${i})" id="stage_option${i}">
                        <option value="${test['status']}">${test['status']}</option>
                        <option value="progress">progress</option>
                        <option value="feedback">feedback</option>
                        <option value="done">done</option>
                    </select>
                    <img onclick="openEditTask(${i})" class="edit-button cursor" src="../assets/icons/editbutton.png" alt="">
                </div>
    `;
    }
    if (test['status'] === 'progress') {
        return `
    <div class="task-popup-container">
                    <button class="cursor" onclick="closeTaskPopUp()">X</button>
                    <h3 class="task_${test.cat.categoryColor}" id="category-${i}">${test.cat.categoryName}</h3>
                    <h1 id="task-popup-header" class="grey task-popup-header">${test.title}</h1>
                    <p>${test.description}</p>
                    <ul>
                        <li><b>Due Date:</b> ${test.date}</li>
                        <li><b>Priority:</b><span id="test-priority">${test.priority}</span> </li>
                        <li><b>Assigned to:</b>
                        <div id="assigned-popup-contacts-${i}" class="assigned-contacts-popup">
                        
                        </div>
                        </li>
                    </ul>

                    <div id="subtasks-container"></div>
                    <select class="d-none" onchange="updateStageOption(${i})" id="stage_option${i}">
                        <option value="${test['status']}">${test['status']}</option>
                        <option value="todo">todo</option>
                        <option value="feedback">feedback</option>
                        <option value="done">done</option>
                    </select>
                    <img onclick="openEditTask(${i})" class="edit-button cursor" src="../assets/icons/editbutton.png" alt="">
                </div>
    `;
    }
    if (test['status'] === 'feedback') {
        return `
    <div class="task-popup-container">
                    <button class="cursor" onclick="closeTaskPopUp()">X</button>
                    <h3 class="task_${test.cat.categoryColor}" id="category-${i}">${test.cat.categoryName}</h3>
                    <h1 id="task-popup-header" class="grey task-popup-header">${test.title}</h1>
                    <p>${test.description}</p>
                    <ul>
                        <li><b>Due Date:</b> ${test.date}</li>
                        <li><b>Priority:</b><span id="test-priority">${test.priority}</span> </li>
                        <li><b>Assigned to:</b>
                        <div id="assigned-popup-contacts-${i}" class="assigned-contacts-popup">
                        
                        </div>
                        </li>
                    </ul>

                    <div id="subtasks-container"></div>
                    <select class="d-none" onchange="updateStageOption(${i})" id="stage_option${i}">
                        <option value="${test['status']}">${test['status']}</option>
                        <option value="todo">todo</option>
                        <option value="progress">progress</option>
                        <option value="done">done</option>
                    </select>
                    <img onclick="openEditTask(${i})" class="edit-button cursor" src="../assets/icons/editbutton.png" alt="">
                </div>
    `;
    }
    if (test['status'] === 'done') {
        return `
    <div class="task-popup-container">
                    <button class="cursor" onclick="closeTaskPopUp()">X</button>
                    <h3 class="task_${test.cat.categoryColor}" id="category-${i}">${test.cat.categoryName}</h3>
                    <h1 id="task-popup-header" class="grey task-popup-header">${test.title}</h1>
                    <p>${test.description}</p>
                    <ul>
                        <li><b>Due Date:</b> ${test.date}</li>
                        <li><b>Priority:</b><span id="test-priority">${test.priority}</span> </li>
                        <li><b>Assigned to:</b>
                        <div id="assigned-popup-contacts-${i}" class="assigned-contacts-popup">
                        
                        </div>
                        </li>
                    </ul>

                    <div id="subtasks-container"></div>
                    <select class="d-none" onchange="updateStageOption(${i})" id="stage_option${i}">
                        <option value="${test['status']}">${test['status']}</option>
                        <option value="todo">todo</option>
                        <option value="progress">progress</option>
                        <option value="feedback">feedback</option>
                    </select>
                    <img onclick="openEditTask(${i})" class="edit-button cursor" src="../assets/icons/editbutton.png" alt="">
                </div>
    `;
    }
}


function openEditTaskPopUp(test, i) {
    return `<div class="edit-task-container">
    <button class="cursor close-edit-task" onclick="closeEditTask()">X</button>
    <div class="input-container-edit">
    <input id="input-edit-${i}" type="text" value="${test.title}">
    </div>
    <h2>Description</h2>
    <textarea id="edit-description${i}">${test.description}</textarea>
    <h2 class="date-header-edit">Due date</h2>

    <label for="appointment">
                            <h4 class="date-header">Due date</h4>
                            <div class="date">
                                <input id="task-date-edit${i}" value="${test.date}" required type="date" />
                            </div>
                        </label>
    <div class="priority">
    <div class="priority-levels cursor priority-edit" id="urgent-edit" onclick="changeUrgentColorEdit(); editPriority('Urgent');"><span
            id="urgent-inner-edit">Urgent</span><img id="img1-edit" src="../assets/icons/urgent.png"
            alt=""></div>
    <div class="priority-levels cursor priority-edit" id="medium-edit" onclick="changeMediumColorEdit(); editPriority('Medium');"><span
            id="medium-inner-edit">Medium</span> <img id="img2-edit" src="../assets/icons/medium.png"
            alt=""></div>
    <div class="priority-levels cursor priority-edit" id="low-edit" onclick="changeLowColorEdit(); editPriority('Low');"><span
            id="low-inner-edit">Low</span><img id="img3-edit" src="../assets/icons/low.png" alt=""></div>
</div>
<div required onclick="showDropDown('edit')" id="select-contact-add" class="select-contact cursor"><div> Select contacts to assign</div> <div class="arrow"><img id="dropwdown-icon"
                            class="dropdown-icon" src="../assets/icons/dropdown.png" alt=""></div>
                        </div>
                        <div id="contact_dropdown_edit" class="contact_dropdown">
                        
                        </div>
</div>
<div class="show_subtasks" id="show_subtasks">
</div>


<ul id="subtasks_edit">

</ul>
<div class="edit-task-button-container">


<div onclick="submitChanges(${i})" class="cursor submit-change">
<p>Ok</p>
<img class="cursor" src="../assets/icons/checkmark-white.png" alt="">
</div>

<button class="delete-task cursor" onclick="deleteTask(${i})" class="cursor">Delete Task</button>
</div>
`;
}