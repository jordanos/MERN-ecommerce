const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CustomError');

exports.loginReq = (req, res, next) => {
  // check for token
  const token = req.header['x-auth-token'] || req.headers.authorization;
  if (!token) return next(new CustomError('A token is required for authentication', 403));

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
  } catch (e) {
    return next(new CustomError('Invalid Token', 401));
  }

  return next();
};
