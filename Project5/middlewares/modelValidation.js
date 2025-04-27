const { body } = require('express-validator');
const validator = require('validator');


exports.validateUser = [
  body('firstName')
    .trim()
    .escape()
    .notEmpty().withMessage('First name is required'),

  body('lastName')
    .trim()
    .escape()
    .notEmpty().withMessage('Last name is required'),

  body('email')
    .normalizeEmail() 
    .isEmail().withMessage('Email must be a valid email address')
    .notEmpty().withMessage('Email is required'),

  body('password')
    .isLength({ min: 8, max: 64 }).withMessage('Password must be between 8 and 64 characters')
    .notEmpty().withMessage('Password is required'),
];

exports.validateLogin = [
  body('email')
    .trim()
    .normalizeEmail()
    .isEmail().withMessage('Email must be a valid email address')
    .notEmpty().withMessage('Email is required'),

  body('password')
    .trim()
    .isLength({ min: 8, max: 64 }).withMessage('Password must be between 8 and 64 characters')
    .notEmpty().withMessage('Password is required'),
];

exports.validateItem = [
  body('title')
    .trim()
    .escape()
    .notEmpty().withMessage('Title is required'),

  body('condition')
    .trim()
    .escape()
    .isIn(['New', 'Like New', 'Good', 'Worn', 'Damaged'])
    .withMessage('Condition must be one of the following: New, Like New, Good, Worn, Damaged'),

  body('price')
    .isFloat({ gt: 0 }).withMessage('Price must be greater than 0')
    .notEmpty().withMessage('Price is required'),

  body('size')
    .trim()
    .escape()
    .notEmpty().withMessage('Size is required'),

  body('details')
    .trim()
    .escape()
    .notEmpty().withMessage('Details are required')
    .isLength({ max: 100 }).withMessage('Details cannot exceed 100 characters'),

  body('image')
    .notEmpty().withMessage('Image is required'),

  body('active')
    .optional()
    .isBoolean().withMessage('Active must be a boolean value'),
];

exports.validateOffer = [
  body('amount')
    .isFloat({ gt: 0 }).withMessage('Offer amount must be greater than 0')
    .notEmpty().withMessage('Offer amount is required'),
];


