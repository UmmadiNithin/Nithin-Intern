const User = require('../models/userModel');
const path = require('path');

exports.register = async (req, res) => {
  try {
    const { username, password, email, phone_no, address, department, institution } = req.body;
    console.log('Registering user with details:', { username, email, phone_no, address, department, institution });

    await User.registerUser(username, password, email, phone_no, address, department, institution);

    console.log('User registered successfully:', username);
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error during user registration:', error);

    if (error.message === 'Username already exists') {
      res.status(400).json({ error: 'Username is already taken' });
    } else {
      res.status(500).json({ error: 'Error registering user' });
    }
  }
};


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findUserByUsername(username);

    if (user && password === user.password) {
      console.log(`Login successful for username: ${username}`);
      req.session.user = user; 
      res.status(200).json({ message: 'Login successful' });
    } else {
      console.log(`Invalid login attempt for username: ${username}`);
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
};

exports.logout = (req, res) => {
  console.log('Logging out user:', req.user ? req.user.username : 'No user logged in');
  
  req.user = null; 
  res.redirect('/auth/login');
};

