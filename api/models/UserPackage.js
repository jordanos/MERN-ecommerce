const mongoose = require('mongoose');

const UserPackageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
    },
    isActive: {
      type: Boolean,
      default: true,
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

module.exports = mongoose.model('UserPackage', UserPackageSchema);
