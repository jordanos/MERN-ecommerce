const Tag = require('../models/Tag');

const {
  GetAll,
  CreateOne,
  GetOne,
  DeleteOne,
  UpdateOne,
} = require('./templates');
const { validateTagInput } = require('../utils/validators');

exports.getAll = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Tag, 'Tag');
  getAll.execute();
};

exports.createOne = (req, res, next) => {
  const createOne = new CreateOne(req, res, next, Tag, 'Tag');
  // setup a vallidaion function otherwise an error will be thrown
  createOne.validate = validateTagInput;

  createOne.execute();
};

exports.getOne = (req, res, next) => {
  const getOne = new GetOne(req, res, next, Tag, 'Tag');
  getOne.execute();
};

exports.updateOne = (req, res, next) => {
  const updateOne = new UpdateOne(req, res, next, Tag, 'Tag');
  // setup a vallidaion function otherwise an error will be thrown
  updateOne.validate = validateTagInput;

  updateOne.execute();
};

exports.deleteOne = (req, res, next) => {
  const deleteOne = new DeleteOne(req, res, next, Tag, 'Tag');
  deleteOne.execute();
};
