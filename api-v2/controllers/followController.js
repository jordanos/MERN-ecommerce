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
  getAll.doMongo = async () => {
    const { id } = getAll.req.params;
    validateId(id);

    const docs = await getAll.model.find({ followingId: id }).exec();
    getAll.doc = await User.find({
      ...docs.map((doc) => ({ id: doc.followerId })),
    });
  };

  getAll.execute();
};

exports.getFollowers = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Follow, 'follow');
  //   custom function to map follows to users
  getAll.doMongo = async () => {
    const { id } = getAll.req.params;
    validateId(id);

    const docs = await getAll.model.find({ followerId: id }).exec();
    getAll.doc = await User.find(
      ...docs.map((doc) => ({ id: doc.followingId }))
    );
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
