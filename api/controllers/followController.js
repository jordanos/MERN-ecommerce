const Follow = require('../models/Follow');
const User = require('../models/User');
const {
  GetAll,
  CreateOne,
  GetOne,
  DeleteOne,
  UpdateOne,
} = require('./templates');
const { validateFollowInput } = require('../utils/validators');
const { validateId } = require('../utils/validators');

exports.getFollows = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Follow, 'follow');
  getAll.execute();
};

exports.createFollow = (req, res, next) => {
  const createOne = new CreateOne(req, res, next, Follow, 'follow');
  // setup a vallidaion function otherwise an error will be thrown
  createOne.validate = validateFollowInput;

  createOne.execute();
};

exports.getFollow = (req, res, next) => {
  const getOne = new GetOne(req, res, next, Follow, 'follow');
  getOne.execute();
};

exports.updateFollow = (req, res, next) => {
  const updateOne = new UpdateOne(req, res, next, Follow, 'follow');
  // setup a vallidaion function otherwise an error will be thrown
  updateOne.validate = validateFollowInput;

  updateOne.execute();
};

exports.deleteFollow = (req, res, next) => {
  const deleteOne = new DeleteOne(req, res, next, Follow, 'follow');
  deleteOne.execute();
};

exports.getFollowings = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Follow, 'follow');
  //   custom function to map follows to users
  getAll.filter = { followingId: req.params.id };
  getAll.transform = async () => {
    const ids = getAll.doc.map((doc) => [doc.followerId]);
    const docs = await User.find({
      _id: {
        $in: ids,
      },
    })
      .limit(getAll.req.query.limit)
      .skip(getAll.req.query.skip)
      .lean()
      .exec();
    return docs;
  };

  getAll.execute();
};

exports.getFollowers = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Follow, 'follow');
  //   custom function to map follows to users
  getAll.filter = { followerId: req.params.id };

  getAll.transform = async () => {
    const ids = getAll.doc.map((doc) => [doc.followingId]);
    const docs = await User.find({
      _id: {
        $in: ids,
      },
    })
      .limit(getAll.req.query.limit)
      .skip(getAll.req.query.skip)
      .lean()
      .exec();
    return docs;
  };

  getAll.execute();
};

exports.isFollowing = (req, res, next) => {
  const getOne = new GetOne(req, res, next, Follow, 'follow');
  //   custom function to check following
  getOne.doMongo = async () => {
    const { followerId, followingId } = getOne.req.params;
    validateId(followerId);
    validateId(followingId);

    const docs = await getOne.model.find({ followerId, followingId }).exec();
    getOne.doc =
      docs.length > 0 ? { isFollowing: true } : { isFollowing: false };
  };

  getOne.execute();
};
