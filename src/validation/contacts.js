import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+\d{7,15}$/)
    .required()
    .messages({
      'string.empty': 'Phone number is required.',
      'any.required': 'Phone number is required.',
      'string.pattern.base':
        'Invalid phone number format. Example: +1234567890',
    }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Invalid email format. Example: name@example.com',
    'any.required': 'Email is required.',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid('work', 'personal', 'home')
    .required()
    .messages({
      'any.only': 'Contact type must be one of: work, personal, or home.',
      'string.empty': 'Contact type is required.',
      'any.required': 'Contact type is required.',
    }),
  userId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('User id should be a valid mongo id');
    }
    return true;
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+\d{7,15}$/)
    .messages({
      'string.pattern.base':
        'Invalid phone number format. Example: +1234567890',
    }),
  email: Joi.string().email().messages({
    'string.email': 'Invalid email format. Example: name@example.com',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'personal', 'home').messages({
    'any.only': 'Contact type must be one of: work, personal, or home.',
  }),
});
