const Rate = require('../models/Rate');

const {
  GetAll,
  CreateOne,
  GetOne,
  DeleteOne,
  UpdateOne,
} = require('./templates');
// const User = require('../models/User');
// const Product = require('../models/Product');
const { validateRateInput } = require('../utils/validators');
const Product = require('../models/Product');

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
    let sum = 0;
    rates.forEach((rate) => {
      sum += rate.rate;
    });
    await Product.findOneAndUpdate(
      { id: modifiedReq.user.id },
      { rate: sum / rates.length }
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

// get ratings users to products map
/* exports.getRatingss = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Rate, 'Rate');
  getAll.filter = { userId: req.params.id };
  getAll.transform = async () => {
    const ids = getAll.doc.map((doc) => [doc.productId]);
    const docs = await Product.find({
      _id: {
        $in: ids,
      },
    })

      .limit(getAll.req.query.limit)
      .skip(getAll.req.query.skip)
      .exec();
    return docs;
  };

  getAll.execute();
}; */
