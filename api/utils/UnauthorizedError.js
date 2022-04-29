const CustomError = require('./CustomError');

class UnauthorizedError extends CustomError {
  constructor() {
    super('Unauthorized to access this file', 403);
  }
}

module.exports = UnauthorizedError;
