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
  const modfiedReq = { ...req, body: { ...req.body, userId: req.user.id } };
  const createOne = new CreateOne(modfiedReq, res, next, Product, 'product');
  createOne.validate = validateProductInput;
  createOne.execute();
};

exports.getProduct = (req, res, next) => {
  const getOne = new GetOne(req, res, next, Product, 'product');
  getOne.execute();
};

exports.updateProduct = (req, res, next) => {
  const updateOne = new UpdateOne(req, res, next, Product, 'product');
  updateOne.validate = validateProductInput;
  updateOne.execute();
};

exports.deleteProduct = (req, res, next) => {
  const deleteOne = new DeleteOne(req, res, next, Product, 'product');
  deleteOne.execute();
};

exports.uploadImage = (req, res, next) => {
  req.body = { image: req.file.filename };
  const updateOne = new UpdateOne(req, res, next, Product, 'product');
  // setup a vallidaion function otherwise an error will be thrown
  updateOne.validate = () => {};

  updateOne.execute();
};

exports.getHeroImages = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Product, 'product');

  // transform to get only images
  getAll.transform = async () => {
    const docs = [];
    for (let i = 0; i < 2; i += 1) {
      docs.push(getAll.doc[i].image);
    }
    return docs;
  };

  getAll.execute();
};
