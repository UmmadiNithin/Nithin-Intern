
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = require('../modals/userModel');
const { generateOTP } = require('../helpers/otpGenerator');
const sendEmail = require('../utils/sendEmail');

const userService = {
  async registerUser(email, password) {
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userSchema({ email, password: hashedPassword });
    await user.save();
    return user;
  },

  async loginUser(email, password) {
    const user = await userSchema.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '12h' }
    );
    return token;
  },

  async updateUserProfile(userId, updateData, image) {
    updateData.updated_at = Date.now();

    if (image) {
      const base64Image = image.data.toString('base64');
      updateData.image = base64Image;
    }

    const updatedUser = await userSchema.findByIdAndUpdate(userId, updateData, { new: true });
    return updatedUser;
  },

  async changeUserPassword(userId, oldPassword, newPassword) {
    const user = await userSchema.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      throw new Error('Old password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
  },

  async changeUserEmail(userId, currentEmail, newEmail) {
    const user = await userSchema.findById(userId);
    if (!user || user.email !== currentEmail) {
      throw new Error('Current email does not match our records');
    }

    const existingEmail = await userSchema.findOne({ email: newEmail });
    if (existingEmail) {
      throw new Error('Email already in use');
    }

    await userSchema.findByIdAndUpdate(userId, { email: newEmail }, { new: true });
  },

  async deleteUserAccount(userId) {
    await userSchema.findByIdAndDelete(userId);
  },

  async getUserProfile(userId) {
    const user = await userSchema.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found');
    }

    return {
      ...user.toObject(),
      image: user.image ? user.image.toString('base64') : null,
    };
  },


async forgotPassword(email) {
    const user = await userSchema.findOne({ email });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    const otp = generateOTP();
    const otpExpiry = Date.now() + 10 * 60 * 1000; 
  
    user.otp = otp;
    user.otpExpiry = otpExpiry;
  
    try {
      await user.save();
      console.log('OTP saved successfully:', user.otp, user.otpExpiry); 
    } catch (err) {
      console.error('Error saving OTP:', err); 
      throw new Error('Failed to save OTP');
    }
  
    return { otp, otpExpiry };
  },
  
  async resetPassword(email, otp, newPassword) {
    const user = await userSchema.findOne({ email });
  
    if (!user || !user.otp) {
      throw new Error('No OTP found for this user');
    }
  
    const storedOtp = user.otp.toString(); 
    const providedOtp = otp.toString().trim();
    if (storedOtp !== providedOtp) {
      console.log('Stored OTP:', storedOtp);
      console.log('Provided OTP:', providedOtp);
      throw new Error('Invalid OTP');
    }
  
    if (Date.now() > user.otpExpiry) {
      throw new Error('OTP has expired');
    }
  
    const hashedPassword = await bcrypt.hash(newPassword, 10);
  
    await userSchema.findOneAndUpdate(
      { email },
      { password: hashedPassword, otp: undefined, otpExpiry: undefined }
    );
  }
};

module.exports = userService;
