const Product = require('../models/Product');
const Hero = require('../models/Hero');

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
