'use strict';

// Owen error type
class AppError extends Error {
  constructor(message, statusCode) {
    super()
    this.message = message
    this.statusCode = statusCode
  }
}

module.exports = AppError