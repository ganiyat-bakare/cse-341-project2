const { body, validationResult } = require('express-validator');

const validate = {};

// Rules for customer validation
validate.customerRules = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters, e.g. Jo'),

  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters, e.g. Li'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email address, e.g. john.doe@mail.com'),

  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .isMobilePhone('any')
    .withMessage('Must be a valid phone number with country code, e.g. +2348012345678'),

  body('birthday')
    .trim()
    .notEmpty()
    .withMessage('Birthday is required')
    .isISO8601()
    .withMessage('Birthday must be a valid date in YYYY-MM-DD format, e.g. 1990-12-31'),

  body('favoriteProduct')
    .optional()
    .isString()
    .withMessage('Favorite product must be a string, e.g. iPhone 15'),

  body('city').optional().isString().withMessage('City must be a string, e.g. Lagos'),

  body('country').optional().isString().withMessage('Country must be a string, e.g. Nigeria')
];

// Middleware to check results
validate.check = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

module.exports = validate;
