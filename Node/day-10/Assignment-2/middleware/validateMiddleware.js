
const Joi = require('joi');


const validateRegistration = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
      'string.base': 'Username must be a string',
      'string.empty': 'Username is required',
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username must be at most 30 characters long',
    }),
    password: Joi.string().min(6).required().messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters long',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Must be a valid email address',
      'string.empty': 'Email is required',
    }),
    phone_no: Joi.string().pattern(/^[0-9]{10}$/).required()
    .messages({
      'string.empty': 'Phone number is required',
      'string.pattern.base': 'Phone number must be exactly 10 digits long and contain only numbers',
    }),
    address: Joi.string().required().messages({
      'string.empty': 'Address is required',
      'string.min': 'Username must be at least 6 characters long',
      'string.max': 'Username must be at most 30 characters long',
    }),
    department: Joi.string().required().messages({
      'string.empty': 'Department is required',
    }),
    institution: Joi.string().required().messages({
      'string.empty': 'Institution is required',
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    console.error('Registration validation error:', error.details);
    const message = error.details.map(detail => detail.message).join(', ');
    return res.status(400).send(`Validation error: ${message}`);
  }
  next();
};


const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required().messages({
      'string.empty': 'Username is required',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'Password is required',
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    console.error('Login validation error:', error.details);
    const message = error.details.map(detail => detail.message).join(', ');
    return res.status(400).send(`Validation error: ${message}`);
  }
  next();
};


const authenticate = (req, res, next) => {
  if (req.session.user) {
    req.user = req.session.user; 
    next();
  } else {
    console.warn('Unauthorized access attempt, redirecting to login');
    res.redirect('/auth/login'); 
  }
};

module.exports = {
  validateRegistration,
  validateLogin,
  authenticate,
};
