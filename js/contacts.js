let contacts = [
    {
        'email': 'chris.fuchs@web.de',
        'passwort': 'test432',
        'name': 'Chris Fuchs',
        'phone': '34445',
        'randomColors': 'rgb(126 ,56 , 230)'
    },
    {
        'email': 'alex.luchs@web.de',
        'passwort': 'test432',
        'name': 'Alex Luchs',
        'phone': '34445',
        'randomColors': 'rgb(220 ,200 , 9)'
    },
    {
        'email': 'peter.vogel@web.de',
        'passwort': 'test432',
        'name': 'Peter Vogel',
        'phone': '34445',
        'randomColors': 'rgb(210 ,0 , 77)'
    },
    {
        'email': 'karin.berg@web.de',
        'passwort': 'test432',
        'name': 'Karin Berg',
        'phone': '34445',
        'randomColors': 'rgb(70 ,88 , 220)'
    },
    {
        'email': 'marina.bohle@web.de',
        'passwort': 'test432',
        'name': 'Marina Bohle',
        'phone': '34445',
        'randomColors': 'rgb(42 ,156 , 210)'
    }
];
let letters = [];
load();


/**
 * Creating contanctlist
 */
function showContacts() {
    sortContacts(contacts);
    includeHTML();
    let contactContainer = document.getElementById('contactList');
    contactContainer.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        
        let contactName = contacts[i]['name'];
        let contactEmail = contacts[i]['email'];
        let contactPhone = contacts[i]['phone'];
        let contactColor = contacts[i]['randomColors'];
        let bothFirstLetter = splitName(contactName);
        let greatLetter = renderBigLetter(contactName)
        contactContainer.innerHTML += `
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
        `;
    }
    creatSingleLetters();
}


function AddNewContact() {
    let name = document.getElementById('new-contact-name');
    let email = document.getElementById('new-contact-email');
    let phone = document.getElementById('new-contact-phone');
    let color = randomColor();
    contacts.push({ name: name.value, email: email.value, phone: phone.value, randomColors: color });
    showContacts();
    clearInputFields();
    editSave();
    document.getElementById('addcontactlayout').classList.add('d-nones');
}


function openDetailContact(bothFirstLetter, contactColor, contactName, contactEmail, contactPhone) {
    let contactDetail = document.getElementById('layout-contact3');
    contactDetail.innerHTML = '';
    contactDetail.innerHTML = `
    <div class="detail-main">
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
        </div>
        <button onclick="openAddContact()" class="new-contact-detail">New Contact<img
                        src="/assets/img/new.contact.png"></button>
    </div>
    `;
}


function clearInputFields() {
    document.getElementById('new-contact-name').value = '';
    document.getElementById('new-contact-email').value = '';
    document.getElementById('new-contact-phone').value = '';
}


function creatSingleLetters() {
    filterFirstLetter();
    renderBigLetter();

}


function splitName(fullName) {
    let namePara = fullName.split(" ");
    let firstName = namePara[0];
    let lastName = namePara[namePara.length - 1];
    let bothFirstLetter = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
    return bothFirstLetter
}


function filterFirstLetter() {
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let firstLetter = contact['name'].charAt(0).toLocaleLowerCase();
        if (!letters.includes(firstLetter)) {
            letters.push(firstLetter);
        }
    }
}


function renderBigLetter(contactName) {
        let letter = contactName
        let greatLetter = letter.charAt(0).toUpperCase();
        return greatLetter
        

}


/**
 * Sort contacts from a-z
 */
function sortContacts(contacts) {
    contacts = contacts.sort((a, b) => {
        let a1 = a.name.toLowerCase();
        let b1 = b.name.toLowerCase();
        return a1 < b1 ? -1 : a1 > b1 ? 1 : 0;
    });
}

/**
 * Generating random bg-color
 */
function randomColor() {
    let r = Math.floor(Math.random() * 246);
    let g = Math.floor(Math.random() * 246);
    let b = Math.floor(Math.random() * 246);
    
    return `rgb(${r} ,${g} , ${b})`;
}


function closeAddContact() {
    document.getElementById('addcontactlayout').classList.add('d-nones');
    document.getElementById('editContactLayout').classList.add('d-nones');
}



function openAddContact() {
    renderAddNewContactTemp();
    document.getElementById('addcontactlayout').classList.remove('d-nones');
}


function doNotClose(event) {
    event.stopPropagation();
}


function closeAddContact2() {
    document.getElementById('addcontactlayout').classList.add('d-nones');
    document.getElementById('editContactLayout').classList.add('d-nones');
}


function renderAddNewContactTemp() {
    let newContact = document.getElementById('addcontactlayout');
    newContact.innerHTML = '';
    newContact.innerHTML = `
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


function openEdit(contactName, contactEmail, contactPhone, contactColor, bothFirstLetter) {
    document.getElementById('editContactLayout').classList.remove('d-nones');
    let editContact = document.getElementById('editContactLayout');
    editContact.innerHTML = '';
    editContact.innerHTML = `
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


function editContactSave(contactName, contactEmail, contactPhone) {
    let newName = document.getElementById('new-contact-name').value;
    let newMail = document.getElementById('new-contact-email').value;
    let newPhone = document.getElementById('new-contact-phone').value;
    let index = findCurrentContact(contactName, contactEmail, contactPhone);
    contacts[index]['name'] = newName;
    contacts[index]['email'] = newMail;
    contacts[index]['phone'] = newPhone;
    showContacts();
    document.getElementById('layout-contact3').innerHTML = '';
    document.getElementById('editContactLayout').classList.add('d-nones');
    editSave();

}


function findCurrentContact(contactName, contactEmail, contactPhone) {
    let index = -1;
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].name === contactName && contacts[i].email === contactEmail && contacts[i].phone === contactPhone) {
            index = i;
            break;
        }
    }
    return index;

}


function editSave() {
    let asContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', asContacts);

    let asletters = JSON.stringify(letters);
    localStorage.setItem('letters', asletters);
}


function load() {
    let asContacts = localStorage.getItem('contacts');
    let asletters = localStorage.getItem('letters');

    if (asContacts && asletters) {
        contacts = JSON.parse(asContacts);
        letters = JSON.parse(asletters);
    }
}





/*function renderBigLetter() {
    let bigLetter = document.getElementById('first-big-letter');
    bigLetter.innerHTML = '';
    for (let i = 0; i < letters.length; i++) {
        let letter = letters[i];
        let letterBig = letter.charAt(0).toUpperCase();
        bigLetter.innerHTML += `
        <span>${letterBig}</span>
        <div class="border-for-contacts"></div>
        `;
    }
}*/