document.addEventListener('DOMContentLoaded', function () {
    let name = document.querySelector('#name');
    let login = document.querySelector('#login');
    let password = document.querySelector('#password');
    let submit = document.querySelector('#submit');

    let users = {};

    function User(name, login, password) {
        this.name = name;
        this.login = login;
        this.password = password;
    }

    function createId(users) {
        return Object.keys(users).length;
    }

    const nameRegex = /^[A-Za-z\s]+$/;
    const loginRegex = /^[a-zA-Z0-9]+$/;
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,}$/;

    submit.addEventListener('click', () => {
        const nameUser = name.value.trim();
        const loginUser = login.value.trim();
        const passwordUser = password.value.trim();

        if (!nameUser) {
            alert('Please enter your name.');
            return;
        }

        if (!loginUser) {
            alert('Please enter your login.');
            return;
        }

        if (!passwordUser) {
            alert('Please enter your password.');
            return;
        }

        if (!nameUser.match(nameRegex)) {
            alert('Please enter a valid name.');
            return;
        }

        if (!loginUser.match(loginRegex)) {
            alert('Please enter a valid login (only letters and numbers are allowed).');
            return;
        }

        if (!passwordUser.match(passwordRegex)) {
            alert('Please enter a valid password (at least 6 characters, containing letters, numbers, and special characters like !@#$%^&*).');
            return;
        }

        const user = new User(nameUser, loginUser, passwordUser);

        const userId = 'User' + createId(users);
        users[userId] = user;

        localStorage.setItem('name', nameUser);
        localStorage.setItem('login', loginUser);
        localStorage.setItem('password', passwordUser);

        console.log(user);

        alert(`${nameUser}, you have signed up!`);

        window.location.href = `main.html?name=${encodeURIComponent(nameUser)}`;
    });
});

document.addEventListener('DOMContentLoaded', function () {

    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const userName = getUrlParameter('name');
    
    const userNameElement = document.querySelector('#userName');
    userNameElement.innerText = userName;
});
