const Joi = require('joi');

// User registration validation
const validateRegistration = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(50).required(),
    email: Joi.string().email().required(),
    mobileNumber: Joi.string().pattern(/^[0-9]{10}$/).required(),
    password: Joi.string().min(6).required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    gender: Joi.string().valid('male', 'female', 'other').required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

// User login validation
const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

// Task validation
const validateTask = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(100).required(),
    description: Joi.string().max(500).allow(''),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().min(Joi.ref('startDate')).required(),
    totalTask: Joi.number().min(1).required(),
    status: Joi.string().valid('pending', 'in progress', 'completed')
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateTask
};