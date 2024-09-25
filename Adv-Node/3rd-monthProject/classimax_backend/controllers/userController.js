const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = require('../modals/userModel');


exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        result: {},
        message: 'User already exists',
        status: 'error',
        responseCode: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userSchema({ email, password: hashedPassword });
    await user.save();

    return res.status(201).json({
      result: user,
      message: 'User registered successfully',
      status: 'success',
      responseCode: 201,
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

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(400).json({
        result: {},
        message: 'Invalid email or password',
        status: 'error',
        responseCode: 400,
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        result: {},
        message: 'Invalid email or password',
        status: 'error',
        responseCode: 400,
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '12h' }
    );

    return res.status(200).json({
      result: { token },
      message: 'Logged in successfully',
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

exports.updateUserProfile = async (req, res) => {
  const { firstName, lastName, community_name, zipCode, phone_No, address } = req.body;

  try {
    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (community_name) updateData.community_name = community_name;
    if (zipCode) updateData.zipCode = zipCode;
    if (phone_No) updateData.phone_No = phone_No;
    if (address) updateData.address = address;
    updateData.updated_at = Date.now();

   if (req.files && req.files.image) {
    const file = req.files.image;
    const base64Image = file.data.toString('base64');
    updateData.image = base64Image; 
}


    const userId = req.user.id; 

    const updatedUser = await userSchema.findByIdAndUpdate(userId, updateData, { new: true });

    return res.status(200).json({
      result: updatedUser,
      message: 'Profile updated successfully',
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

exports.changeUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const userId = req.user.id; 

    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(404).json({
        result: {},
        message: 'User not found',
        status: 'error',
        responseCode: 404,
      });
    }

    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      return res.status(400).json({
        result: {},
        message: 'Old password is incorrect',
        status: 'error',
        responseCode: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      result: {},
      message: 'Password changed successfully',
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


exports.changeUserEmail = async (req, res) => {
  const { currentEmail, newEmail } = req.body;

  try {
    const userId = req.user.id; 

    const user = await userSchema.findById(userId);
    if (!user || user.email !== currentEmail) {
      return res.status(400).json({
        message: 'Current email does not match our records',
        status: 'error',
        responseCode: 400,
      });
    }

    const existingEmail = await userSchema.findOne({ email: newEmail });
    if (existingEmail) {
      return res.status(400).json({
        message: 'Email already in use',
        status: 'error',
        responseCode: 400,
      });
    }

    await userSchema.findByIdAndUpdate(userId, { email: newEmail }, { new: true });

    return res.status(200).json({
      message: 'Email updated successfully',
      status: 'success',
      responseCode: 200,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Server error',
      status: 'error',
      responseCode: 500,
      error: err.message,
    });
  }
};

exports.deleteUserAccount = async (req, res) => {
  try {
    const userId = req.user.id; 

    await userSchema.findByIdAndDelete(userId);

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
  try {
    const userId = req.user.id; 

    const user = await userSchema.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({
        result: {},
        message: 'User not found',
        status: 'error',
        responseCode: 404,
      });
    }

    const userProfileWithBase64Image = {
      ...user.toObject(),
      image: user.image ? user.image.toString('base64') : null, 
    };
   
    return res.status(200).json({
      result: userProfileWithBase64Image,
      message: 'User profile fetched successfully',
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


