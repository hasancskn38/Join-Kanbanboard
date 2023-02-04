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
        'name': 'Alex Luchs'
    },
    {
        'email': 'peter.vogel@web.de',
        'passwort': 'test432',
        'name': 'Peter Vogel'
    },
    {
        'email': 'karin.berg@web.de',
        'passwort': 'test432',
        'name': 'Karin Berg'
    },
    {
        'email': 'marina.bohle@web.de',
        'passwort': 'test432',
        'name': 'Marina Bohle'
    }
];



/**
 * Creating contancts
 */
function showContacts() {
    sortContacts(contacts);
    includeHTML();
    let contactContainer = document.getElementById('contactList');
    contactContainer.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        contactContainer.innerHTML += `
        <span></span>
        <div class="border-for-contacts"></div>
        <div class="single-name">${contact.name}</div>
        <span class="contact-email">${contact.email}</span>
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