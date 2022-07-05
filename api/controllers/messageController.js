const Message = require('../models/Message');

const {
  GetAll,
  CreateOne,
  GetOne,
  DeleteOne,
  UpdateOne,
} = require('./templates');
const { validateMessageInput } = require('../utils/validators');

const populateConversation = { path: 'conversationId', select: 'toId fromId' };

exports.getAll = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Message, 'Message');
  getAll.populate.push(populateConversation);
  // getAll.filter = { $or: [{ toId: req.user.id }, { fromId: req.user.id }] };

  getAll.execute();
};

exports.createOne = (req, res, next) => {
  const modfiedReq = { ...req, body: { ...req.body, fromId: req.user.id } };
  const createOne = new CreateOne(modfiedReq, res, next, Message, 'Message');
  // setup a vallidaion function otherwise an error will be thrown
  createOne.validate = validateMessageInput;

  createOne.execute();
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
