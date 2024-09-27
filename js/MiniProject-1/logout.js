document.getElementById('logout-link').addEventListener('click', function() {
    logoutUser();
});

function logoutUser() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('cart');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    
    // Optionally, you can call a function to update the header or UI
    updateHeader();

    // Redirect to login page
    window.location.href = '/MiniProject-1/login.html';
}

function updateHeader() {
    const userEmailDisplay = document.getElementById('user-email');
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const logoutLink = document.getElementById('logout-link');

    // Check if user is logged in
    if (localStorage.getItem('userEmail')) {
        userEmailDisplay.textContent = `Welcome, ${localStorage.getItem('userEmail')}`;
        loginLink.style.display = 'none';
        signupLink.style.display = 'none';
        userEmailDisplay.style.display = 'block';
        logoutLink.style.display = 'block';
    } else {
        loginLink.style.display = 'block';
        signupLink.style.display = 'block';
        userEmailDisplay.style.display = 'none';
        logoutLink.style.display = 'none';
    }
}

// Call updateHeader on page load to set the initial state
window.onload = updateHeader;
