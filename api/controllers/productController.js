const Product = require('../models/Product');

const {
  GetAll,
  CreateOne,
  GetOne,
  DeleteOne,
  UpdateOne,
} = require('./templates');

const { validateProductInput } = require('../utils/validators');

exports.getProducts = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Product, 'product');
  getAll.execute();
};

exports.createProduct = (req, res, next) => {
  const createOne = new CreateOne(req, res, next, Product, 'product');
  createOne.validate = validateProductInput;
  createOne.execute();
};

exports.getProduct = (req, res, next) => {
  const getOne = new GetOne(req, res, next, Product, 'product');
  getOne.execute();
};

exports.updateProduct = (req, res, next) => {
  const updateOne = new UpdateOne(req, res, next, Product, 'product');
  updateOne.validate = validateCategoryInput;
  updateOne.execute();
};

exports.deleteProduct = (req, res, next) => {
  const deleteOne = new DeleteOne(req, res, next, Product, 'product');
  deleteOne.execute();
};

exports.uploadImage = (req, res, next) => {
  req.body = { image: req.file.filename };
  const updateOne = new UpdateOne(req, res, next, Product, 'user');
  updateOne.validate = () => {};
  updateOne.execute();
};
exports.getTrendingProducts = (req, res, next) => {};
exports.createTrendingProducts = (req, res, next) => {
  const myQuery = Product.isTrending;
  const newValue = { $Set: { isTrending: true } };
  const UpdateOne = UpdateOne(myQuery, newValue, (err, result) => {
    if (err) console.log(err);
    UpdateOne.execute();
  });
};
exports.removeTrendingProduct = (req, res, next) => {};
exports.rateProduct = (err, callback) => {};
