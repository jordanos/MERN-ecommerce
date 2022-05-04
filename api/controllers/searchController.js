const Product = require('../models/Product');
const User = require('../models/User');
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
  const OrderBy = req.query.orderBy;
  if (OrderBy == null) {
    filter = { $text: { $search: `${name}` } };
  } else if (name && OrderBy === 'asc') {
    filter = { name: { $regex: `^${name}`, $options: 'i' } };
    sort = { name: 1 };
  } else if (name && OrderBy === 'desc') {
    filter = { name: { $regex: `^${name}`, $options: 'i' } };
    sort = { name: -1 };
  }

  getAll.filter = filter;
  getAll.sort = sort;
  getAll.execute();
};
