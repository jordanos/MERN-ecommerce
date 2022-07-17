const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionMethodId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      enum: ['INCOMING', 'OUTGOING'],
      required: true,
    },
    currency: {
      type: String,
      enum: ['COIN', 'MONEY'],
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'COMPLETED', 'REJECTED'],
      default: 'PENDING',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toObject: { getters: true, setters: true, virtuals: true },
    toJSON: { getters: true, setters: true, virtuals: true },
    runSettersOnQuery: true,
  }
);

module.exports = mongoose.model('Transaction', TransactionSchema);
