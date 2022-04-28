const mongoose = require('mongoose');
const { productImagesPath } = require('../config');
const { formatImageUrl } = require('../utils/helpers');

const ProductSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      default: 'default_image.jpg',
      get: (image) => formatImageUrl(productImagesPath, image),
    },
    category: {
      type: String,
      ref: 'Category',
    },
    productCondition: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      default: 'unknown',
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

module.exports = mongoose.model('Product', ProductSchema);
