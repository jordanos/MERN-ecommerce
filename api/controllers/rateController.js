const Rate = require('../models/Rate');

const {
  GetAll,
  CreateOne,
  GetOne,
  DeleteOne,
  UpdateOne,
} = require('./templates');

const { validateRateInput } = require('../utils/validators');
const Product = require('../models/Product');

const DEFAULT_RATE = 4.9;

exports.getRatings = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Rate, 'Rate');
  getAll.execute();
};

exports.createRating = (req, res, next) => {
  const modifiedReq = { ...req, body: { ...req.body, userId: req.user.id } };
  const createOne = new CreateOne(modifiedReq, res, next, Rate, 'Rate');
  createOne.validate = validateRateInput;

  createOne.transform = async () => {
    const rates = await Rate.find({
      productId: modifiedReq.body.productId,
    }).exec();
    let sum = DEFAULT_RATE;
    rates.forEach((rate) => {
      sum += rate.rate;
    });
    await Product.findOneAndUpdate(
      { _id: modifiedReq.body.productId },
      { rate: sum / (rates.length + 1) }
    ).exec();
    return createOne.doc;
  };
  createOne.execute();
};

exports.getRating = (req, res, next) => {
  const getOne = new GetOne(req, res, next, Rate, 'Rate');
  getOne.execute();
};

exports.updateRating = (req, res, next) => {
  const updateOne = new UpdateOne(req, res, next, Rate, 'Rate');
  updateOne.validate = validateRateInput;
  updateOne.execute();
};

exports.deleteRating = (req, res, next) => {
  const deleteOne = new DeleteOne(req, res, next, Rate, 'Rate');
  deleteOne.execute();
};
