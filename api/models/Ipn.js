const mongoose = require('mongoose');

const IpnSchema = new mongoose.Schema(
  {
    message: {
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
      default: Date.now(),
    },
  },
  {
    toObject: {},
    toJSON: {},
    runSettersOnQuery: true,
  }
);

module.exports = mongoose.model('Ipn', IpnSchema);
