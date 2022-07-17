const mongoose = require('mongoose');
const { formatImageUrl } = require('../utils/helpers');
const { feedImagesPath } = require('../config');

const FeedSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'feed text is required.'],
    },
    image: {
      type: String,
      get: (image) => {
        if (!image) {
          return null;
        }
        return formatImageUrl(feedImagesPath, image);
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likesCount: {
      type: Number,
      default: 0,
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

module.exports = mongoose.model('Feed', FeedSchema);
