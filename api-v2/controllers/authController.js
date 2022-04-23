const User = require("../models/User");
const CustomError = require("../utils/CustomError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    if (!(user && (await bcrypt.compare(password, user.password)))) {
      throw new CustomError("Invalid Credentials", 401);
    }
    // Create token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "9999d",
    });

    // save user token
    // user.token = token;
    // user.save();

    res.status(200).json({ data: { token: token } });
  } catch (e) {
    next(e);
  }
};
