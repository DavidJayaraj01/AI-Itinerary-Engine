const { validationResult } = require('express-validator');
const { AppError } = require('../../utils/helpers');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    console.error('❌ Validation errors:', JSON.stringify(errors.array(), null, 2));
    const errorMessages = errors.array().map(err => `${err.path}: ${err.msg}`).join(', ');
    return next(new AppError(errorMessages, 400));
  }
  
  next();
};

module.exports = { validate };
