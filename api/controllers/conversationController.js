/* eslint-disable consistent-return */
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

const { GetAll, GetOne, DeleteOne, UpdateOne } = require('./templates');
const { validateMessageInput } = require('../utils/validators');

exports.getAll = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Conversation, 'Conversation');
  getAll.filter = {
    $or: [{ toId: req.user.id }, { fromId: req.user.id }],
  };
  getAll.populate.push('toId');
  getAll.populate.push('fromId');

  getAll.transform = async () => {
    const convs = await Promise.all(
      getAll.doc.map(async (conv) => {
        const conversation = {
          id: conv.id,
          fromId: conv.fromId,
          toId: conv.toId,
          lastMessage: null,
          unreadCount: 0,
          createdAt: conv.createdAt,
        };

        const lastMessage = await Message.findOne({
          conversationId: conv.id,
        }).sort('-createdAt');
        const unreadCount = await Message.count({
          conversationId: conv.id,
          status: 'SENT',
        }).count();

        conversation.lastMessage = lastMessage;
        conversation.unreadCount = unreadCount;

        return conversation;
      })
    );

    return convs;
  };

  getAll.execute();
};

exports.createOne = async (req, res, next) => {
  const conversation = {
    id: null,
    fromId: null,
    toId: null,
    lastMessage: null,
    unreadCount: 0,
    createdAt: null,
  };

  try {
    // check if conversation with sender and reciever exists
    const { toId } = req.body;
    const fromId = req.user.id;

    const filter = {
      $or: [
        { $and: [{ fromId }, { toId }] },
        { $and: [{ fromId: toId }, { toId: fromId }] },
      ],
    };
    const doc = await Conversation.findOne(filter)
      .populate('fromId')
      .populate('toId');

    // if it does, return conversation id
    if (doc) {
      conversation.id = doc.id;
      conversation.fromId = doc.fromId;
      conversation.toId = doc.toId;
      conversation.lastMessage = null;
      conversation.unreadCount = 0;
    } else {
      const newConv = await Conversation.create({ toId, fromId });
      const newConvDoc = await Conversation.findById(newConv.id)
        .populate('fromId')
        .populate('toId');
      conversation.id = newConvDoc.id;
      conversation.fromId = newConvDoc.fromId;
      conversation.toId = newConvDoc.toId;
      conversation.lastMessage = null;
      conversation.unreadCount = 0;
    }

    return res.status(201).send(conversation);
  } catch (e) {
    return next(e);
  }
};

exports.getOne = (req, res, next) => {
  const getOne = new GetOne(req, res, next, Conversation, 'Conversation');
  getOne.execute();
};

exports.updateOne = (req, res, next) => {
  const updateOne = new UpdateOne(req, res, next, Conversation, 'Conversation');
  // setup a vallidaion function otherwise an error will be thrown
  updateOne.validate = validateMessageInput;

  updateOne.execute();
};

exports.deleteOne = (req, res, next) => {
  const deleteOne = new DeleteOne(req, res, next, Conversation, 'Conversation');
  deleteOne.execute();
};
