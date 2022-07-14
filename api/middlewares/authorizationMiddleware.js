/* eslint-disable no-underscore-dangle */
const { mongoose } = require('mongoose');
const Follow = require('../models/Follow');
const Message = require('../models/Message');
const Admin = require('../models/Admin');
const User = require('../models/User');
const UnauthorizedError = require('../utils/UnauthorizedError');
const Conversation = require('../models/Conversation');

exports.AuthAdminEnum = {
  read: 'READ',
  write: 'WRITE',
  addAdmin: 'ADD_ADMIN',
  removeAdmin: 'REMOVE_ADMIN',
  isSuper: 'SUPER',
};

// checks if a user is authorized to get/update thid user resource
exports.authorizeUser = (req, res, next) => {
  if (!(req.user.id === req.params.id)) return next(new UnauthorizedError());

  return next();
};

// checks if a user is eligiable to perform oprations on a task

exports.authorizeReq = function outer(model) {
  async function inner(req, res, next) {
    const doc = await model.findById(req.params.id);
    if (!doc || !doc.userId.equals(new mongoose.Types.ObjectId(req.user.id)))
      return next(new UnauthorizedError());

    return next();
  }

  async function innerUser(req, res, next) {
    const doc = await model.findById(req.params.id);
    if (!doc || !doc._id.equals(new mongoose.Types.ObjectId(req.user.id)))
      return next(new UnauthorizedError());

    return next();
  }

  async function innerMessage(req, res, next) {
    const doc = await model.findById(req.params.id);

    if (!doc || !doc.fromId.equals(new mongoose.Types.ObjectId(req.user.id)))
      return next(new UnauthorizedError());

    return next();
  }

  async function innerConversation(req, res, next) {
    const doc = await model.findById(req.params.id);
    if (
      !doc ||
      (!doc.fromId.equals(new mongoose.Types.ObjectId(req.user.id)) &&
        !doc.toId.equals(new mongoose.Types.ObjectId(req.user.id)))
    )
      return next(new UnauthorizedError());

    return next();
  }

  async function innerFollow(req, res, next) {
    const doc = await model.findById(req.params.id);
    if (
      !doc ||
      !doc.followerId.equals(new mongoose.Types.ObjectId(req.user.id))
    )
      return next(new UnauthorizedError());

    return next();
  }

  if (model === User) return innerUser;
  if (model === Message) return innerMessage;
  if (model === Follow) return innerFollow;
  if (model === Conversation) return innerConversation;

  return inner;
};

// Cheks if the user is an admin

exports.authorizeAdmin = function outer(access) {
  async function checkRead(req, res, next) {
    const doc = await Admin.findById(req.user.id);
    if (!doc || !doc.read) return next(new UnauthorizedError());

    return next();
  }

  async function checkWrite(req, res, next) {
    const doc = await Admin.findById(req.user.id);
    if (!doc || !doc.write) return next(new UnauthorizedError());

    return next();
  }

  async function checkAddAdmin(req, res, next) {
    const doc = await Admin.findById(req.user.id);
    if (!doc || !doc.addAdmin) return next(new UnauthorizedError());

    return next();
  }

  async function checkRemoveAdmin(req, res, next) {
    const doc = await Admin.findById(req.user.id);
    if (!doc || !doc.removeAdmin) return next(new UnauthorizedError());

    return next();
  }

  async function checkSuper(req, res, next) {
    const doc = await Admin.findById(req.user.id);
    if (!doc || !doc.isSuper) return next(new UnauthorizedError());

    return next();
  }

  if (access === 'READ') return checkRead;
  if (access === 'WRITE') return checkWrite;
  if (access === 'ADD_ADMIN') return checkAddAdmin;
  if (access === 'REMOVE_ADMIN') return checkRemoveAdmin;
  if (access === 'SUPER') return checkSuper;

  return checkRead;
};
