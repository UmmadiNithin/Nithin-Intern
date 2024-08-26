const express = require('express');
const path = require('path');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../middleware/validateMiddleware');

// Registration routes
router.get('/register', (req, res) => res.sendFile(path.join(__dirname, '../views/registration.html')));
router.post('/register', validateRegistration, (req, res) => {
  authController.register(req, res, (err) => {
    if (err) {
      res.status(400).render('registration', { error: err.message });
    } else {
      res.redirect('/auth/login');
    }
  });
});

// Login routes
router.get('/login', (req, res) => res.sendFile(path.join(__dirname, '../views/login.html')));
router.post('/login', validateLogin, (req, res) => {
  authController.login(req, res, (err) => {
    if (err) {
      res.status(400).render('login', { error: err.message });
    } else {
      res.redirect('/user');
    }
  });
});

// Logout route
router.get('/logout', (req, res) => {
  authController.logout(req, res, (err) => {
    if (err) {
      res.status(500).render('error', { error: 'Error logging out' });
    } else {
      res.redirect('/auth/login');
    }
  });
});

// Check User already exist route
router.get('/check-username', async (req, res) => {
  try {
    const { username } = req.query;
    const user = await User.findUserByUsername(username);
    res.json({ exists: !!user });
  } catch (error) {
    console.error('Error checking username:', error);
    res.status(500).json({ error: 'Error checking username' });
  }
});

module.exports = router;