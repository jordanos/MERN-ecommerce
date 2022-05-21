const mongoose = require('mongoose');
const { hashPassword } = require('../utils/helpers');

const AdminSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  phone: {
    type: Number,
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await hashPassword(this.password);
});
module.exports = mongoose.model('Admin', AdminSchema);
