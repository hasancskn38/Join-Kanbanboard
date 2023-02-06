let users = [
    {'name': 'guest', 'email': 'guest@gmail.com', 'password': 'guest123'},
    {'name': 'Marcel', 'email': 'marcel@gmail.com', 'password': 'marcel123'}
];

function registerUser() {
    let name = document.getElementById('register_name');
    let email = document.getElementById('register_email');
    let password = document.getElementById('register_password');
    users.push({name: name.value, email: email.value, password: password.value})
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