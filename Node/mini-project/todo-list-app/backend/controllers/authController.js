const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    console.log('Register endpoint hit'); 
    try {
        const { name, email, password } = req.body;
        console.log('Request received:', { name, email, password }); 

        // Email validation (basic regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log('Invalid email format:', email);
            return res.status(400).json({ message: 'Please enter a valid email address' });
        }

        // Check if email already exists in the database
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            console.log('Email already exists:', email);
            return res.status(400).json({ message: 'Email already exists. Please use a different email' });
        }

        // Check if name already exists in the database
        const existingName = await User.findOne({ where: { name } });
        if (existingName) {
            console.log('Name already exists:', name);
            return res.status(400).json({ message: 'Name already exists. Please use a different name' });
        }

        // Password validation (minimum 6 characters)
        if (password.length < 6) {
            console.log('Password too short:', password);
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user in the database
        await User.create({ name, email, password: hashedPassword });

        console.log('User created successfully:', { name, email });
        
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        
        console.error('Registration error:', error);
        res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password fields are filled
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Email validation (basic regex to check proper email format)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Please enter a valid email address' });
        }

        // Check if user exists with the given email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Validate the password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, 'yourSecretKey', { expiresIn: '1h' });

        // Respond with the token
        res.status(200).json({ token });
       
    } catch (error) {
        console.error(error);  // Log error for debugging
        res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
    }
};
