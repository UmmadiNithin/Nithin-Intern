const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { sendLoginMail } = require('../services/mailService');
const { registerSchema, loginSchema } = require('../validations/authvalidations');

exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                result: {},
                message: error.details[0].message,
                status: 'error',
                responseCode: 400
            });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                result: {},
                message: 'User already exists',
                status: 'error',
                responseCode: 400
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ email, password: hashedPassword });

        return res.status(201).json({
            result: user,
            message: 'User registered successfully',
            status: 'success',
            responseCode: 201
        });
    } catch (err) {
        return res.status(500).json({
            result: {},
            message: 'Server error',
            status: 'error',
            responseCode: 500,
            error: err.message
        });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                result: {},
                message: error.details[0].message,
                status: 'error',
                responseCode: 400
            });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                result: {},
                message: 'Invalid email or password',
                status: 'error',
                responseCode: 400
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                result: {},
                message: 'Invalid email or password',
                status: 'error',
                responseCode: 400
            });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, 'secretkey', { expiresIn: '12h' });

        await sendLoginMail(user.email);

        return res.status(200).json({
            result: { token },
            message: 'Logged in successfully',
            status: 'success',
            responseCode: 200
        });
    } catch (err) {
        return res.status(500).json({
            result: {},
            message: 'Server error',
            status: 'error',
            responseCode: 500,
            error: err.message
        });
    }
};
