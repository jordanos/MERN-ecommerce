const Category = require('../models/Category');

const {
    GetAll,
    CreateOne,
    GetOne,
    DeleteOne,
    UpdateOne,
  } = require('./templates');
  const { validateCategoryInput } = require('../utils/validators');
  exports.getCategories = (req, res, next) => {
    const getAll = new GetAll(req, res, next, Category, 'category');
    getAll.execute();
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
  exports.deleteCategory= (req, res, next) => {
    const deleteOne = new DeleteOne(req, res, next, Category, 'category');
    deleteOne.execute();
  };  