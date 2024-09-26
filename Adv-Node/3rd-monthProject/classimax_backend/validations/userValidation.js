const Joi = require('joi');

const registerSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email address',
        'string.empty': 'Email cannot be empty',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.empty': 'Password cannot be empty',
        'any.required': 'Password is required'
    })
});



const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email address',
        'string.empty': 'Email cannot be empty',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.empty': 'Password cannot be empty',
        'any.required': 'Password is required'
    })
});


const profileUpdateSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).optional(),
    lastName: Joi.string().min(2).max(50).optional(),
    community_name: Joi.string().optional(),
    zipCode: Joi.number().integer().min(10000).max(99999).optional(),
    phone_No: Joi.string().pattern(/^[0-9]{10}$/).optional(),
    address: Joi.string().optional(),
    image: Joi.any().optional(), 
  });




const changePasswordSchema = Joi.object({
    oldPassword: Joi.string().min(6).required().messages({
        'string.min': 'Old password must be at least 6 characters long',
        'string.empty': 'Old password cannot be empty',
        'any.required': 'Old password is required'
    }),
    newPassword: Joi.string().min(6).required().messages({
        'string.min': 'New password must be at least 6 characters long',
        'string.empty': 'New password cannot be empty',
        'any.required': 'New password is required'
    }),
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().messages({
        'any.only': 'Confirmation password must match the new password',
        'string.empty': 'Confirmation password cannot be empty',
        'any.required': 'Confirmation password is required'
    })
});




const changeEmailSchema = Joi.object({
    currentEmail: Joi.string().email().required(),
    newEmail: Joi.string().email().required()
  });

 
  const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
  });
  
  const resetPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().required(),
    newPassword: Joi.string().min(6).required(),
  });


module.exports = {
    registerSchema,
    loginSchema,
    profileUpdateSchema,
    changeEmailSchema ,
    changePasswordSchema,
    resetPasswordSchema,
    forgotPasswordSchema
   
};
