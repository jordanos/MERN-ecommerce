const Category = require('../models/Category');

const { GetOne, DeleteOne, UpdateOne } = require('./templates');

const { validateCategoryInput } = require('../utils/validators');
const { userUpload } = require('../utils/multerFormatter');
const saveImageFunction = require('../utils/saveImageFunction');
const { categoryImagesPath } = require('../config');

exports.getCategories = async (req, res, next) => {
  try {
    const doc = await Category.find();
    return res.status(200).send({ data: doc });
  } catch (e) {
    return next(e);
  }
};

exports.createCategory = (req, res, next) => {
  userUpload(req, res, async (err) => {
    if (err) {
      return next(err);
    }
    let modifiedReq = req;

    // validate user input
    try {
      await validateCategoryInput(modifiedReq);
    } catch (e) {
      return next(e);
    }

    if (req.file) {
      try {
        const filename = await saveImageFunction(req.file, categoryImagesPath);
        modifiedReq = {
          ...modifiedReq,
          body: { ...modifiedReq.body, image: filename },
        };
      } catch (e) {
        return next(e);
      }
    }

    try {
      const categoryDoc = await Category.create(modifiedReq.body);

      return res.status(201).send(categoryDoc);
    } catch (e) {
      return next(e);
    }
  });
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
