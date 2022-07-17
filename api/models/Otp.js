const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema(
  {
    otp: {
      type: Number,
      required: [true, 'otp must be provided'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
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

module.exports = mongoose.model('Otp', OtpSchema);
