function toDoTemplate(i, test) {
    return `
    <div draggable=true ondragstart="startDragging((${test['id']}))"  id="stage-container" class="test cursor">
    <h3 id="category-${i}">${test.cat}</h3>
    <h4 class="blue">${test.description}</h4>
    <p class="grey">${test.title}</p>
    <div id="progress-bar" style="width: 50%; height: 10px; background-color: lightgrey;"> 
    <div id="progress" style="background-color: blue; height: 100%; width: 0%;"></div>
    </div>
    <div class="contact-initials">
    </div>
    </div>
    `
}

function progressTemplate(i, test) {
    return `<div draggable=true ondragstart="startDragging((${test['id']}))"  id="stage-container" class="test cursor">
    <h3 id="category-${i}">${test.cat}</h3>
    <h4 class="blue">${test.description}</h4>
    <p class="grey">${test.title}</p>
    <div id="progress-bar" style="width: 50%; height: 10px; background-color: lightgrey;"> 
    <div id="progress" style="background-color: blue; height: 100%; width: 0%;"></div>
    </div>
    <div class="contact-initials">
    </div></div>`
}

function feedBackTemplate(i, test) {
    return `<div draggable=true ondragstart="startDragging((${test['id']}))"  id="stage-container" class="test cursor">
    <h3 id="category-${i}">${test.cat}</h3>
    <h4 class="blue">${test.description}</h4>
    <p class="grey">${test.title}</p>
    <div id="progress-bar" style="width: 50%; height: 10px; background-color: lightgrey;"> 
    <div id="progress" style="background-color: blue; height: 100%; width: 0%;"></div>
    </div>
    <div class="contact-initials">
    </div>
    </div>`
}

function doneTemplate(i, test) {
    return`<div draggable=true ondragstart="startDragging((${test['id']}))"  id="stage-container" class="test cursor">
    <h3 id="category-${i}">${test.cat}</h3>
    <h4 class="blue">${test.title}</h4>
    <p class="grey">${test.description}</p>
    <div id="progress-bar" style="width: 50%; height: 10px; background-color: lightgrey;"> 
    <div id="progress" style="background-color: blue; height: 100%; width: 0%;"></div>
    </div>
    <div class="contact-initials">
    </div></div>`
}


function renderShowContacts(greatLetter, contactColor, bothFirstLetter, contactName, contactEmail, contactPhone) {
    return `
    <div class="main-show-contact">
    <div class="first-great-letter" id="first-great-letter">${greatLetter}</div>
    <div class="border-for-contacts"></div>
     <div class="over" onclick="openDetailContact('${bothFirstLetter}', '${contactColor}', '${contactName}', '${contactEmail}', '${contactPhone}')">
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
                src="/assets/img/new.contact.png"></button>
    `;
}


function renderOpenDetailContact(bothFirstLetter, contactColor, contactName, contactEmail, contactPhone) {
    return `
    <div id="detail-main" class="detail-main">
    <span class="span-display-none">Kanban Project Management Tool</span>
    <div onclick="slideBack()" class="arrow-div"><img class="arrow-img" src="/assets/img/arrowBlue.png"></div>
        <div class="contact-detail-header">
            <div style="background-color: ${contactColor}" class="big-letters">${bothFirstLetter}</div>
            <div>
                <div class="contact-detail-header-right">
                 <div class="contact-detail-name">${contactName}</div>
                 <div onclick="openAddTaskPopUp()" class="add-task-link">
                  <img class="plus-img" src="/assets/img/plus.small.png">Add Task</div>
                </div>
            </div>
        </div>
        <div class="contact-detail-body">
            <div class="contact-detail-body-top">
                <div class="detail-information">Contact Information</div>
                <div class="contact-detail-edit" onclick="openEdit('${contactName}', '${contactEmail}', '${contactPhone}', '${contactColor}', '${bothFirstLetter}')">
                    <img class="pencil-img" src="/assets/img/pencil.small.png">
                    Edit Contact
                </div>
            </div>
            <div class="contact-detail-bottom">Email</div>
            <a class="contact-detail-email" href="mailto:${contactEmail}">${contactEmail}</a>
            <div class="contact-detail-bottom">Phone</div>
            <a class="contact-detail-phone" href="tel:${contactPhone}">${contactPhone}</a>
            <div class="edit-contact-responsive" onclick="openAddContact()"><img src="/assets/img/white_pencil.png"></div>
        </div>
    </div>
    `;
}


function redenderAddNewContactTemp2() {
    return `
    <div onclick="doNotClose(event)" id="add-contact-layout-2" class="add-contact-layout-2">
    <div class="add-contact-top">
        <img class="close-Img" src="/assets/img/close_icon.png" onclick="closeAddContact()">
        <img class="join-logo-contact" src="/assets/img/logo-white.png">
        <h2 class="add-contact-title">Add contact</h2>
        <h4 class="add-contact-info">Tasks are better with a team</h4>
    </div>
    <div class="add-contact-middle">
        <div class="user-img">
            <img class="user" src="/assets/img/Vector.png">
        </div>
        <div class="form">
            <form class="add-contact-form" onsubmit="AddNewContact(); return false;">
                <div class="add-contact-input-field">
                    <input id="new-contact-name" class="conact-name-form contacts-input" type="text"
                        placeholder="Name" required>
                    <img src="/assets/img/Input_Name.png">
                </div>
                <div class="add-contact-input-field">
                    <input id="new-contact-email" class="conact-name-form contacts-input" type="email"
                        placeholder="Email" required>
                    <img src="/assets/img/Input_Email.png">
                </div>
                <div class="add-contact-input-field">
                    <input id="new-contact-phone" class="conact-name-form contacts-input" type="number"
                        placeholder="Phone" required>
                    <img src="/assets/img/Input_Phone.png">
                </div>
                <button class="creat-contact">Create Contact<img src="/assets/img/new.contact.png"></button>
            </form>
        </div>
    </div>
</div>
    `;
}


function renderOpenEdit(contactName, contactEmail, contactPhone, contactColor, bothFirstLetter) {
    return `
    <div onclick="doNotClose(event)" id="add-contact-layout-2" class="add-contact-layout-2">
    <div class="add-contact-top">
        <img class="close-Img" src="/assets/img/close_icon.png" onclick="closeAddContact()">
        <img class="join-logo-contact" src="/assets/img/logo-white.png">
        <h2 class="add-contact-title">Edit contact</h2>
    </div>
    <div class="add-contact-middle">
        <div style="background-color: ${contactColor}" class="big-letter-user">${bothFirstLetter}
        </div>
        <div class="form">
            <form class="add-contact-form" onsubmit="editContactSave('${contactName}', '${contactEmail}', '${contactPhone}'); return false;">
                <div class="add-contact-input-field">
                    <input id="new-contact-name" class="conact-name-form contacts-input" type="text"
                        placeholder="Name" required value="${contactName}">
                    <img src="/assets/img/Input_Name.png">
                </div>
                <div class="add-contact-input-field">
                    <input id="new-contact-email" class="conact-name-form contacts-input" type="email"
                        placeholder="Email" required value="${contactEmail}">
                    <img src="/assets/img/Input_Email.png">
                </div>
                <div class="add-contact-input-field">
                    <input id="new-contact-phone" class="conact-name-form contacts-input" type="number"
                        placeholder="Phone" required value="${contactPhone}">
                    <img src="/assets/img/Input_Phone.png">
                </div>
                <button class="creat-contact">Save</button>
            </form>
        </div>
    </div>
</div>
    `;
}