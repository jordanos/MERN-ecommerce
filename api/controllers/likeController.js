const LikeFeed = require('../models/LikeFeed');

const { GetAll, GetOne, DeleteOne, UpdateOne } = require('./templates');
const { validateLikeFeedInput, validateId } = require('../utils/validators');
const User = require('../models/User');
const Feed = require('../models/Feed');

exports.getLikes = (req, res, next) => {
  const getAll = new GetAll(req, res, next, LikeFeed, 'Like');
  getAll.execute();
};

exports.toggleLike = async (req, res, next) => {
  try {
    // validate
    await validateLikeFeedInput(req);

    const userId = req.user.id;
    const { feedId } = req.body;

    // get feed like, if exists delete, deduct count from feed and return
    const likeDoc = await LikeFeed.findOne({ userId, feedId });
    if (likeDoc) {
      await LikeFeed.deleteOne({ id: likeDoc.id });
      await Feed.updateOne(
        { _id: likeDoc.feedId },
        { likesCount: await LikeFeed.count({ userId, feedId }) }
      );
      return res.status(200).send({ isLike: false });
    }

    // create feed like
    await LikeFeed.create({ userId, feedId });
    await Feed.updateOne(
      { _id: feedId },
      { likesCount: await LikeFeed.count({ userId, feedId }) }
    );
    return res.status(200).send({ isLike: true });
  } catch (e) {
    return next(e);
  }
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
