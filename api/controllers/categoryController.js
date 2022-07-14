const Category = require('../models/Category');

const { CreateOne, GetOne, DeleteOne, UpdateOne } = require('./templates');

const { validateCategoryInput } = require('../utils/validators');

exports.getCategories = async (req, res, next) => {
  try {
    const doc = await Category.find();
    return res.status(200).send({ data: doc });
  } catch (e) {
    return next(e);
  }
};

exports.createCategory = (req, res, next) => {
  const createOne = new CreateOne(req, res, next, Category, 'category');
  createOne.validate = validateCategoryInput;
  createOne.execute();
};

exports.getCategory = (req, res, next) => {
  const getOne = new GetOne(req, res, next, Category, 'category');
  getOne.execute();
};

exports.updateCategory = (req, res, next) => {
  const updateOne = new UpdateOne(req, res, next, Category, 'category');
  updateOne.validate = validateCategoryInput;
  updateOne.execute();
};

exports.deleteCategory = (req, res, next) => {
  const deleteOne = new DeleteOne(req, res, next, Category, 'category');
  deleteOne.execute();
};

exports.uploadImage = (req, res, next) => {
  req.body = { image: req.file.filename };
  const updateOne = new UpdateOne(req, res, next, Category, 'category');
  // setup a vallidaion function otherwise an error will be thrown
  updateOne.validate = () => {};

  updateOne.execute();
};
