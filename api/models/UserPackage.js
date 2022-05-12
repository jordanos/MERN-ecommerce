const mongoose = require('mongoose');

const UserPackageSchema = new mongoose.Schema({
  PackageId: { type: mongoose.Schema.Types.ObjectId, ref: 'PackageType' },
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isActive: {type:Boolean},
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("UserPackage", UserPackageSchema);

