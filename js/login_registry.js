let users = [];

async function init() {
    setURL('https://marcel-herzog.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}

async function registerUser() {
    let name = document.getElementById('register_name');
    let email = document.getElementById('register_email');
    let password = document.getElementById('register_password');
    users.push({name: name.value, email: email.value, password: password.value});
    await backend.setItem('users', JSON.stringify(users));
    window.location.href = 'login.html?msg=Du hast dich erfolgreich registriert';
}

function loginUser() {
    let email = document.getElementById('login_email');
    let password = document.getElementById('login_password');
    let user = users.find(u => u.email == email.value && u.password == password.value);
    if(user) {
        console.log('User gefunden');
        window.location.href = `board.html?msg=Du hast dich erfolgreich eingelogt ${user.name}`;
    }
}

function guestLogin() {
    let user = users.find(u => u.email == 'guest@gmail.com' && u.password == 'guest123');
    if(user) {
        console.log('User gefunden');
        window.location.href = `board.html?msg=Du hast dich erfolgreich eingelogt ${user.name}`;
    }
}