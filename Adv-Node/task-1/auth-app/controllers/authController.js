    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');
    const User = require('../models/user');
    const { sendLoginMail } = require('../services/mailService');


    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };


    const validatePassword = (password) => {
        return password.length >= 6;
    };

    exports.register = async (req, res) => {
        const { email, password } = req.body;
    

        try {
        
            if (!validateEmail(email)) {
                return res.status(400).json({ message: 'Please enter a valid email address' });
            }

        
            if (!validatePassword(password)) {
                return res.status(400).json({ message: 'Password must be at least 6 characters long' });
            }

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

        
            const hashedPassword = await bcrypt.hash(password, 10);

        
            const user = await User.create({ email, password: hashedPassword });
        

            res.status(201).json({ message: 'User registered successfully', user });
        } catch (err) {
            res.status(500).json({ message: 'Server error', error: err.message });
        }
    };

    exports.login = async (req, res) => {
        const { email, password } = req.body;

        try {
        
            if (!validateEmail(email)) {
                return res.status(400).json({ message: 'Please enter a valid email address' });
            }

            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

        
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

        
            const token = jwt.sign({ id: user.id, email: user.email }, 'secretkey', { expiresIn: '12h' });

        
            await sendLoginMail(user.email);

            res.status(200).json({ message: 'Logged in successfully', token });
        } catch (err) {
            res.status(500).json({ message: 'Server error', error: err.message });
        }
    };


    // exports.register = async (req, res) => {
    //     const { email, password } = req.body;
    
    //     try {
    //         if (!validateEmail(email)) {
    //             return res.status(400).json({
    //                 result: {},
    //                 message: 'Please enter a valid email address',
    //                 status: 'error',
    //                 responseCode: 400
    //             });
    //         }
    
    //         if (!validatePassword(password)) {
    //             return res.status(400).json({
    //                 result: {},
    //                 message: 'Password must be at least 6 characters long',
    //                 status: 'error',
    //                 responseCode: 400
    //             });
    //         }
    
    //         const existingUser = await User.findOne({ where: { email } });
    //         if (existingUser) {
    //             return res.status(400).json({
    //                 result: {},
    //                 message: 'User already exists',
    //                 status: 'error',
    //                 responseCode: 400
    //             });
    //         }
    
    //         const hashedPassword = await bcrypt.hash(password, 10);
    
    //         const user = await User.create({ email, password: hashedPassword });
    
    //         return res.status(201).json({
    //             result: user,
    //             message: 'User registered successfully',
    //             status: 'success',
    //             responseCode: 201
    //         });
    //     } catch (err) {
    //         return res.status(500).json({
    //             result: {},
    //             message: 'Server error',
    //             status: 'error',
    //             responseCode: 500,
    //             error: err.message
    //         });
    //     }
    // };

    
    // exports.login = async (req, res) => {
    //     const { email, password } = req.body;
    
    //     try {
    //         if (!validateEmail(email)) {
    //             return res.status(400).json({
    //                 result: {},
    //                 message: 'Please enter a valid email address',
    //                 status: 'error',
    //                 responseCode: 400
    //             });
    //         }
    
    //         const user = await User.findOne({ where: { email } });
    //         if (!user) {
    //             return res.status(400).json({
    //                 result: {},
    //                 message: 'Invalid email or password',
    //                 status: 'error',
    //                 responseCode: 400
    //             });
    //         }
    
    //         const validPassword = await bcrypt.compare(password, user.password);
    //         if (!validPassword) {
    //             return res.status(400).json({
    //                 result: {},
    //                 message: 'Invalid email or password',
    //                 status: 'error',
    //                 responseCode: 400
    //             });
    //         }
    
    //         const token = jwt.sign({ id: user.id, email: user.email }, 'secretkey', { expiresIn: '12h' });
    
    //         await sendLoginMail(user.email);
    
    //         return res.status(200).json({
    //             result: { token },
    //             message: 'Logged in successfully',
    //             status: 'success',
    //             responseCode: 200
    //         });
    //     } catch (err) {
    //         return res.status(500).json({
    //             result: {},
    //             message: 'Server error',
    //             status: 'error',
    //             responseCode: 500,
    //             error: err.message
    //         });
    //     }
    // };
    