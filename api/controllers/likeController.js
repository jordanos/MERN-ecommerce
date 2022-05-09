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
  const modfiedReq = { ...req, body: { ...req.body, userId: req.user.id } };
  const createOne = new CreateOne(modfiedReq, res, next, LikeFeed, 'Like');
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
  getAll.filter = { userId: req.params.id };
  getAll.transform = async () => {
    const ids = getAll.doc.map((doc) => [doc.feedId]);
    const docs = await Feed.find({
      _id: {
        $in: ids,
      },
    })

      .limit(getAll.req.query.limit)
      .skip(getAll.req.query.skip)
      .exec();
    return docs;
  };

  getAll.execute();
};

exports.getLikers = (req, res, next) => {
  const getAll = new GetAll(req, res, next, LikeFeed, 'Like');
  //   custom function to map Likes to users
  getAll.filter = { feedId: req.params.id };
  getAll.transform = async () => {
    const ids = getAll.doc.map((doc) => [doc.userId]);
    const docs = await User.find({
      _id: {
        $in: ids,
      },
    })
      .limit(getAll.req.query.limit)
      .skip(getAll.req.query.skip)
      .exec();
    return docs;
  };

  getAll.execute();
};

exports.isLiking = (req, res, next) => {
  const getOne = new GetOne(req, res, next, LikeFeed, 'Like');
  //   custom function to check Liking
  getOne.doMongo = async () => {
    const { userId, feedId } = getOne.req.params;
    validateId(userId);
    validateId(feedId);

    const docs = await getOne.model.find({ userId, feedId }).exec();
    getOne.doc = docs.length > 0 ? { status: true } : { status: false };
  };

  getOne.execute();
};
