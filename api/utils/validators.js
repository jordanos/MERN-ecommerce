const Joi = require('joi');
const CustomError = require('./CustomError');
const Feed = require('../models/Feed');
const User = require('../models/User');

const userSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string()
    .length(12)
    .pattern(/^[0-9]+$/)
    .required(),
  password: Joi.string().min(6).required(),
});

const followSchema = Joi.object({
  followerId: Joi.string().hex().length(24).required(),
  followingId: Joi.string().hex().length(24).required(),
});

const adminSchema = Joi.object({
  owner: Joi.string().required(),
});

const idSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const feedSchema = Joi.object({
  text: Joi.string().required(),
  owner: Joi.string().hex().length(24).required(),
});

const likeFeedSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  feedId: Joi.string().hex().length(24).required(),
});

const messageSchema = Joi.object({
  text: Joi.string().required(),
  fromId: Joi.string().hex().length(24).required(),
  toId: Joi.string().hex().length(24).required(),
});

const notificationSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
  type: Joi.string(),
  userId: Joi.string().hex().length(24).required(),
});

// schema options
const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

exports.validateUserInput = async (req) => {
  const { error } = userSchema.validate(req.body, options);
  if (error) {
    throw new CustomError(error.message, 400);
  }
};

exports.validateFollowInput = async (req) => {
  const { error } = followSchema.validate(req.body, options);
  if (error) {
    throw new CustomError(error.message, 400);
  }
};

exports.validateAdminInput = async (req) => {
  const { error } = adminSchema.validate(req.body, options);
  if (error) {
    throw new CustomError(error.message, 400);
  }
};

exports.validateId = async (id) => {
  const { error } = idSchema.validate({ id }, options);
  if (error) {
    throw new CustomError(error.message, 400);
  }
};

exports.validateFeedInput = async (req) => {
  const { error } = feedSchema.validate(req.body, options);
  if (error) {
    throw new CustomError(error.message, 400);
  }
};

exports.validateLikeFeedInput = async (req) => {
  const { error } = likeFeedSchema.validate(req.body, options);
  if (error) {
    throw new CustomError(error.message, 400);
  }
  // check if reference exists
  const feedDoc = await Feed.findById(req.body.feedId);
  const userDoc = await User.findById(req.body.userId);
  if (!feedDoc || !userDoc) {
    throw new CustomError(
      "feed or user reference error. id doesn't exist!",
      400
    );
  }
};

exports.validateMessageInput = async (req) => {
  const { error } = messageSchema.validate(req.body, options);
  if (error) {
    throw new CustomError(error.message, 400);
  }
  // check if reference exists
  const fromDoc = await User.findById(req.body.fromId);
  const toDoc = await User.findById(req.body.toId);
  if (!fromDoc || !toDoc) {
    throw new CustomError(
      "sender or reciever object reference error. id doesn't exist!",
      400
    );
  }
};

exports.validateNotificationInput = async (req) => {
  const { error } = notificationSchema.validate(req.body, options);
  if (error) {
    throw new CustomError(error.message, 400);
  }
  // check if reference exists
  const userDoc = await User.findById(req.body.userId);
  if (!userDoc) {
    throw new CustomError('notification reciever object reference error', 400);
  }
};