const LikeFeed = require('../models/LikeFeed');

const {
  GetAll,
  CreateOne,
  GetOne,
  DeleteOne,
  UpdateOne,
} = require('./templates');
const { validateLikeFeedInput, validateId } = require('../utils/validators');
const User = require('../models/User');
const Feed = require('../models/Feed');

exports.getLikes = (req, res, next) => {
  const getAll = new GetAll(req, res, next, LikeFeed, 'Like');
  getAll.execute();
};

exports.createLike = (req, res, next) => {
  const createOne = new CreateOne(req, res, next, LikeFeed, 'Like');
  // setup a vallidaion function otherwise an error will be thrown
  createOne.validate = validateLikeFeedInput;

  createOne.execute();
};

exports.getLike = (req, res, next) => {
  const getOne = new GetOne(req, res, next, LikeFeed, 'Like');
  getOne.execute();
};

exports.updateLike = (req, res, next) => {
  const updateOne = new UpdateOne(req, res, next, LikeFeed, 'Like');
  // setup a vallidaion function otherwise an error will be thrown
  updateOne.validate = validateLikeFeedInput;

  updateOne.execute();
};

exports.deleteLike = (req, res, next) => {
  const deleteOne = new DeleteOne(req, res, next, LikeFeed, 'Like');
  deleteOne.execute();
};

exports.getLikings = (req, res, next) => {
  const getAll = new GetAll(req, res, next, LikeFeed, 'Like');
  //   custom function to map Likes to users
  getAll.doMongo = async () => {
    const { id } = getAll.req.params;
    validateId(id);

    const docs = await getAll.model.find({ userId: id }).exec();
    // generate array of feed ids
    const ids = docs.map((doc) => [doc.feedId]);
    console.log(ids);

    getAll.doc = await Feed.find({
      _id: {
        $in: ids,
      },
    });
  };

  getAll.execute();
};

exports.getLikers = (req, res, next) => {
  const getAll = new GetAll(req, res, next, LikeFeed, 'Like');
  //   custom function to map Likes to users
  getAll.doMongo = async () => {
    const { id } = getAll.req.params;
    validateId(id);

    const docs = await getAll.model.find({ feedId: id }).exec();
    // generate array of user ids
    const ids = docs.map((doc) => [doc.userId]);

    getAll.doc = await User.find({
      _id: {
        $in: ids,
      },
    });
  };

  getAll.execute();
};

exports.isLiking = (req, res, next) => {
  const getOne = new GetOne(req, res, next, LikeFeed, 'Like');
  //   custom function to check Likeing
  getOne.doMongo = async () => {
    const { userId, feedId } = getOne.req.params;
    validateId(userId);
    validateId(feedId);

    const docs = await getOne.model.find({ userId, feedId }).exec();
    getOne.doc = docs.length > 0 ? { status: true } : { status: false };
  };

  getOne.execute();
};
