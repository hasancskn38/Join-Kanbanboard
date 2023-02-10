let contacts = [
    {
        'email': 'chris.fuchs@web.de',
        'passwort': 'test432',
        'name': 'Chris Fuchs',
        'phone': '34445'
    },
    {
        'email': 'alex.luchs@web.de',
        'passwort': 'test432',
        'name': 'Alex Luchs',
        'phone': '34445'
    },
    {
        'email': 'peter.vogel@web.de',
        'passwort': 'test432',
        'name': 'Peter Vogel',
        'phone': '34445'
    },
    {
        'email': 'karin.berg@web.de',
        'passwort': 'test432',
        'name': 'Karin Berg',
        'phone': '34445'
    },
    {
        'email': 'marina.bohle@web.de',
        'passwort': 'test432',
        'name': 'Marina Bohle',
        'phone': '34445'
    }
];
let letters = [];


/**
 * Creating contanctlist
 */
function showContacts() {
    sortContacts(contacts);
    includeHTML();
    let contactContainer = document.getElementById('contactList');
    contactContainer.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let color = randomColor();
        let contactName = contacts[i]['name'];
        let bothFirstLetter = splitName(contactName);
        contactContainer.innerHTML += `
        
        <div class="over-div-letter-name-email">
         <div style="background-color: ${color}" class="letter-circle">${bothFirstLetter}</div>
          <div>
            <div class="single-name">${contact.name}</div>
            <span class="contact-email">${contact.email}</span>
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
    contacts.push({name: name.value, email: email.value, phone: phone.value});
    showContacts();
    clearInputFields();
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


function renderBigLetter() {
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
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return `rgb(${r} ,${g} , ${b})`;
}


function closeAddContact() {
    document.getElementById('addcontactlayout').classList.add('d-nones');
    document.getElementById('add-contact-layout-2').classList.remove('slide-in');
}


function openAddContact() {
    document.getElementById('addcontactlayout').classList.remove('d-nones');
    document.getElementById('add-contact-layout-2').classList.add('slide-in');
}


function doNotClose(event) {
    event.stopPropagation();
}


function closeAddContact2() {
    document.getElementById('addcontactlayout').classList.add('d-nones');
}