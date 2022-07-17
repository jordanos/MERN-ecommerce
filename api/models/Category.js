const mongoose = require('mongoose');
const { categoryImagesPath } = require('../config');
const { formatImageUrl } = require('../utils/helpers');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    image: {
      type: String,
      get: (image) => {
        if (!image) {
          return null;
        }
        return formatImageUrl(categoryImagesPath, image);
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
  }
);
module.exports = mongoose.model('Category', CategorySchema);
