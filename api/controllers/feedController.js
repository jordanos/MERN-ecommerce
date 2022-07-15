/* eslint-disable no-underscore-dangle */
const Feed = require('../models/Feed');
const LikeFeed = require('../models/LikeFeed');

const { GetAll, GetOne, DeleteOne } = require('./templates');
const { userUpload } = require('../utils/multerFormatter');
const { validateFeedInput } = require('../utils/validators');
const { feedImagesPath } = require('../config');
const saveImageFunction = require('../utils/saveImageFunction');

// populate with user data
const populateUser = {
  path: 'userId',
  select: '-password -status -isVerified -createdAt',
};

exports.getFeeds = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Feed, 'feed');
  getAll.populate.push(populateUser);
  getAll.sort = { likesCount: -1, createdAt: -1 };

  getAll.transform = async () => {
    const feeds = await Promise.all(
      getAll.doc.map(async (feed) => {
        const newFeed = {
          _id: feed._id,
          text: feed.text,
          image: feed.image,
          userId: feed.userId,
          isLiked: false,
          likesCount: feed.likesCount,
          createdAt: feed.createdAt,
          __v: feed.__v,
          id: feed.id,
        };

        const likeDoc = await LikeFeed.findOne({
          feedId: feed.id,
          userId: req.user.id,
        });
        if (likeDoc) newFeed.isLiked = true;

        return newFeed;
      })
    );
    return feeds;
  };

  getAll.execute();
};

exports.getMyFeeds = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Feed, 'feed');
  getAll.filter = { userId: req.user.id };
  getAll.populate.push(populateUser);
  getAll.sort = { likesCount: -1, createdAt: -1 };

  getAll.transform = async () => {
    const feeds = await Promise.all(
      getAll.doc.map(async (feed) => {
        const newFeed = {
          _id: feed._id,
          text: feed.text,
          image: feed.image,
          userId: feed.userId,
          isLiked: false,
          likesCount: feed.likesCount,
          createdAt: feed.createdAt,
          __v: feed.__v,
          id: feed.id,
        };

        const likeDoc = await LikeFeed.findOne({
          feedId: feed.id,
          userId: req.user.id,
        });
        if (likeDoc) newFeed.isLiked = true;

        return newFeed;
      })
    );
    return feeds;
  };
  getAll.execute();
};

exports.createFeed = (req, res, next) => {
  userUpload(req, res, async (err) => {
    if (err) {
      return next(err);
    }
    let modifiedReq = { ...req, body: { ...req.body, userId: req.user.id } };

    // validate user input
    try {
      await validateFeedInput(modifiedReq);
    } catch (e) {
      return next(e);
    }

    if (req.file) {
      try {
        const filename = await saveImageFunction(req.file, feedImagesPath);
        modifiedReq = {
          ...modifiedReq,
          body: { ...modifiedReq.body, image: filename },
        };
      } catch (e) {
        return next(e);
      }
    }

    try {
      const feed = await Feed.create(modifiedReq.body);
      const feedDoc = await Feed.findById(feed.id).populate(populateUser);
      const newFeed = {
        _id: feedDoc._id,
        text: feedDoc.text,
        image: feedDoc.image,
        userId: feedDoc.userId,
        isLiked: false,
        likesCount: feedDoc.likesCount,
        createdAt: feedDoc.createdAt,
        __v: feedDoc.__v,
        id: feedDoc.id,
      };
      return res.status(201).send(newFeed);
    } catch (e) {
      return next(e);
    }
  });
};

exports.getFeed = (req, res, next) => {
  const getOne = new GetOne(req, res, next, Feed, 'feed');
  getOne.populate.push(populateUser);
  getOne.execute();
};

exports.deleteFeed = (req, res, next) => {
  const deleteOne = new DeleteOne(req, res, next, Feed, 'feed');
  deleteOne.execute();
};
