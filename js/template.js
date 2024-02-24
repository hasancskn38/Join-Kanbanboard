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

    <div id="arrow-img" onclick="slideBack()" class="arrow-div">
    <img class="arrow-img pd-0" src="../assets/img/arrowBlue.png">
    </div>
        <div class="contact-detail-header">
            <div style="background-color: ${contactColor}" class="big-letters">${bothFirstLetter}</div>
            <div>
                <div class="contact-detail-header-right">
                 <div class="contact-detail-name">${contactName}</div>
                 <div onclick="openAddTaskPopUp()" class="add-task-link">
                  <img class="plus-img pd-0" src="../assets/img/plus.small.png">Add Task</div>
                </div>
            </div>
        </div>
        <div class="contact-detail-body">
            <div class="contact-detail-body-top">
                <div class="detail-information">Contact Information</div>

                <div class="contact-edit-delete-container">
                <div class="contact-detail-edit " onclick="openEdit('${contactName}', '${contactEmail}', '${contactPhone}', '${contactColor}', '${bothFirstLetter}', '${i}')">
                    <img class="pencil-img pd-0" src="../assets/img/pencil.small.png">
                    Edit Contact
                </div>

                <div class="edit-contact-responsive cursor" onclick="openEdit('${contactName}', '${contactEmail}', '${contactPhone}', '${contactColor}', '${bothFirstLetter}', '${i}')">
                <img class="pd-0 edit-contact" src="../assets/img/white_pencil.png">
                </div>

                <div class="delete-contact-button cursor" onclick="deleteContact(${i})">
                    <p>Delete Contact</p>
                </div>
                </div>

            </div>
            <div class="contact-detail-bottom">Email</div>
            <a class="contact-detail-email" href="mailto:${contactEmail}">${contactEmail}</a>
            <div class="contact-detail-bottom">Phone</div>
            <a class="contact-detail-phone" href="tel:${contactPhone}">${contactPhone}</a>
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
                    <button class="creat-contact">Create Contact<img class="img-new-contact" src="../assets/img/new.contact.png"></button>
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
                    <div class="header-task-popup">
                    <h3 class="task_${test.cat.categoryColor}" id="category-${i}">${test.cat.categoryName}</h3>
                    <button class="cursor button" onclick="closeTaskPopUp()">X</button>
                    </div>
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

                <div class="open-edit-task-container">
                <img onclick="openEditTask(${i})" class="edit-button cursor" src="../assets/icons/editbutton.png" alt="">
                </div>

                </div>
    `;
    }
    if (test['status'] === 'progress') {
        return `
    <div class="task-popup-container">
                    <div class="header-task-popup">
                    <h3 class="task_${test.cat.categoryColor}" id="category-${i}">${test.cat.categoryName}</h3>
                    <button class="cursor button" onclick="closeTaskPopUp()">X</button>
                    </div>
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
                    <div class="open-edit-task-container">
                    <img onclick="openEditTask(${i})" class="edit-button cursor" src="../assets/icons/editbutton.png" alt="">
                    </div>
                </div>
    `;
    }
    if (test['status'] === 'feedback') {
        return `
                    <div class="task-popup-container">
                    <div class="header-task-popup">
                    <h3 class="task_${test.cat.categoryColor}" id="category-${i}">${test.cat.categoryName}</h3>
                    <button class="cursor button" onclick="closeTaskPopUp()">X</button>
                    </div>
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
                    <div class="open-edit-task-container">
                    <img onclick="openEditTask(${i})" class="edit-button cursor" src="../assets/icons/editbutton.png" alt="">
                    </div>
                    </div>
    `;
    }
    if (test['status'] === 'done') {
        return `
                <div class="task-popup-container">
                <div class="header-task-popup">
                <h3 class="task_${test.cat.categoryColor}" id="category-${i}">${test.cat.categoryName}</h3>
                <button class="cursor button" onclick="closeTaskPopUp()">X</button>
                </div>
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

                    <div class="open-edit-task-container">
                    <img onclick="openEditTask(${i})" class="edit-button cursor" src="../assets/icons/editbutton.png" alt="">
                    </div>

                    </div>
    `;
    }
}


function openEditTaskPopUp(test, i) {
    return `<div class="edit-task-container">
    <button class="cursor close-edit-task" onclick="closeEditTask()">X</button>
    <div class="input-container-edit">
    <input required id="input-edit-${i}" type="text" value="${test.title}">
    </div>
    <h2>Description</h2>
    <textarea id="edit-description${i}">${test.description}</textarea>
    <h2 class="date-header-edit">Due date</h2>

    <label for="appointment">
                            <div class="date">
                                <input id="task-date-edit${i}" value="${test.date}" required type="date" />
                            </div>
                        </label>
    <h2>Priority</h2>
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
         <div class="show_subtasks" id="show_subtasks">
        </div>
        <ul id="subtasks_edit">
        </ul>
        

        <div class="edit-task-button-container">

        <div class="save-button cursor" onclick="submitChanges(${i})">
        <button  class="cursor submit-change">
        Save Changes
        </button>
        <img src="../assets/icons/checkmark.png"> 
        </div>

        <div onclick="deleteTask(${i})" class="delete-button cursor">
        <button class="cursor delete-task">
        Delete Task
        </button>
        <img src="../assets/icons/bin.png"> 
        </div>

        </div>   
        </div>

             
