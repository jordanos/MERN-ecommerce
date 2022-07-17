const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPosts: {
      type: Number,
      required: true,
    },
    expiresAfter: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: 'default.png',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
  }
);

module.exports = mongoose.model('Package', PackageSchema);
