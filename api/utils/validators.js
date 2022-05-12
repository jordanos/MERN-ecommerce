const Joi = require('joi');
const CustomError = require('./CustomError');
const Feed = require('../models/Feed');
const User = require('../models/User');

// schema options
const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

const userSchema = Joi.object().keys({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string()
    .length(12)
    .pattern(/^[0-9]+$/),
  password: Joi.string().min(6),
});

const productSchema = Joi.when(Joi.ref('$method'), {
  is: 'PUT',
  then: Joi.object().keys({
    name: Joi.string(),
    price: Joi.number(),
    quantity: Joi.number().integer(),
    brand: Joi.string(),
    description: Joi.string(),
    productCondition: Joi.string(),
  }),
  otherwise: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().integer().required(),
    brand: Joi.string(),
    description: Joi.string(),
    productCondition: Joi.string().required(),
  }),
});

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

const followSchema = Joi.object({
  followerId: Joi.string().hex().length(24).required(),
  followingId: Joi.string().hex().length(24).required(),
});

const packageSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
});

const adminSchema = Joi.object({
  userId: Joi.string().required(),
});

const idSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const feedSchema = Joi.object({
  text: Joi.string().required(),
});

const likeFeedSchema = Joi.object({
  feedId: Joi.string().hex().length(24).required(),
});

const messageSchema = Joi.object({
  text: Joi.string().required(),
  toId: Joi.string().hex().length(24).required(),
});

const notificationSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
  type: Joi.string(),
  userId: Joi.string().hex().length(24).required(),
});

const rateSchema = Joi.object({
  rate: Joi.number().min(1).max(5).required(),
  text: Joi.string(),
});

exports.validateUserInput = async (req) => {
  const { error } = userSchema.validate(req.body, options);
  if (error) {
    throw new CustomError(error.message, 400);
  }
};

exports.validatePackageInput = async (req) => {
  const { error } = packageSchema.validate(req.body, options);
  if (error) {
    throw new CustomError(error.message, 400);
  }
};

exports.validateProductInput = async (req) => {
  const { error } = productSchema.validate(req.body, {
    ...options,
    context: { method: req.method },
  });
  if (error) {
    throw new CustomError(error.message, 400);
  }

  // check if reference exists
  const userDoc = await User.findById(req.body.userId);
  if (!userDoc) {
    throw new CustomError('notification receiver object reference error', 400);
  }
};

exports.validateCategoryInput = (req) => {
  const { error } = categorySchema.validate(req.body, options);
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
      "sender or receiver object reference error. id doesn't exist!",
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
    throw new CustomError('product user id object reference error', 400);
  }
};

exports.validateRateInput = async (req) => {
  const { error } = rateSchema.validate(req.body, options);
  if (error) {
    throw new CustomError(error.message, 400);
  }
};
