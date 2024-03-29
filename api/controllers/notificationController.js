/* eslint-disable consistent-return */
const Notification = require('../models/Notification');

const {
  GetAll,
  CreateOne,
  GetOne,
  DeleteOne,
  UpdateOne,
} = require('./templates');
const { validateNotificationInput } = require('../utils/validators');

exports.getAll = async (req, res, next) => {
  // update status
  try {
    await Notification.updateMany({ userId: req.user.id }, { status: 'READ' });
  } catch (e) {
    return next(e);
  }
  const getAll = new GetAll(req, res, next, Notification, 'Notification');
  getAll.filter = { userId: req.user.id };
  getAll.populate.push('userId');
  getAll.execute();
};

exports.createOne = (req, res, next) => {
  const createOne = new CreateOne(req, res, next, Notification, 'Notification');
  // setup a vallidaion function otherwise an error will be thrown
  createOne.validate = validateNotificationInput;

  createOne.execute();
};

exports.getOne = (req, res, next) => {
  const getOne = new GetOne(req, res, next, Notification, 'Notification');
  getOne.execute();
};

exports.updateOne = (req, res, next) => {
  const updateOne = new UpdateOne(req, res, next, Notification, 'Notification');
  // setup a vallidaion function otherwise an error will be thrown
  updateOne.validate = validateNotificationInput;

  updateOne.execute();
};

exports.deleteOne = (req, res, next) => {
  const deleteOne = new DeleteOne(req, res, next, Notification, 'Notification');
  deleteOne.execute();
};
