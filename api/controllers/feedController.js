const Feed = require('../models/Feed');

const {
  GetAll,
  CreateOne,
  GetOne,
  DeleteOne,
  UpdateOne,
} = require('./templates');
const { validateFeedInput } = require('../utils/validators');

exports.getFeeds = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Feed, 'feed');
  getAll.sort = { createdAt: -1 };

  getAll.doMongo = async () => {
    getAll.req.query.skip = getAll.req.query.skip || 0;
    getAll.req.query.skip = parseInt(getAll.req.query.skip, 10);

    getAll.doc = await getAll.model
      .find(getAll.filter)
      // .populate('userId', 'name', 'image', 'phone')
      .sort(getAll.sort)
      .limit(getAll.req.query.limit)
      .skip(getAll.req.query.skip)
      .exec();

    const itemCount = await getAll.model.count({});
    getAll.pageCount = Math.ceil(itemCount / getAll.req.query.limit);
  };

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
