const TransactionMethod = require('../models/TransactionMethod');

const {
  GetAll,
  CreateOne,
  GetOne,
  DeleteOne,
  UpdateOne,
} = require('./templates');
const { validateTransactionMethodInput } = require('../utils/validators');

exports.getAll = (req, res, next) => {
  const getAll = new GetAll(
    req,
    res,
    next,
    TransactionMethod,
    'TransactionMethod'
  );
  getAll.execute();
};

exports.createOne = (req, res, next) => {
  const createOne = new CreateOne(
    req,
    res,
    next,
    TransactionMethod,
    'TransactionMethod'
  );
  // setup a vallidaion function otherwise an error will be thrown
  createOne.validate = validateTransactionMethodInput;

  createOne.execute();
};

exports.getOne = (req, res, next) => {
  const getOne = new GetOne(
    req,
    res,
    next,
    TransactionMethod,
    'TransactionMethod'
  );
  getOne.execute();
};

exports.updateOne = (req, res, next) => {
  const updateOne = new UpdateOne(
    req,
    res,
    next,
    TransactionMethod,
    'TransactionMethod'
  );
  // setup a vallidaion function otherwise an error will be thrown
  updateOne.validate = validateTransactionMethodInput;

  updateOne.execute();
};

exports.deleteOne = (req, res, next) => {
  const deleteOne = new DeleteOne(
    req,
    res,
    next,
    TransactionMethod,
    'TransactionMethod'
  );
  deleteOne.execute();
};
