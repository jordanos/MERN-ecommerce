const mongoose = require('mongoose');
const { categoryImagesPath } = require('../config');
const { formatImageUrl } = require('../utils/helpers');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  image: {
    type: String,
    default: 'default_image.png',
    get: (image) => formatImageUrl(categoryImagesPath, image),
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Category', CategorySchema);
