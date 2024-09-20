const Joi = require('joi');

const createPostSchema = Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
        'string.empty': 'Title is required',
        'string.min': 'Title should have at least 3 characters',
        'string.max': 'Title cannot be longer than 100 characters',
        'any.required': 'Title is required'
    }),
    description: Joi.string().min(10).max(1000).required().messages({
        'string.empty': 'Description is required',
        'string.min': 'Description should have at least 10 characters',
        'string.max': 'Description cannot be longer than 1000 characters',
        'any.required': 'Description is required'
    }),
    categoryId: Joi.number().integer().required().messages({
        'number.base': 'Category ID must be a number',
        'any.required': 'Category ID is required'
    }),
    image: Joi.any().required().messages({
        'any.required': 'Image is required'
    })
});




const updatePostSchema = Joi.object({
    title: Joi.string().min(3).max(255).optional(),
    description: Joi.string().min(10).max(2000).optional(),
    categoryId: Joi.number().integer().optional(),
    image: Joi.any().optional() 
});

const searchPostSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.base': 'Title must be a string',
        'any.required': 'Title is required to search'
    })
});

module.exports = { createPostSchema ,updatePostSchema,searchPostSchema };
