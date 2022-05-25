const Feed = require('../models/Feed');

const {
  GetAll,
  CreateOne,
  GetOne,
  DeleteOne,
  UpdateOne,
} = require('./templates');
const { validateFeedInput } = require('../utils/validators');

// populate with user data
const populateUser = {
  path: 'userId',
  select: '-password -status -isVerified -createdAt',
};

exports.getFeeds = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Feed, 'feed');
  getAll.sort = { createdAt: -1 };
  getAll.populate.push(populateUser);
  getAll.execute();
};

exports.getMyFeeds = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Feed, 'feed');
  getAll.sort = { createdAt: -1 };
  getAll.filter = { userId: req.user.id };
  getAll.populate.push(populateUser);
  getAll.execute();
};

exports.createFeed = (req, res, next) => {
  const modfiedReq = { ...req, body: { ...req.body, userId: req.user.id } };
  const createOne = new CreateOne(modfiedReq, res, next, Feed, 'feed');
  // setup a vallidaion function otherwise an error will be thrown
  createOne.validate = validateFeedInput;

  createOne.execute();
};

exports.getFeed = (req, res, next) => {
  const getOne = new GetOne(req, res, next, Feed, 'feed');
  getOne.populate.push(populateUser);
  getOne.execute();
};

exports.updateFeed = (req, res, next) => {
  const updateOne = new UpdateOne(req, res, next, Feed, 'feed');
  // setup a vallidaion function otherwise an error will be thrown
  updateOne.validate = validateFeedInput;

  updateOne.execute();
};

exports.deleteFeed = (req, res, next) => {
  const deleteOne = new DeleteOne(req, res, next, Feed, 'feed');
  deleteOne.execute();
};

exports.uploadFeedImage = (req, res, next) => {
  req.body = { image: req.file.filename };
  const updateOne = new UpdateOne(req, res, next, Feed, 'feed');
  // setup a vallidaion function otherwise an error will be thrown
  updateOne.validate = () => {};

  updateOne.execute();
};
