const PackageTypes = require('../models/PackageTypes');
const {
  GetAll,
  CreateOne,
  GetOne,
  DeleteOne,
  UpdateOne,
} = require('./templates');
const { validatePackageInput } = require('../utils/validators');

exports.getPackages = (req, res, next) => {
  const getAll = new GetAll(req, res, next, PackageTypes, 'packageTypes');
  getAll.execute();
};

exports.createPackage = (req, res, next) => {
  const createOne = new CreateOne(req,res, next, PackageTypes, 'packageTypes');
  createOne.validate = validatePackageInput;
  createOne.execute();
};

exports.getPackage = (req, res, next) => {
  const getOne = new GetOne(req, res, next, PackageTypes, 'packageTypes');
  getOne.execute();
};
exports.updatePackage = (req, res, next) => {
  const updateOne = new UpdateOne(req, res, next, PackageTypes, 'packageTypes');
  updateOne.validate = validatePackageInput;
  updateOne.execute();
};
exports.deletePackage = (req, res, next) => {
  const deleteOne = new DeleteOne(req, res, next, PackageTypes, 'packageTypes');
  deleteOne.execute();
};
