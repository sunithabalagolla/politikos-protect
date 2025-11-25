/**
 * Custom Application Error Class
 * Extends the native Error class with additional properties for better error handling
 */
class AppError extends Error {
  constructor(message, statusCode, code = 'ERROR') {
    super(message);
    
    this.statusCode = statusCode;
    this.code = code;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
