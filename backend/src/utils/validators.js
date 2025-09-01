const { body } = require('express-validator');

// User registration validation
const validateRegistration = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 50 })
    .withMessage('Name cannot exceed 50 characters'),
  
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  
  body('mobileNumber')
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/)
    .withMessage('Please enter a valid mobile number'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  
  body('country')
    .notEmpty()
    .withMessage('Country is required'),
  
  body('city')
    .notEmpty()
    .withMessage('City is required'),
  
  body('state')
    .notEmpty()
    .withMessage('State is required'),
  
  body('gender')
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be male, female, or other')
];

// User login validation
const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Task validation
const validateTask = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Task name is required')
    .isLength({ max: 100 })
    .withMessage('Task name cannot exceed 100 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Task description is required')
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  
  body('startDate')
    .isISO8601()
    .withMessage('Please provide a valid start date'),
  
  body('endDate')
    .isISO8601()
    .withMessage('Please provide a valid end date'),
  
  body('totalTask')
    .isInt({ min: 1 })
    .withMessage('Total task must be a positive integer'),
  
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Status must be pending, in-progress, or completed')
];

module.exports = {
  validateRegistration,
  validateLogin,
  validateTask
};