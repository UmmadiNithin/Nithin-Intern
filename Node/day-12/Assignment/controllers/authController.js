const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SECRET_KEY = 'mysecretkey';


exports.signup = async (req, res) => {
  const { username, password, role } = req.body;


  if (role && role !== 'admin' && role !== 'user') {
    return res.status(400).json({ error: 'Invalid role!' });
  }

  try {
   
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = await User.create({ username, password: hashedPassword, role: role || 'user' });

    res.status(201).json({ message: 'User created!', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
};


exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password!' });
    }


    const token = jwt.sign(
      { userId: user.id, role: user.role },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful!', token });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
};
