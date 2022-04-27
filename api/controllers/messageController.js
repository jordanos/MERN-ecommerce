const Message = require('../models/Message');

const {
  GetAll,
  CreateOne,
  GetOne,
  DeleteOne,
  UpdateOne,
} = require('./templates');
const { validateMessageInput } = require('../utils/validators');

exports.getMessages = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Message, 'Message');
  getAll.execute();
};

exports.createMessage = (req, res, next) => {
  const createOne = new CreateOne(req, res, next, Message, 'Message');
  // setup a vallidaion function otherwise an error will be thrown
  createOne.validate = validateMessageInput;

  createOne.execute();
};

exports.getMessage = (req, res, next) => {
  const getOne = new GetOne(req, res, next, Message, 'Message');
  getOne.execute();
};

exports.updateMessage = (req, res, next) => {
  const updateOne = new UpdateOne(req, res, next, Message, 'Message');
  // setup a vallidaion function otherwise an error will be thrown
  updateOne.validate = validateMessageInput;

  updateOne.execute();
};

exports.deleteMessage = (req, res, next) => {
  const deleteOne = new DeleteOne(req, res, next, Message, 'Message');
  deleteOne.execute();
};
