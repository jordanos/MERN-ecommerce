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
  const getAll = new GetAll(req, res, next, Message, 'Message');
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
