import { celebrate, Joi } from 'celebrate';

export const userValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().trim().empty().email().required().messages({
      'string.base': 'Email must be a string.',
      'string.empty': 'Email cannot be empty.',
      'string.email': 'Email invalid.',
      'any.required': 'Email is required.',
    }),
    password: Joi.string().trim().empty().required().messages({
      'string.base': 'Password must be a string.',
      'string.empty': 'Password cannot be empty.',
      'any.required': 'Password is required.',
    }),
  }),
});
