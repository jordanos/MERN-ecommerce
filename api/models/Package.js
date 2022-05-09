const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },

  postCount: { type: Number, max: 100 },

  packageType: { type: String },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Package', packageSchema);
