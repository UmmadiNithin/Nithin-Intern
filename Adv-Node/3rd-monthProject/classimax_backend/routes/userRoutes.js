const express = require('express');
const { 
  registerUser, 
  loginUser, 
  updateUserProfile, 
  deleteUserAccount, 
  changeUserEmail, 
  changeUserPassword,
  getUserProfile 
 
} = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');

const router = express.Router();

router.post('/register', validationMiddleware, registerUser);
router.post('/login', validationMiddleware, loginUser);
router.patch('/updateProfile', authenticateToken, validationMiddleware, updateUserProfile);
router.patch('/changePassword', authenticateToken, validationMiddleware, changeUserPassword);
router.patch('/changeEmail', authenticateToken, validationMiddleware, changeUserEmail);
router.delete('/deleteUser', authenticateToken, deleteUserAccount);
router.get('/profile', authenticateToken, getUserProfile);



module.exports = router;
