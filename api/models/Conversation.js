const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema(
  {
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
  }
);

module.exports = mongoose.model('Conversation', ConversationSchema);
