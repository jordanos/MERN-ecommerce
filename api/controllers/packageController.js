const Package = require('../models/Package');
const {
  GetAll,
  CreateOne,
  GetOne,
  DeleteOne,
  UpdateOne,
} = require('./templates');
const { validatePackageInput } = require('../utils/validators');

exports.getPackages = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Package, 'package');
  getAll.execute();
};

exports.createPackage = (req, res, next) => {
  const createOne = new CreateOne(req, res, next, Package, 'package');
  createOne.validate = validatePackageInput;
  createOne.execute();
};

exports.getPackage = (req, res, next) => {
  const getOne = new GetOne(req, res, next, Package, 'package');
  getOne.execute();
};

exports.updatePackage = (req, res, next) => {
  const updateOne = new UpdateOne(req, res, next, Package, 'package');
  updateOne.validate = validatePackageInput;
  updateOne.execute();
};

exports.deletePackage = (req, res, next) => {
  const deleteOne = new DeleteOne(req, res, next, Package, 'package');
  deleteOne.execute();
};
