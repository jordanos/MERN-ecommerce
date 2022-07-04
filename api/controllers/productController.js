const Product = require('../models/Product');
const Hero = require('../models/Hero');
const Category = require('../models/Category');

const {
  GetAll,
  CreateOne,
  GetOne,
  DeleteOne,
  UpdateOne,
} = require('./templates');
const { validateProductInput } = require('../utils/validators');
const { findOne } = require('../models/Product');
const UserPackage = require('../models/UserPackage');

const populateCategory = { path: 'categoryId', select: 'name' };
const populateUser = {
  path: 'userId',
  select: 'firstName lastName image phone',
};
const populateTags = { path: 'tags', select: 'name' };

exports.getProducts = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Product, 'product');
  // add joins
  getAll.populate.push(populateCategory);
  getAll.populate.push(populateUser);
  getAll.populate.push(populateTags);

  getAll.execute();
};

exports.getMyProducts = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Product, 'product');
  getAll.filter = { userId: req.user.id };
  // add joins
  getAll.populate.push(populateCategory);
  getAll.populate.push(populateUser);
  getAll.populate.push(populateTags);

  getAll.execute();
};

exports.createProduct = async (req, res, next) => {
  const modfiedReq = { ...req, body: { ...req.body, userId: req.user.id } };
  // check if the user has package
  const package = await UserPackage.findOne({
    userId: modfiedReq.body.userId,
    isActive: true,
  });
  // if (!package) {
  //   throw new Error();
  // }

  // deduct products count

  // create product
  const createOne = new CreateOne(modfiedReq, res, next, Product, 'product');
  createOne.validate = validateProductInput;
  createOne.execute();
};

exports.getProduct = (req, res, next) => {
  const getOne = new GetOne(req, res, next, Product, 'product');
  // add joins
  getOne.populate.push(populateCategory);
  getOne.populate.push(populateUser);
  getOne.populate.push(populateTags);

  getOne.execute();
};

exports.updateProduct = (req, res, next) => {
  const modfiedReq = { ...req, body: { ...req.body, userId: req.user.id } };
  const updateOne = new UpdateOne(modfiedReq, res, next, Product, 'product');
  updateOne.validate = validateProductInput;
  updateOne.execute();
};

exports.deleteProduct = (req, res, next) => {
  const modfiedReq = { ...req, body: { ...req.body, userId: req.user.id } };
  const deleteOne = new DeleteOne(modfiedReq, res, next, Product, 'product');
  deleteOne.execute();
};

exports.uploadImage = (req, res, next) => {
  const modfiedReq = { ...req, body: { ...req.body, userId: req.user.id } };
  modfiedReq.body = { image: req.file.filename };
  const updateOne = new UpdateOne(modfiedReq, res, next, Product, 'product');
  // setup a vallidaion function otherwise an error will be thrown
  updateOne.validate = () => {};

  updateOne.execute();
};

exports.getHeroImages = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Hero, 'hero');

  // transform to get only images
  getAll.transform = async () => {
    const docs = [];
    for (let i = 0; i < getAll.doc.length; i += 1) {
      if (i >= 2) {
        break;
      }
      docs.push(getAll.doc[i].image);
    }
    return docs;
  };

  getAll.execute();
};

exports.filterByCategories = async (req, res, next) => {
  const getAll = new GetAll(req, res, next, Product, 'product');
  // get category id from name of category
  const { cat } = req.query;
  const catId = await Category.find({ name: cat }).exec();

  getAll.filter = { category: catId };
  // add joins
  getAll.populate.push(populateCategory);
  getAll.populate.push(populateUser);
  getAll.populate.push(populateTags);

  getAll.execute();
};
