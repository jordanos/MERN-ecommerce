const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { formatImageUrl } = require('../utils/helpers');
const { userImagesPath } = require('../config');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
    },
    phone: {
      type: String,
      required: [true, 'Please provide your phone number'],
      unique: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      select: true,
    },
    address: {
      type: String,
      default: 'Addis Ababa',
    },
    image: {
      type: String,
      default: 'default_image.png',
      get: (image) => formatImageUrl(userImagesPath, image),
    },
    status: {
      type: String,
      default: 'active',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
  }
);

// mongoose Middleware To Encrypt Password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);
