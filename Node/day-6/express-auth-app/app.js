const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded());

app.use(express.static('public'));

let currentUser = null;

let users = [];
try {
    const data = fs.readFileSync('datajson', 'utf8');
    users = JSON.parse(data);
} catch (err) {
    console.error('Error reading user data:', err);
}

function authMiddleware(req, res, next) {
    if (currentUser) {
        next();
    } else {
        res.redirect('/login'); 
    }
}


app.get('/login', (req, res) => {
    const error = req.query.error ? '<p style="color: red;">Invalid username or password</p>' : '';
    const loginPage = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Login Page</title>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>
        <h2>Login</h2>
        <form action="/login" method="POST">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <br>
            <button type="submit">Login</button>
        </form>
        ${error}
    </body>
    </html>
    `;
    res.send(loginPage);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = user;
        res.redirect('/userinfo');
    } else {
        res.redirect('/login?error=true');
    }
});

app.get('/userinfo', authMiddleware, (req, res) => {
    const userInfoPage = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>User Information</title>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>
        <h2>User Information</h2>
        <table border="1">
            <tr>
                <th>Username</th>
                <td>${currentUser.username}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>${currentUser.email}</td>
            </tr>
            <tr>
                <th>Age</th>
                <td>${currentUser.age}</td>
            </tr>
        </table>
        <br>
        <a href="/logout">Logout</a>
    </body>
    </html>
    `;
    res.send(userInfoPage);
});

app.get('/logout', (req, res) => {
    currentUser = null;
    res.redirect('/login');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
