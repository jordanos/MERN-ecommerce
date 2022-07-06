const { default: mongoose } = require('mongoose');
const Message = require('../models/Message');

const {
  GetAll,
  CreateOne,
  GetOne,
  DeleteOne,
  UpdateOne,
} = require('./templates');
const { validateMessageInput } = require('../utils/validators');
const CustomError = require('../utils/CustomError');
const Conversation = require('../models/Conversation');

exports.populateConversation = {
  path: 'conversationId',
  select: 'toId fromId',
};

exports.getAll = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Message, 'Message');
  // getAll.filter = { $or: [{ toId: req.user.id }, { fromId: req.user.id }] };

  getAll.execute();
};

exports.createOne = async (req, res, next) => {
  try {
    if (!req.body.conversationId) {
      throw new CustomError('conversation id required', 400);
    }

    const conversationDoc = await Conversation.findById(
      req.body.conversationId
    );
    if (!conversationDoc) {
      throw new CustomError('conversation object doesn not exist', 400);
    }
    let toId = '';
    if (
      conversationDoc.fromId.equals(new mongoose.Types.ObjectId(req.user.id))
    ) {
      toId = conversationDoc.toId;
    } else {
      toId = conversationDoc.fromId;
    }

    const modfiedReq = {
      ...req,
      body: { ...req.body, fromId: req.user.id, toId },
    };
    const createOne = new CreateOne(modfiedReq, res, next, Message, 'Message');
    // setup a vallidaion function otherwise an error will be thrown
    createOne.validate = validateMessageInput;

    createOne.execute();
  } catch (e) {
    return next(e);
  }
};

exports.getOne = (req, res, next) => {
  const getOne = new GetOne(req, res, next, Message, 'Message');
  getOne.execute();
};

exports.updateOne = (req, res, next) => {
  const updateOne = new UpdateOne(req, res, next, Message, 'Message');
  // setup a vallidaion function otherwise an error will be thrown
  updateOne.validate = validateMessageInput;

  updateOne.execute();
};

exports.deleteOne = (req, res, next) => {
  const deleteOne = new DeleteOne(req, res, next, Message, 'Message');
  deleteOne.execute();
};

exports.getConvMessages = async (req, res, next) => {
  const conversationId = req.params.id;

  // update read status
  if (conversationId)
    await Message.updateMany({ conversationId }, { status: 'READ' });

  const getAll = new GetAll(req, res, next, Message, 'Message');

  getAll.filter = { conversationId };
  getAll.execute();
};
