const mongoose = require('mongoose');
const { hashPassword } = require('../utils/helpers');

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'please provide email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'please provide password'],
    },
    read: {
      type: Boolean,
      default: true,
    },
    write: {
      type: Boolean,
      default: false,
    },
    addAdmin: {
      type: Boolean,
      default: false,
    },
    removeAdmin: {
      type: Boolean,
      default: false,
    },
    isSuper: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toObject: { getters: true, setters: true, virtuals: true },
    toJSON: { getters: true, setters: true, virtuals: true },
    runSettersOnQuery: true,
  }
);

AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await hashPassword(this.password);
});
module.exports = mongoose.model('Admin', AdminSchema);
