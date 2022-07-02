const Joi = require('joi');
const CustomError = require('./CustomError');
const Feed = require('../models/Feed');
const User = require('../models/User');
const Conversation = require('../models/Conversation');

// schema options
const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

const userSchema = Joi.when(Joi.ref('$method'), {
  is: 'PUT',
  then: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string()
      .length(12)
      .pattern(/^[0-9]+$/),
    password: Joi.string().min(6),
  }),
  otherwise: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email(),
    phone: Joi.string()
      .length(12)
      .pattern(/^[0-9]+$/)
      .required(),
    password: Joi.string().min(6).required(),
  }),
});

const productSchema = Joi.when(Joi.ref('$method'), {
  is: 'PUT',
  then: Joi.object().keys({
    name: Joi.string(),
    price: Joi.number(),
    brand: Joi.string(),
    description: Joi.string(),
    condition: Joi.string(),
  }),
  otherwise: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    brand: Joi.string(),
    description: Joi.string(),
    condition: Joi.string().required(),
  }),
});

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

const tagSchema = Joi.object({
  name: Joi.string().required(),
});

const followSchema = Joi.object({
  followerId: Joi.string().hex().length(24).required(),
  followingId: Joi.string().hex().length(24).required(),
});

const packageSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  maxPosts: Joi.number().required(),
  expiresAfter: Joi.number().required(),
});

const userPackageSchema = Joi.object({
  packageId: Joi.string().hex().length(24).required(),
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
  conversationId: Joi.string().hex().length(24).required(),
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

const transactionSchema = Joi.object({
  amount: Joi.number().required(),
  transactionMethodId: Joi.string().hex().length(24).required(),
  type: Joi.string().valid('INCOMING', 'OUTGOING').required(),
  currency: Joi.string().valid('COIN', 'MONEY').required(),
});

const transactionMethodSchema = Joi.object({
  name: Joi.string().required(),
});

exports.validateUserInput = async (req) => {
  const { error } = userSchema.validate(req.body, {
    ...options,
    context: { method: req.method },
  });
  if (error) {
    throw new CustomError(error.message, 400);
  }
  if (req.body.email) {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      throw new CustomError('User with that email already exists', 400);
    }
  }
};

exports.validatePackageInput = async (req) => {
  const { error } = packageSchema.validate(req.body, options);
  if (error) {
    throw new CustomError(error.message, 400);
  }
};

exports.validateUserPackageInput = async (req) => {
  const { error } = userPackageSchema.validate(req.body, options);
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

exports.validateTagInput = (req) => {
  const { error } = tagSchema.validate(req.body, options);
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
  const conversationDoc = await Conversation.findById(req.body.conversationId);
  if (!conversationDoc) {
    throw new CustomError(
      "conversation object reference error. id doesn't exist!",
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

exports.validateTransactionInput = async (req) => {
  const { error } = transactionSchema.validate(req.body, options);
  if (error) {
    throw new CustomError(error.message, 400);
  }
};

exports.validateTransactionMethodInput = async (req) => {
  const { error } = transactionMethodSchema.validate(req.body, options);
  if (error) {
    throw new CustomError(error.message, 400);
  }
};
