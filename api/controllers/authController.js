const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Otp = require('../models/Otp');
const TokenBlackList = require('../models/TokenBlackList');
const CustomError = require('../utils/CustomError');
const { validateId } = require('../utils/validators');
const { FormatPhone } = require('../utils/Formatter');
const Admin = require('../models/Admin');

exports.login = async (req, res, next) => {
  try {
    // Get req data and init required data
    const { phone, password } = req.body;
    let formattedPhone = phone;
    const formatPhone = new FormatPhone();

    if (phone) {
      formattedPhone = formatPhone.exec(phone);
    }

    const user = await User.findOne({ phone: formattedPhone });
    if (!(user && (await bcrypt.compare(password, user.password)))) {
      throw new CustomError('Invalid Credentials', 401);
    }

    // Create token
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: '9999d',
    });

    // save user token
    // user.token = token;
    // user.save();

    res.status(200).json({ token, user });
  } catch (e) {
    next(e);
  }
};

exports.adminLogin = async (req, res, next) => {
  try {
    // Get req data and init required datas
    const { phone, password } = req.body;
    const admin = await Admin.findOne({ phone });
    if (!(admin && (await bcrypt.compare(password, admin.password)))) {
      throw new CustomError('Invalid Credentials', 401);
    }

    // Create token
    const token = jwt.sign({ id: admin.id }, process.env.SECRET_KEY, {
      expiresIn: '9999d',
    });

    // save user token
    // user.token = token;
    // user.save();

    res.status(200).json({ token, admin });
  } catch (e) {
    next(e);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const { token } = req.params;
    // check if token is already blacklisted, if true return
    const docToken = await TokenBlackList.findOne({ token });
    if (docToken) return res.status(200).json({ success: true });

    const doc = await TokenBlackList.create({ token });
    if (!doc) {
      throw new Error('something went wrong', 500);
    }
    return res.status(200).json({ success: true });
  } catch (e) {
    return next(e);
  }
};

exports.sendOtp = async (req, res, next) => {
  try {
    const { id } = req.params;
    validateId(id);

    const user = await User.findOne({ _id: id });
    const otpDoc = await Otp.findOne({ userId: id });
    // check if verified or otp exists.
    if (user.isVerified) {
      throw new CustomError('already verified!', 400);
    }
    if (otpDoc) {
      await Otp.deleteOne({ userId: id });
    }

    // generate random 6 digit number
    // const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const randomNumber = 123456;

    // save number in the database
    const otpDocNew = await Otp.create({ userId: id, otp: randomNumber });
    if (!otpDocNew) {
      throw new CustomError('Something went wrong!', 500);
    }
    // dispatch otp sending api

    // send success message
    res.status(200).json({ success: true });
  } catch (e) {
    next(e);
  }
};

exports.verify = async (req, res, next) => {
  try {
    // prepare data
    const { id } = req.params;
    validateId(id);

    const user = await User.findOne({ _id: id });

    // check if already verified
    if (user.isVerified) {
      throw new CustomError('User already verified.', 400);
    }
    // get OTP and check if true else throw error
    const { otp } = req.body;

    const otpDoc = await Otp.findOne({ userId: id, otp });
    if (!otpDoc) {
      throw new CustomError('Invalid Otp credentials!', 403);
    }

    // change isVerified field to true
    user.isVerified = true;
    user.save();

    res.status(200).json({ success: true });
  } catch (e) {
    next(e);
  }
};
