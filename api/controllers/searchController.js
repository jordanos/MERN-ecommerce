const Product = require('../models/Product');
const User = require('../models/User');
const {
  populateCategory,
  populateUser,
  populateTags,
} = require('./productController');
const { GetAll } = require('./templates');

exports.search = (req, res, next) => {
  let getAll = new GetAll(req, res, next, Product, 'product');
  let sort = {};
  let filter = {};

  //   check for filter on query.. and search in the model specified by the filter
  if (!req.query.filter || !req.query.filter === 'user') {
    getAll = new GetAll(req, res, next, Product, 'product');
  } else if (req.query.filter === 'user') {
    getAll = new GetAll(req, res, next, User, 'user');
  }

  const name = req.query.q;
  const { price } = req.query;
  const { rate } = req.query;

  filter = { name: { $regex: `^${name}`, $options: 'i' } };
  if (price && price === 'asc') {
    sort = { ...sort, price: 1 };
  }
  if (price && price === 'desc') {
    sort = { ...sort, price: -1 };
  }
  if (rate && rate === 'asc') {
    sort = { ...sort, rate: 1 };
  }
  if (rate && rate === 'desc') {
    sort = { ...sort, rate: -1 };
  }

  getAll.filter = filter;
  getAll.sort = sort;
  getAll.populate.push(populateCategory);
  getAll.populate.push(populateUser);
  getAll.populate.push(populateTags);

  getAll.execute();
};
