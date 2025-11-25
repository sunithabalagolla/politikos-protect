const { validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

/**
 * Validation Middleware
 * Checks for validation errors from express-validator and returns formatted error response
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => ({
      field: err.path || err.param,
      message: err.msg
    }));
    
    return next(new AppError(
      'Validation failed',
      400,
      'VALIDATION_ERROR'
    ));
  }
  
  next();
};

module.exports = validate;
