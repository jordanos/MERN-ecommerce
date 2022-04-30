const mongoose = require('mongoose');

const ProductCategorySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'product id is required'],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'category id is required'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProductCategorySchema.index({ productId: 1, categoryId: 1 }, { unique: true });

module.exports = mongoose.model('ProductCategory', ProductCategorySchema);
