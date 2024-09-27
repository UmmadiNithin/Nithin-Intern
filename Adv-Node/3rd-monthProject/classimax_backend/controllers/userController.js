
const userService = require('../services/userService');
const sendEmail = require('../utils/sendEmail');

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.registerUser(email, password);
    return res.status(201).json({
      result: user,
      message: 'User registered successfully',
      status: 'success',
      responseCode: 201,
    });
  } catch (err) {
    return res.status(400).json({
      result: {},
      message: err.message,
      status: 'error',
      responseCode: 400,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userService.loginUser(email, password);
    return res.status(200).json({
      result: { token },
      message: 'Logged in successfully',
      status: 'success',
      responseCode: 200,
    });
  } catch (err) {
    return res.status(400).json({
      result: {},
      message: err.message,
      status: 'error',
      responseCode: 400,
    });
  }
};

exports.updateUserProfile = async (req, res) => {
  const { firstName, lastName, community_name, zipCode, phone_No, address } = req.body;
  const userId = req.user.id;
  const updateData = { firstName, lastName, community_name, zipCode, phone_No, address };

  try {
    const updatedUser = await userService.updateUserProfile(userId, updateData, req.files?.image);
    return res.status(200).json({
      result: updatedUser,
      message: 'Profile updated successfully',
      status: 'success',
      responseCode: 200,
    });
  } catch (err) {
    return res.status(400).json({
      result: {},
      message: err.message,
      status: 'error',
      responseCode: 400,
    });
  }
};

exports.changeUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    await userService.changeUserPassword(userId, oldPassword, newPassword);
    return res.status(200).json({
      result: {},
      message: 'Password changed successfully',
      status: 'success',
      responseCode: 200,
    });
  } catch (err) {
    return res.status(400).json({
      result: {},
      message: err.message,
      status: 'error',
      responseCode: 400,
    });
  }
};

exports.changeUserEmail = async (req, res) => {
  const { currentEmail, newEmail } = req.body;
  const userId = req.user.id;

  try {
    await userService.changeUserEmail(userId, currentEmail, newEmail);
    return res.status(200).json({
      message: 'Email updated successfully',
      status: 'success',
      responseCode: 200,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      status: 'error',
      responseCode: 400,
    });
  }
};

exports.deleteUserAccount = async (req, res) => {
  const userId = req.user.id;

  try {
    await userService.deleteUserAccount(userId);
    return res.status(200).json({
      result: {},
      message: 'Account deleted successfully',
      status: 'success',
      responseCode: 200,
    });
  } catch (err) {
    return res.status(500).json({
      result: {},
      message: 'Server error',
      status: 'error',
      responseCode: 500,
      error: err.message,
    });
  }
};

exports.getUserProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const userProfile = await userService.getUserProfile(userId);
    return res.status(200).json({
      result: userProfile,
      message: 'User profile fetched successfully',
      status: 'success',
      responseCode: 200,
    });
  } catch (err) {
    return res.status(404).json({
      result: {},
      message: err.message,
      status: 'error',
      responseCode: 404,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const otpData = await userService.forgotPassword(email);
    await sendEmail(email, 'Password Reset OTP', `Your OTP is ${otpData.otp}. It will expire in 10 minutes.`);
    return res.status(200).json({
      message: 'OTP sent to your email',
      status: 'success',
      responseCode: 200,
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
      status: 'error',
      responseCode: 404,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body; 
    
    if (typeof otp !== 'string' && typeof otp !== 'number') {
      throw new Error('Invalid OTP format');
    }

    await userService.resetPassword(email, otp, newPassword);
    return res.status(200).json({
      message: 'Password reset successfully',
      status: 'success',
      responseCode: 200,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      status: 'error',
      responseCode: 400,
    });
  }
};

