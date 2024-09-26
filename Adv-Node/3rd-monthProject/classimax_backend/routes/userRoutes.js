const express = require('express');
const { 
  registerUser, 
  loginUser, 
  updateUserProfile, 
  deleteUserAccount, 
  changeUserEmail, 
  changeUserPassword,
  getUserProfile,
  forgotPassword,
  resetPassword

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
router.post('/forgotPassword', validationMiddleware, forgotPassword);
router.post('/resetPassword', validationMiddleware, resetPassword);

module.exports = router;
