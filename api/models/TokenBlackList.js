const mongoose = require('mongoose');

const TokenBlackListSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, 'token must be provided'],
      unique: true,
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

module.exports = mongoose.model('TokenBlackList', TokenBlackListSchema);
