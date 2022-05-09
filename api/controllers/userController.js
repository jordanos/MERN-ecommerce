const User = require('../models/User');
const Feed = require('../models/Feed');
const {
  GetAll,
  CreateOne,
  GetOne,
  DeleteOne,
  UpdateOne,
} = require('./templates');
const { validateUserInput } = require('../utils/validators');
const { hashPassword } = require('../utils/helpers');

exports.getUsers = (req, res, next) => {
  const getAll = new GetAll(req, res, next, User, 'user');
  getAll.execute();
};

exports.createUser = (req, res, next) => {
  const createOne = new CreateOne(req, res, next, User, 'user');
  // setup a vallidaion function otherwise an error will be thrown
  createOne.validate = validateUserInput;

  createOne.execute();
};

exports.getUser = (req, res, next,) => {
  const getOne = new GetOne(req, res, next, User, 'user');
  getOne.execute();
};

exports.updateUser = async (req, res, next) => {
  const updateOne = new UpdateOne(req, res, next, User, 'user');
  // setup a vallidaion function otherwise an error will be thrown
  updateOne.validate = validateUserInput;
  // hash password if exists
  if (req.body.password) {
    req.body.password = await hashPassword(req.body.password);
  }

  updateOne.execute();
};

exports.deleteUser = (req, res, next) => {
  const deleteOne = new DeleteOne(req, res, next, User, 'user');
  deleteOne.execute();
};

exports.uploadImage = (req, res, next) => {
  req.body = { image: req.file.filename };
  const updateOne = new UpdateOne(req, res, next, User, 'user');
  // setup a vallidaion function otherwise an error will be thrown
  updateOne.validate = () => {};

  updateOne.execute();
};
