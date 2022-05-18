import Joi from 'joi';
import { CONSTANTS } from '../constants';

export const userBodyValidator = Joi.object({
    first_name: Joi.string()
        .alphanum()
        .min(3)
        .max(15)
        .trim()
        .required()
        .messages({
            'string.empty': '"first_name" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 15',
        }),
    last_name: Joi.string()
        .alphanum()
        .min(3)
        .max(15)
        .trim()
        .required()
        .messages({
            'string.empty': '"last_name" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 15',
        }),

    phone: Joi.string()
        .required()
        .regex(CONSTANTS.PHONE_REGEXP)
        .messages({
            'string.pattern.base': 'Phone not valid',
        }),
    email: Joi.string()
        .regex(CONSTANTS.EMAIL_REGEXP)
        .required()
        .trim()
        .messages({
            'string.pattern.base': 'Email not valid',
        }),
    password: Joi.string()
        .regex(CONSTANTS.PASSWORD_REGEXP)
        .required()
        .trim()
        .messages({
            'string.pattern.base': 'Password not valid',
        }),
});

export const userUpdateValidator = Joi.object({
    first_name: Joi.string()
        .alphanum()
        .min(3)
        .max(15)
        .trim()
        .messages({
            'string.empty': '"first_name" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 15',
        }),
    last_name: Joi.string()
        .alphanum()
        .min(3)
        .max(15)
        .trim()
        .messages({
            'string.empty': '"last_name" Can not be empty',
            'string.pattern.base': 'Enter only letter min 3 max 15',
        }),

    phone: Joi.string()
        .regex(CONSTANTS.PHONE_REGEXP)
        .messages({
            'string.pattern.base': 'Phone not valid',
        }),
    password: Joi.string()
        .regex(CONSTANTS.PASSWORD_REGEXP)
        .trim()
        .messages({
            'string.pattern.base': 'Password not valid',
        }),
});

export const loginDataValidator = Joi.object({
    email: Joi.string()
        .regex(CONSTANTS.EMAIL_REGEXP)
        .required()
        .trim()
        .messages({
            'string.pattern.base': 'Email not valid',
        }),
    password: Joi.string()
        .regex(CONSTANTS.PASSWORD_REGEXP)
        .required()
        .trim()
        .messages({
            'string.pattern.base': 'Password not valid',
        }),
});
