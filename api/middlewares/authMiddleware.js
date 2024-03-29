const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CustomError');
const Admin = require('../models/Admin');

exports.loginReq = async (req, res, next) => {
  // check for token
  const token = req.header['x-auth-token'] || req.headers.authorization;
  if (!token)
    return next(new CustomError('A token is required for authentication', 403));

  try {
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
  } catch (e) {
    return next(new CustomError('Invalid Token', 401));
  }

  /*   try {
    const { id } = req.user;
    const user = await User.findById(id).exec();
    if (!user.isVerified) throw new CustomError('User must be verified', 403);
  } catch (e) {
    next(e);
  } */

  return next();
};

exports.adminReq = async (req, res, next) => {
  // check for token
  const token = req.header['x-auth-token'] || req.headers.authorization;
  if (!token)
    return next(new CustomError('A token is required for authentication', 403));

  try {
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const adminDoc = await Admin.findById(decoded.id);
    if (!adminDoc) {
      return next(new CustomError('Admin does not exist', 404));
    }
    req.user = decoded;
  } catch (e) {
    return next(new CustomError('Invalid Token', 401));
  }

  return next();
};
