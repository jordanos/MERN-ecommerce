const mongoose = require('mongoose');

const IpnSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toObject: { getters: true, setters: true, virtuals: true },
    toJSON: { getters: true, setters: true, virtuals: true },
  }
);

module.exports = mongoose.model('Ipn', IpnSchema);
