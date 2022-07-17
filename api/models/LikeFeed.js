const mongoose = require('mongoose');

const LikeFeedSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'user id is required'],
    },
    feedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Feed',
      required: [true, 'feed id is required'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

LikeFeedSchema.index({ userId: 1, feedId: 1 }, { unique: true });

module.exports = mongoose.model('LikeFeed', LikeFeedSchema);
