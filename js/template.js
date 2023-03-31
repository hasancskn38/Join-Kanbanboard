function toDoTemplate(i, test, finishedSubTasks) {
    if (test['subtasks'].length === 0) {
        return `
    <div onclick="openTaskPopUp(${i})" draggable=true ondragstart="startDragging(${test['id']})"  id='stage-container' class="test cursor">
    <h3 id="category-${i}">${test.cat}</h3>
    <h4 class="blue">${test.description}</h4>
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
    `
    }
    else {
        return `
    <div onclick="openTaskPopUp(${i})" draggable=true ondragstart="startDragging(${test['id']})"  id='stage-container' class="test cursor">
    <h3 id="category-${i}">${test.cat}</h3>
    <h4 class="blue">${test.description}</h4>
    <p id="task-title" class="grey">${test.title}</p>
    <div class="progress-container">
    <progress style:width:80% value="${finishedSubTasks}" max="${test['subtasks'].length}"></progress>
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
    `
    }
}

function progressTemplate(i, test, finishedSubTasks) {
    if (test['subtasks'].length === 0) {
        return `
    <div onclick="openTaskPopUp(${i})" draggable=true ondragstart="startDragging(${test['id']})"  id='stage-container' class="test cursor">
    <h3 id="category-${i}">${test.cat}</h3>
    <h4 class="blue">${test.description}</h4>
    <p id="task-title" class="grey">${test.title}</p>
    <div class="progress-container">
    <!-- <div class="progress"><progress></div> -->
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
    `
    }
    else {
        return `
    <div onclick="openTaskPopUp(${i})" draggable=true ondragstart="startDragging(${test['id']})"  id='stage-container' class="test cursor">
    <h3 id="category-${i}">${test.cat}</h3>
    <h4 class="blue">${test.description}</h4>
    <p id="task-title" class="grey">${test.title}</p>
    <div class="progress-container">
    <progress width="80%" value="${finishedSubTasks}" max="${test['subtasks'].length}"></progress>
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
    `
    }
}

function feedBackTemplate(i, test, finishedSubTasks) {
    if (test['subtasks'].length === 0) {
        return `
    <div onclick="openTaskPopUp(${i})" draggable=true ondragstart="startDragging(${test['id']})"  id='stage-container' class="test cursor">
    <h3 id="category-${i}">${test.cat}</h3>
    <h4 class="blue">${test.description}</h4>
    <p id="task-title" class="grey">${test.title}</p>
    <div class="progress-container">
    <!-- <div class="progress"><progress></div> -->
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
    `
    }
    else {
        return `
    <div onclick="openTaskPopUp(${i})" draggable=true ondragstart="startDragging(${test['id']})"  id='stage-container' class="test cursor">
    <h3 id="category-${i}">${test.cat}</h3>
    <h4 class="blue">${test.description}</h4>
    <p id="task-title" class="grey">${test.title}</p>
    <div class="progress-container">
    <progress width="80%" value="${finishedSubTasks}" max="${test['subtasks'].length}"></progress>
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
    `
    }
}

