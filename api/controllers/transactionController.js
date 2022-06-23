const Transaction = require('../models/Transaction');

const { GetAll, CreateOne, GetOne } = require('./templates');
const { validateTransactionInput } = require('../utils/validators');
const User = require('../models/User');
const CustomError = require('../utils/CustomError');

// const populateUser = { path: 'userId', select: 'name image phone' };

exports.getTransactions = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Transaction, 'Transaction');
  getAll.execute();
};

exports.completeTransaction = async (transactionId) => {
  const transactionDoc = await Transaction.findById(transactionId);
  if (!transactionDoc) {
    return false;
  }
  // Update user balance
  const userDoc = await User.findById(transactionDoc.userId);
  if (transactionDoc.type === 'INCOMING')
    userDoc.balance += transactionDoc.amount;
  else userDoc.balance -= transactionDoc.amount;
  userDoc.save();

  // update transaction
  transactionDoc.status = 'COMPLETED';
  transactionDoc.save();
  return true;
};

exports.completeTransactionTest = async (req, res, next) => {
  try {
    const isCompleted = await this.completeTransaction(req.params.id);
    if (!isCompleted) {
      throw new CustomError('Something went wrong', 500);
    }
    return res.status(200).json({
      data: 'updated',
    });
  } catch (e) {
    return next(e);
  }
};

exports.createTransaction = (req, res, next) => {
  const modfiedReq = { ...req, body: { ...req.body, userId: req.user.id } };
  const createOne = new CreateOne(
    modfiedReq,
    res,
    next,
    Transaction,
    'Transaction'
  );
  createOne.validate = validateTransactionInput;
  createOne.execute();
};

exports.getTransaction = (req, res, next) => {
  const getOne = new GetOne(req, res, next, Transaction, 'Transaction');
  getOne.execute();
};
