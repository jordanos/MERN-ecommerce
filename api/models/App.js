const mongoose = require('mongoose');

const AppSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    version: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toObject: { getters: true, setters: true, virtuals: true },
    toJSON: { getters: true, setters: true, virtuals: true },
  }
);

module.exports = mongoose.model('App', AppSchema);
