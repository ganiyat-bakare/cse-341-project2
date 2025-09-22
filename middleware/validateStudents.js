const { body, validationResult } = require('express-validator');

const validate = {};

validate.studentRules = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required, e.g. Amina')
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters'),

  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required, e.g. Okoro')
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required, e.g. aminaokoro@gmail.com')
    .isEmail()
    .withMessage('Must be a valid email address'),

  body('phone')
    .notEmpty()
    .withMessage('Phone number is required, e.g. +2348012345678')
    .isMobilePhone('any')
    .withMessage('Must be a valid phone number with country code'),

  body('birthday')
    .notEmpty()
    .withMessage('Birthday is required, e.g. 2002-03-14')
    .isISO8601()
    .withMessage('Birthday must be a valid date'),

  body('major').trim().notEmpty().withMessage('Major is required, e.g. Computer Science'),

  body('gpa')
    .notEmpty()
    .withMessage('GPA is required, e.g. 3.8')
    .isFloat({ min: 0, max: 4 })
    .withMessage('GPA must be a number between 0.0 and 4.0'),

  body('city').optional().isString(),
  body('country').optional().isString()
];

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
