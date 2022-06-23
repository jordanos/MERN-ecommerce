const Ipn = require('../models/Ipn');

const { GetAll, GetOne } = require('./templates');
// const { validateIpnInput } = require('../utils/validators');

exports.getAll = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Ipn, 'Ipn');
  getAll.execute();
};

exports.createOne = (req, res, next) => {
  console.log(req.body);
  res.status(201).send();
};

exports.getOne = (req, res, next) => {
  const getOne = new GetOne(req, res, next, Ipn, 'Ipn');
  getOne.execute();
};

// exports.updateOne = (req, res, next) => {
//   const updateOne = new UpdateOne(
//     req,
//     res,
//     next,
//     Ipn,
//     'Ipn'
//   );
//   // setup a vallidaion function otherwise an error will be thrown
//   updateOne.validate = validateIpnInput;

//   updateOne.execute();
// };

// exports.deleteOne = (req, res, next) => {
//   const deleteOne = new DeleteOne(
//     req,
//     res,
//     next,
//     Ipn,
//     'Ipn'
//   );
//   deleteOne.execute();
// };
