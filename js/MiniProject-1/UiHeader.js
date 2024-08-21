document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const logoutLink = document.getElementById('logout-link');
    const userEmailElement = document.getElementById('user-email');

    console.log({ loginLink,logoutLink, userEmailElement });

    if (!loginLink || !logoutLink || !userEmailElement) {
        console.error("One or more elements not found in the DOM");
        return;
    }

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userEmail = localStorage.getItem('userEmail');

    if (isLoggedIn) {
        loginLink.style.display = 'none';
        signupLink.style.display='none';
        logoutLink.style.display = 'block';
        userEmailElement.style.display = 'block';
        userEmailElement.textContent = userEmail;
    }

    logoutLink.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('isAdmin');
        window.location.href = '/MiniProject-1/userdash.html';
    });
});