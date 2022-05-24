const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  rate: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

rateSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model('Rate', rateSchema);
