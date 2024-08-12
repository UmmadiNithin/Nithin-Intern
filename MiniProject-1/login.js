document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        // Redirect logged-in users away from the login page
        if (window.location.pathname === '/MiniProject-1/login.html') {
            window.location.href = '/MiniProject-1/userdash.html'; // Redirect to user dashboard or another page
        }
    }
});

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    checkLogin();
});

async function checkLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Please enter a valid email and password.');
        return;
    }

    try {
        const url = `https://shopping-cart-b3f52-default-rtdb.firebaseio.com/signup.json`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }

        const users = await response.json();

        if (!users) {
            alert('No users found. Please sign up.');
            return;
        }

        const user = Object.values(users).find(user => user.email === email && user.password === password);

        if (user) {
            console.log('Login successful for user:', user);
            loginUser(email, user.admin);
        } else {
            alert('User does not exist. Please sign up!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error logging in. Please try again.');
    }
}

function loginUser(userEmail, isAdmin) {
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('isAdmin', isAdmin);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('cart', JSON.stringify([])); 

    if (isAdmin) {
        window.location.href = "/MiniProject-1/admin/admin.html";
    } else {
        window.location.href = "/MiniProject-1/userdash.html";
    }
}

document.getElementById('logout-link').addEventListener('click', function() {
    logoutUser();
});

function logoutUser() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('cart');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    
    updateHeader();
    window.location.href = '/MiniProject-1/login.html'; // Redirect to login page
}

function updateHeader() {
    const userEmailDisplay = document.getElementById('user-email');
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const logoutLink = document.getElementById('logout-link');

    if (localStorage.getItem('userEmail')) {
        userEmailDisplay.textContent = ` ${localStorage.getItem('userEmail')}`;
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