`;
}

/**
 * renders the subtasks to task
 * 
 * @param {string} task - right task
 * @param {Array} i - index of contact
 */
function getResultItemWithoutSubtask(task, i) {
    return `
    <div onclick="openTaskPopUp(${i})" draggable="true" ondragstart="startDragging(${i})" id="stage-container" class="test">
        <h3 class="task_${task['cat']['categoryColor']}" id="category-${i}">${task['cat']['categoryName']}</h3>
        <h4>${task['description']}</h4>
        <p id="task-title" class="grey">${task['title']}</p>
    <div class="progress-container">
    <div class="subtasks-done"></div>
    </div>

    <div class="contact-priority-container">
    <div id="assigned-contacts-${i}" class="assigned-contact"></div>
    <div class="priority-level">
        <img id="urgent-main-6" class="" src="../assets/icons/urgent.png">
        <img id="medium-main-6" class="d-none" src="../assets/icons/medium.png">
        <img id="low-main-6" class="d-none" src="../assets/icons/low.png"></div>
    </div>
    </div>
    `;
}

/**
 * renders the subtasks to task
 * 
 * @param {string} task - right task
 * @param {string} finishedSubtasks - shows the finished subtasks
 * @param {Array} i - index of contact
 */
function getResultItemWithSubtask(task, finishedSubtasks, i) {
    return `
    <div onclick="openTaskPopUp(${i})" draggable="true" ondragstart="startDragging(${i})" id="stage-container" class="test">
        <h3 class="task_${task['cat']['categoryColor']}" id="category-${i}">${task['cat']['categoryName']}</h3>
        <h4>${task['description']}</h4>
        <p id="task-title" class="grey">${task['title']}</p>

        <div class="progress-container">
        <progress style="width:80%" value="${finishedSubtasks}" max="${task['subtasks'].length}"></progress>
        <div class="subtasks-done">${finishedSubtasks}/${task.subtasks.length} Done</div>
        </div>
    <div class="progress-container">
    <div class="subtasks-done"></div>
    </div>
   
    <div class="contact-priority-container">
    <div id="assigned-contacts-${i}" class="assigned-contact"></div>
    <div class="priority-level">
        <img id="urgent-main-6" class="" src="../assets/icons/urgent.png">
        <img id="medium-main-6" class="d-none" src="../assets/icons/medium.png">
        <img id="low-main-6" class="d-none" src="../assets/icons/low.png"></div>
    </div>
    </div>
    `;
}