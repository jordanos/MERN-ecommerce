const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please provide a text'],
    },
    fromId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'sender id is required'],
    },
    toId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'reciever id is required'],
    },
    type: {
      type: String,
      default: 'normal',
    },
    status: {
      type: String,
      default: 'unread',
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

module.exports = mongoose.model('Message', MessageSchema);
