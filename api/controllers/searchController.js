const Product = require('../models/Product');
const User = require('../models/User');
// const { GetAll } = require('./templates');

// search sort Products
exports.getSearchedProducts = (req, res, next) => {
  const name = req.query.q;
  const OrderBy = req.query.orderBy;
  if (OrderBy == null) {
    Product.find({ $text: { $search: `${name}` } })
      .skip()
      .limit(10)
      
      .exec((err, docs) => {
        if (err) console.log(err);
        else console.log(`${name}`);
        res.status(200).json({ docs });
      });
  }
  if (name && OrderBy === 'asc') {
    Product.find({ name: { $regex: `^${name}`, $options: 'i' } })
      .sort({ name: 1 })
      .skip()
      .limit(10)
      .exec((err, docs) => {
        if (err) console.log(err);
        res.status(200).json({ docs });
      });
  } else if (name && OrderBy === 'desc') {
    Product.find({ name: { $regex: `^${name}`, $options: 'i' } })
      .sort({ name: -1 })
      .skip()
      .limit(10)
      .exec((err, docs) => {
        if (err) console.log(err);
        res.status(200).json({ docs });
      });
  }
};

// search and sort Users

exports.getSearchedUsers = (req, res, next) => {
  const name = req.query.q;
  const OrderBy = req.query.orderBy;
  if (OrderBy == null) {
    User.find({ name: { $regex: `^${name}`, $options: 'i' } })
      .skip()
      .limit(10)
      .exec((err, docs) => {
        if (err) console.log(err);
        else console.log(`${name}`);
        res.status(200).json({ docs });
      });
  }
  if (name && OrderBy === 'asc') {
    User.find({ name: { $regex: `^${name}`, $options: 'i' } })
      .sort({ name: 1 })
      .skip()
      .limit(10)
      .exec((err, docs) => {
        if (err) console.log(err);
        res.status(200).json({ docs });
      });
  } else if (name && OrderBy === 'desc') {
    User.find({ name: { $regex: `^${name}`, $options: 'i' } })
      .sort({ name: -1 })
      .skip()
      .limit(10)
      .exec((err, docs) => {
        if (err) console.log(err);
        res.status(200).json({ docs });
      });
  }
};
