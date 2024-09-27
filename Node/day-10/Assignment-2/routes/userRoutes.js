const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/validateMiddleware');


router.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.originalUrl}`);
  console.log('Authentication middleware executed');
  authenticate(req, res, next);
});


router.get('/', (req, res) => {
  console.log('GET / user page route');
  userController.getUserPage(req, res);
});


router.post('/update', (req, res) => {
  console.log('POST /user/update route');
  console.log('Request Body:', req.body);
  userController.updateUser(req, res);
});


router.get('/data', (req, res) => {
  console.log('GET /user/data route');
  userController.getUserData(req, res);
});

module.exports = router;

