/* eslint-disable no-param-reassign */
const User = require('../models/User');
const Product = require('../models/Product');
const {
  GetAll,
  CreateOne,
  GetOne,
  DeleteOne,
  UpdateOne,
} = require('./templates');
const { validateUserInput } = require('../utils/validators');
const { hashPassword } = require('../utils/helpers');

const Admin = require('../models/Admin');

const Feed = require('../models/Feed');
const Follow = require('../models/Follow');
const { FormatPhone } = require('../utils/Formatter');

exports.getUsers = (req, res, next) => {
  const getAll = new GetAll(req, res, next, User, 'user');
  getAll.execute();
};

exports.createUser = (req, res, next) => {
  let modifiedReq = req;
  const formatPhone = new FormatPhone();
  const { phone } = req.body;
  if (phone)
    modifiedReq = {
      ...req,
      body: { ...req.body, phone: formatPhone.exec(phone) },
    };
  const createOne = new CreateOne(modifiedReq, res, next, User, 'user');
  // setup a vallidaion function otherwise an error will be thrown
  createOne.validate = validateUserInput;

  createOne.execute();
};

exports.createAdmin = (req, res, next) => {
  const createOne = new CreateOne(req, res, next, Admin, 'admin');
  createOne.validate = validateUserInput;
  createOne.execute();
};
exports.getAdmin = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Admin, 'user');
  getAll.execute();
};
exports.getUser = (req, res, next) => {
  const getOne = new GetOne(req, res, next, User, 'user');
  getOne.transform = async () => {
    // add products count
    // add following count
    // add followers count
    // add posts count
    const { id } = req.params;
    const productsCount = await Product.countDocuments({ userId: id });
    const feedsCount = await Feed.countDocuments({ userId: id });
    const followersCount = await Follow.countDocuments({ followingId: id });
    const followingCount = await Follow.countDocuments({ followerId: id });

    getOne.doc = {
      user: getOne.doc,
      productsCount,
      feedsCount,
      followersCount,
      followingCount,
    };

    return getOne.doc;
  };
  getOne.execute();
};

exports.updateUser = async (req, res, next) => {
  const formatPhone = new FormatPhone();
  const { phone } = req.body;
  if (phone)
    req = { ...req, body: { ...req.body, phone: formatPhone.exec(phone) } };

  const updateOne = new UpdateOne(req, res, next, User, 'user');
  // setup a vallidaion function otherwise an error will be thrown
  updateOne.validate = validateUserInput;
  // hash password if exists
  if (req.body.password) {
    req.body.password = await hashPassword(req.body.password);
  }

  updateOne.execute();
};

exports.deleteUser = (req, res, next) => {
  const deleteOne = new DeleteOne(req, res, next, User, 'user');
  deleteOne.execute();
};

exports.uploadImage = (req, res, next) => {
  req.body = { image: req.file.filename };
  const updateOne = new UpdateOne(req, res, next, User, 'user');
  // setup a vallidaion function otherwise an error will be thrown
  updateOne.validate = () => {};

  updateOne.execute();
};
