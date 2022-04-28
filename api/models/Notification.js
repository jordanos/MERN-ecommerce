const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for the notification'],
    },
    text: {
      type: String,
      required: [true, 'Please provide a text for the notification'],
    },
    type: {
      type: String,
      default: 'normal',
    },
    status: {
      type: String,
      default: 'unread',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'user id is required'],
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

module.exports = mongoose.model('Notification', NotificationSchema);
