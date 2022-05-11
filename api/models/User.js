const mongoose = require('mongoose');
const { formatImageUrl, hashPassword } = require('../utils/helpers');
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
    lastSeen: {
      type: Date,
      default: Date.now(),
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
    toObject: { getters: true, setters: true, virtuals: true },
    toJSON: { getters: true, setters: true, virtuals: true },
    runSettersOnQuery: true,
  }
);

// mongoose Middleware To Encrypt Password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await hashPassword(this.password);
});

module.exports = mongoose.model('User', UserSchema);
