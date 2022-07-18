/* eslint-disable consistent-return */
const Product = require('../models/Product');
const Category = require('../models/Category');

const { GetAll, GetOne, DeleteOne } = require('./templates');
const { validateProductInput } = require('../utils/validators');
const { productUpload } = require('../utils/multerFormatter');
const { productImagesPath } = require('../config');
const saveImageFunction = require('../utils/saveImageFunction');
const UserPackage = require('../models/UserPackage');

exports.populateCategory = { path: 'categoryId', select: 'name image' };
exports.populateUser = {
  path: 'userId',
  select: 'firstName lastName image phone',
};
exports.populateTags = { path: 'tags', select: 'name' };

exports.getProducts = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Product, 'product');
  // add joins
  getAll.populate.push(this.populateCategory);
  getAll.populate.push(this.populateUser);
  getAll.populate.push(this.populateTags);

  getAll.execute();
};

exports.getMyProducts = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Product, 'product');
  getAll.filter = { userId: req.user.id };
  // add joins
  getAll.populate.push(this.populateCategory);
  getAll.populate.push(this.populateUser);
  getAll.populate.push(this.populateTags);
  getAll.sort = { createdAt: -1 };

  getAll.execute();
};

exports.createProduct = async (req, res, next) => {
  // eslint-disable-next-line consistent-return
  productUpload(req, res, async (err) => {
    if (err) {
      return next(err);
    }
    let modifiedReq = { ...req, body: { ...req.body, userId: req.user.id } };

    // validate user input
    try {
      await validateProductInput(modifiedReq);
    } catch (e) {
      return next(e);
    }

    try {
      const filenames = await Promise.all(
        modifiedReq.files.map(async (file) => {
          const filename = await saveImageFunction(file, productImagesPath);
          return filename;
        })
      );

      modifiedReq = {
        ...modifiedReq,
        body: { ...modifiedReq.body, images: filenames },
      };
    } catch (e) {
      return next(e);
    }

    try {
      // create product
      const productDoc = await Product.create(modifiedReq.body);
      const doc = await Product.findById(productDoc.id)
        .populate(this.populateCategory)
        .populate(this.populateUser)
        .populate(this.populateTags);
      // add posted products count on userpackages, if max reached set isActive to false
      const userPackageDoc = await UserPackage.findOne({
        userId: req.user.id,
        isActive: true,
      }).populate('packageId');

      userPackageDoc.posts += 1;
      if (userPackageDoc.posts >= userPackageDoc.packageId.maxPosts) {
        userPackageDoc.isActive = false;
      }
      userPackageDoc.save();
      return res.status(201).send(doc);
    } catch (e) {
      return next(e);
    }
  });
};

exports.getProduct = (req, res, next) => {
  const getOne = new GetOne(req, res, next, Product, 'product');
  // add joins
  getOne.populate.push(this.populateCategory);
  getOne.populate.push(this.populateUser);
  getOne.populate.push(this.populateTags);

  getOne.execute();
};

exports.updateProduct = async (req, res, next) => {
  // eslint-disable-next-line consistent-return
  productUpload(req, res, async (err) => {
    if (err) {
      return next(err);
    }
    try {
      const modifiedReq = {
        ...req,
        body: { ...req.body, userId: req.user.id },
      };

      // validate user input

      await validateProductInput(modifiedReq);

      const productDoc = await Product.findOneAndUpdate(
        { _id: modifiedReq.params.id },
        modifiedReq.body,
        {
          new: true,
        }
      );

      const doc = await Product.findById(productDoc.id)
        .populate(this.populateCategory)
        .populate(this.populateUser)
        .populate(this.populateTags);

      return res.status(200).send(doc);
    } catch (e) {
      return next(e);
    }
  });
};

exports.deleteProduct = (req, res, next) => {
  const modfiedReq = { ...req, body: { ...req.body, userId: req.user.id } };
  const deleteOne = new DeleteOne(modfiedReq, res, next, Product, 'product');
  deleteOne.execute();
};

exports.filterByCategories = async (req, res, next) => {
  try {
    // get category id from name of category
    const { cat } = req.query;
    const catDoc = await Category.findOne({ name: cat });

    if (!catDoc) {
      return res
        .status(200)
        .send({ count: 0, hasMore: false, next: null, data: [] });
    }

    const getAll = new GetAll(req, res, next, Product, 'product');
    let sort = {};

    const { price } = req.query;
    const { rate } = req.query;

    if (price && price === 'asc') {
      sort = { ...sort, price: 1 };
    }
    if (price && price === 'desc') {
      sort = { ...sort, price: -1 };
    }
    if (rate && rate === 'asc') {
      sort = { ...sort, rate: 1 };
    }
    if (rate && rate === 'desc') {
      sort = { ...sort, rate: -1 };
    }

    getAll.filter = { categoryId: catDoc.id };
    getAll.sort = sort;
    // add joins
    getAll.populate.push(this.populateCategory);
    getAll.populate.push(this.populateUser);
    getAll.populate.push(this.populateTags);

    getAll.execute();
  } catch (e) {
    return next(e);
  }
};
