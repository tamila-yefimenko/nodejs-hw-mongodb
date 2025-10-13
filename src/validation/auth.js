import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format. Example: name@example.com',
  }),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).+$'))
    .required()
    .messages({
      'string.min': 'Password should have at least {#limit} characters',
      'string.max': 'Password should have at most {#limit} characters',
      'string.pattern.base':
        'Password must include uppercase, lowercase, number and special character',
      'any.required': 'Password is required',
    }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
