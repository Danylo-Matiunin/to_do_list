document.addEventListener('DOMContentLoaded', function () {
    let login = document.querySelector('#login');
    let password = document.querySelector('#password');
    let submit = document.querySelector('#submit');

    submit.addEventListener('click', () => {
        const loginUser = login.value.trim();
        const passwordUser = password.value.trim();

        if (loginUser === '' || passwordUser === '') {
            alert('Please enter login and password.');
            return;
        }

        window.location.href = 'main.html';
    });
});
