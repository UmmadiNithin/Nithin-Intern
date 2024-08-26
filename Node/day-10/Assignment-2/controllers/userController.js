const path = require('path');
const User = require('../models/userModel');

// Get user page
exports.getUserPage = async (req, res) => {
  try {
    console.log('Received request for user page.');

    if (req.user) {
      console.log('User is authenticated. Sending userPage.html.');
      res.sendFile(path.join(__dirname, '..', 'views', 'userPage.html'));
    } else {
      console.log('User not authenticated. Redirecting to login.');
      res.redirect('/auth/login');
    }
  } catch (error) {
    console.error('Error retrieving user page:', error);
    res.status(500).send('Error retrieving user page');
  }
};

// Update user details
exports.updateUser = async (req, res) => {
  try {
    const { email, phone_no, address, department, institution } = req.body;

    console.log('Received request to update user details with data:', {
      email, phone_no, address, department, institution
    });

    await User.updateUser(req.user.id, email, phone_no, address, department, institution);
    console.log('User details updated successfully for user ID:', req.user.id);
    
    
    res.redirect('/user');
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).send('Error updating user');
  }
};

// Get user data as JSON
exports.getUserData = async (req, res) => {
  try {
    console.log('Received request for user data.');

    if (req.user) {
      console.log('User is authenticated. Fetching user data.');
      const user = await User.findUserById(req.user.id);
      
      if (user) {
        console.log('User data retrieved successfully:', user);
        res.json(user); 
      } else {
        console.log('User not found with ID:', req.user.id);
        res.status(404).json({ error: 'User not found' })
      }
    } else {
      console.log('User not authenticated. Sending unauthorized response.');
      res.status(401).json({ error: 'Unauthorized' }); 
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Error fetching user data' }); 
  }
};

