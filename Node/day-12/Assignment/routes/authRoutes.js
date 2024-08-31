const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authorize = require('../middlewares/authMiddleware');

router.post('/signup', authController.signup);
router.post('/login', authController.login);



router.get('/admin', authorize('admin'), (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

module.exports = router;
