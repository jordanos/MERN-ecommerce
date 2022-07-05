const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

const {
  GetAll,
  CreateOne,
  GetOne,
  DeleteOne,
  UpdateOne,
} = require('./templates');
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

exports.createOne = (req, res, next) => {
  const modfiedReq = { ...req, body: { ...req.body, fromId: req.user.id } };
  const createOne = new CreateOne(
    modfiedReq,
    res,
    next,
    Conversation,
    'Conversation'
  );

  createOne.doMongo = async () => {
    // check if conversation with sender and reciever exists
    const { toId } = req.body;
    const fromId = req.user.id;

    const filter = {
      $or: [
        { $and: [{ fromId }, { toId }] },
        { $and: [{ fromId: toId }, { toId: fromId }] },
      ],
    };
    createOne.doc = await Conversation.findOne(filter);

    // if it does, return conversation id
    if (createOne.doc) {
      return;
    }

    // if not, create conversation id and return it
    createOne.doc = await Conversation.create({ toId, fromId });
  };

  // setup a vallidaion function otherwise an error will be thrown
  createOne.validate = () => {};

  createOne.execute();
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
