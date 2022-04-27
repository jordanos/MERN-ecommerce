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

const messagechema = Joi.object({
  text: Joi.string().required(),
  fromId: Joi.string().hex().length(24).required(),
  toId: Joi.string().hex().length(24).required(),
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
