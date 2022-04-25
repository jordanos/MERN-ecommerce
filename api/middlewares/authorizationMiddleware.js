// const { ObjectId } = require('mongodb');
const CustomError = require('../utils/CustomError');

// checks if a user is authorized to get/update thid user resource
exports.authorizeUser = (req, res, next) => {
  if (!(req.user.id === req.params.id))
    return next(new CustomError('Unauthorized to access this file', 403));

  return next();
};
