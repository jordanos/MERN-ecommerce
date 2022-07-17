const mongoose = require('mongoose');
const { productImagesPath } = require('../config');
const { formatImageUrl } = require('../utils/helpers');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: 'Description not available.',
    },
    condition: {
      type: String,
      required: true,
      enum: ['NEW', 'SLIGHTLY USED', 'USED'],
    },
    brand: {
      type: String,
      default: 'unknown',
    },
    images: [
      {
        type: String,
        default: 'default_image.jpg',
        get: (image) => formatImageUrl(productImagesPath, image),
      },
    ],
    rate: {
      type: Number,
      default: 4.9,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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
ProductSchema.index({ name: 'text' });

module.exports = mongoose.model('Product', ProductSchema);
