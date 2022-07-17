const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: [true, 'conversation id is required'],
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
    text: {
      type: String,
      required: [true, 'please provide a text'],
    },
    type: {
      type: String,
      default: 'text',
    },
    status: {
      type: String,
      enum: ['SENT', 'READ'],
      default: 'SENT',
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

// class MessageStatus {
//   static Sent = new MessageStatus('sent');
//   static Delivered = new MessageStatus('delivered');
//   static Read = new MessageStatus('read');

//   constructor(status) {
//     this.status = status;
//   }
// }

// const getMessageStatus = (status) => {
//   switch (status) {
//     case MessageStatus.Sent:
//       return 'sent';
//     case MessageStatus.Delivered:
//       return 'delivered';
//     case MessageStatus.Read:
//       return 'read';
//     default:
//       throw new Error('Message status unknown.');
//   }
// };

module.exports = mongoose.model('Message', MessageSchema);
