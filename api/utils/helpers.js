const bcrypt = require('bcryptjs');
const { fileHost } = require('../config');

exports.formatImageUrl = (path, name) => `${fileHost}${path}${name}`;

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

exports.formatPhoneNumber = (phone) => {};
