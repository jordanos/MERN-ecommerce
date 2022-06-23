const { factoryYenepay } = require('../entities/ipnModel');
const Ipn = require('../models/Ipn');

const { GetAll, GetOne } = require('./templates');
const { completeTransaction } = require('./transactionController');
// const { validateIpnInput } = require('../utils/validators');

exports.getAll = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Ipn, 'Ipn');
  getAll.execute();
};

exports.createOne = async (req, res, next) => {
  try {
    // console.log(req.body);
    // send req to factory method, get Ipn model back
    const ipnModel = factoryYenepay(req);
    console.log(ipnModel);

    // add IpnModel to database
    await Ipn.create({
      body: JSON.stringify(req.body),
      from: ipnModel.from,
      amount: ipnModel.amount,
      transactionId: ipnModel.transactionId,
      status: ipnModel.status,
    });

    // complete transaction if exists
    const isComplete = await completeTransaction(ipnModel.transactionId);
    if (!isComplete) {
      return res.status(400).send();
    }
    return res.status(200).send();
  } catch (e) {
    return next(e);
  }
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
