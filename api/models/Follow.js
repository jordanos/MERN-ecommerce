const mongoose = require('mongoose');

const FollowSchema = new mongoose.Schema(
  {
    followerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'follower id is required'],
    },
    followingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'following id is required'],
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

FollowSchema.index({ followerId: 1, followingId: 1 }, { unique: true });

module.exports = mongoose.model('Follow', FollowSchema);
