const mongoose = require('mongoose');

const AppSchema = new mongoose.Schema(
  {
    version: {
      type: Number,
      required: true,
    },
  },
  {
    toObject: { getters: true, setters: true, virtuals: true },
    toJSON: { getters: true, setters: true, virtuals: true },
  }
);

module.exports = mongoose.model('App', AppSchema);
