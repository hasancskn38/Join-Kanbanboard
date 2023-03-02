let contacts = [
    {
        'email': 'chris.fuchs@web.de',
        'passwort': 'test432',
        'name': 'Chris Fuchs',
        'phone': '34445',
        'randomColors': 'rgb(126 ,56 , 230)',
        'id': '1'
    },
    {
        'email': 'alex.luchs@web.de',
        'passwort': 'test432',
        'name': 'Alex Luchs',
        'phone': '34445',
        'randomColors': 'rgb(220 ,200 , 9)',
        'id': '2'
    },
    {
        'email': 'peter.vogel@web.de',
        'passwort': 'test432',
        'name': 'Peter Vogel',
        'phone': '34445',
        'randomColors': 'rgb(210 ,0 , 77)',
        'id': '3'
    },
    {
        'email': 'karin.berg@web.de',
        'passwort': 'test432',
        'name': 'Karin Berg',
        'phone': '34445',
        'randomColors': 'rgb(70 ,88 , 220)',
        'id': '4'
    },
    {
        'email': 'marina.bohle@web.de',
        'passwort': 'test432',
        'name': 'Marina Bohle',
        'phone': '34445',
        'randomColors': 'rgb(42 ,156 , 210)',
        'id': '5'
    }
    
];
setURL('https://gruppe-447.developerakademie.net/join/smallest_backend_ever');
let letters = [];
load();


/**

 * Creating contanctlist
 */
async function showContacts() {
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts')) || [];
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
        let greatLetter = renderBigLetter(contactName);
        contactContainer.innerHTML += renderShowContacts(greatLetter, contactColor, bothFirstLetter, contactName, contactEmail, contactPhone);
    }
    creatSingleLetters();
}


async function AddNewContact() {
    let name = document.getElementById('new-contact-name');
    let email = document.getElementById('new-contact-email');
    let phone = document.getElementById('new-contact-phone');
    let color = randomColor();
    contacts.push({ name: name.value, email: email.value, phone: phone.value, randomColors: color });
    await backend.setItem('contacts', JSON.stringify(contacts));
    showContacts();
    clearInputs();
    editSave();
    document.getElementById('addcontactlayout').classList.add('d-nones');
}


function openDetailContact(bothFirstLetter, contactColor, contactName, contactEmail, contactPhone) {
    let contactDetail = document.getElementById('layout-contact4');
    contactDetail.innerHTML = '';
    contactDetail.innerHTML = renderOpenDetailContact(bothFirstLetter, contactColor, contactName, contactEmail, contactPhone);
}


function slideBack() {
    document.getElementById('detail-main').classList.add('detail-main-slide-back');
    document.getElementById('detail-main').classList.add('d-nones');
}


function clearInputs() {
    document.getElementById('new-contact-name').value = '';
    document.getElementById('new-contact-email').value = '';
    document.getElementById('new-contact-phone').value = '';
}


function creatSingleLetters() {
    filterFirstLetter();

}


function splitName(fullName) {
    let namePara = fullName.split(" ");
    let firstName = namePara[0];
    let lastName = namePara[namePara.length - 1];
    let bothFirstLetter = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
    return bothFirstLetter;
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
    let letter = contactName;
    let greatLetter = letter.charAt(0).toUpperCase();
    return greatLetter;
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
    newContact.innerHTML = redenderAddNewContactTemp2();
}


function openEdit(contactName, contactEmail, contactPhone, contactColor, bothFirstLetter) {
    document.getElementById('editContactLayout').classList.remove('d-nones');
    let editContact = document.getElementById('editContactLayout');
    editContact.innerHTML = '';
    editContact.innerHTML = renderOpenEdit(contactName, contactEmail, contactPhone, contactColor, bothFirstLetter);
}


function editContactSave(contactName, contactEmail, contactPhone) {
    let newName = document.getElementById('new-contact-name').value;
    let newMail = document.getElementById('new-contact-email').value;
    let newPhone = document.getElementById('new-contact-phone').value;
    let index = findCurrentContact(contactName, contactEmail, contactPhone);
    contacts[index]['name'] = newName;
    contacts[index]['email'] = newMail;
    contacts[index]['phone'] = newPhone;
    document.getElementById('layout-contact4').innerHTML = '';
    document.getElementById('editContactLayout').classList.add('d-nones');
    editSave();
    showContacts();
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


async function editSave() {
    let asContacts = JSON.stringify(contacts);
    await backend.setItem('contacts', asContacts);

    let asletters = JSON.stringify(letters);
    await backend.setItem('letters', asletters);
    showContacts();
}


function load() {
    let asContacts = backend.getItem('contacts');
    let asletters = backend.getItem('letters');

    if (asContacts && asletters) {
        contacts = JSON.parse(backend.getItem(asContacts));
        letters = JSON.parse(backend.getItem(asletters));
    }
}