function doneTemplate(i, test, finishedSubTasks) {
    if (test['subtasks'].length === 0) {
        return `
    <div onclick="openTaskPopUp(${i})" draggable=true ondragstart="startDragging(${test['id']})"  id='stage-container' class="test cursor">
    <h3 id="category-${i}">${test.cat}</h3>
    <h4 class="blue">${test.description}</h4>
    <p id="task-title" class="grey">${test.title}</p>
    <div class="progress-container">
    <!-- <div class="progress"><progress></div> -->
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
    `
    }
    else {
        return `
    <div onclick="openTaskPopUp(${i})" draggable=true ondragstart="startDragging(${test['id']})"  id='stage-container' class="test cursor">
    <h3 id="category-${i}">${test.cat}</h3>
    <h4 class="blue">${test.description}</h4>
    <p id="task-title" class="grey">${test.title}</p>
    <div class="progress-container">
    <progress width="80%" value="${finishedSubTasks}" max="${test['subtasks'].length}"></progress>
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
    `
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
    <div onclick="slideBack()" class="arrow-div"><img class="arrow-img" src="../assets/img/arrowBlue.png"></div>
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
                <div class="contact-detail-edit" onclick="openEdit('${contactName}', '${contactEmail}', '${contactPhone}', '${contactColor}', '${bothFirstLetter}', '${i}')">
                    <img class="pencil-img" src="../assets/img/pencil.small.png">
                    Edit Contact
                </div>
                <div class="contact-detail-edit" onclick="deleteContact(${i})">
                    Delete Contact
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
                <button class="creat-contact">Create Contact<img src="../assets/img/new.contact.png"></button>
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
            <form class="add-contact-form" onsubmit="editContactSave('${contactName}', '${contactEmail}', '${contactPhone}', '${i}'); return false;">
                <div class="add-contact-input-field">
                    <input id="new-contact-name" class="conact-name-form contacts-input" type="text"
                        placeholder="Name" required value="${contactName}">
                    <img src="../assets/img/Input_Name.png">
                </div>
                <div class="add-contact-input-field">
                    <input id="new-contact-email" class="conact-name-form contacts-input" type="email"
                        placeholder="Email" required value="${contactEmail}">
                    <img src="../assets/img/Input_Email.png">
                </div>
                <div class="add-contact-input-field">
                    <input id="new-contact-phone" class="conact-name-form contacts-input" type="number"
                        placeholder="Phone" required value="${contactPhone}">
                    <img src="../assets/img/Input_Phone.png">
                </div>
                <button class="creat-contact">Save</button>
            </form>
        </div>
    </div>
</div>
    `;
}


function emptyTodoTemplate() {
    return `<div class="empty-container">
    <h2>There are no todos</h2>
</div>`
}
function emptyProgressTemplate() {
    return `<div class="empty-container">
        <h2>There are no tasks in progress</h2>
    </div>`
}
function emptyFeedbackTemplate() {
    return `<div class="empty-container">
    <h2>There are no tasks that need feedback</h2>
</div>`
}
function emptyDoneTemplate() {
    return `<div class="empty-container">
    <h2>There are no tasks that are done</h2>
</div>`
}


function openTaskPopUpTemplate(test, i, contact) {
    return `
    <div class="task-popup-container">
                    <button class="cursor" onclick="closeTaskPopUp()">X</button>
                    <h3 id="category-${i}">${test.cat}</h3>
                    <h1 id="task-popup-header" class="grey task-popup-header">${test.title}</h1>
                    <p class="blue">${test.description}</p>
                    <ul>
                        <li><b>Due Date:</b> ${test.date}</li>
                        <li><b>Priority:</b><span id="test-priority">${test.priority}</span> </li>
                        <li><b>Assigned to:</b>
                        <div id="assigned-contacts-${i}" class="assigned-contacts-popup">
                        
                        </div>
                        </li>
                    </ul>

                    <div id="subtasks-container"></div>

                    <img onclick="openEditTask(${i})" class="edit-button cursor" src="../assets/icons/editbutton.png" alt="">
                </div>
    `
}


function openEditTaskPopUp(test, i) {
    return `<div class="edit-task-container">
    <button class="cursor close-edit-task" onclick="closeEditTask()">X</button>
    <div class="input-container-edit">
    <input id="input-edit-${i}" type="text" value="${test.title}">
    </div>
    <select required id="select-category-edit${i}" class="cursor">
                            <option value="${test.cat}" selected hidden>${test.cat}</option>
                            <option class="design-option" value="Design">Design</option>
                            <option class="sales-option" value="Sales">Sales</option>
                            <option class="backoffice-option" value="Backoffice">Backoffice</option>
                            <option class="marketing-option" value="Marketing">Marketing</option>
                        </select>

    <h2>Description</h2>
    <textarea id="edit-description${i}">${test.description}</textarea>
    <h2 class="date-header-edit">Due date</h2>
    <label for="appointment">
        <div class="date-edit">
        <input id="task-date-edit${i}" value="${test.date}" required="" type="text" class="form-control" placeholder="dd/mm/yyyy" onfocus="(this.type='date')"/>
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
<select multiple required id="select-contact-edit" class="select-contact cursor">
<option value="" disabled selected hidden>Select contacts to assign</option>
</select>
</div>
<div class="show_subtasks" id="show_subtasks">
</div>
<div class="edit-task-button-container">
<button class="submit-change cursor" onclick="submitChanges(${i})">Submit Changes</button>
<button class="delete-task cursor" onclick="deleteTask(${i})" class="cursor">Delete Task</button>
</div>
`
}