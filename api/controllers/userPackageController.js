const UserPackage = require('../models/UserPackage');
const { GetAll, GetOne } = require('./templates');
const { validateUserPackageInput } = require('../utils/validators');
const User = require('../models/User');
const CustomError = require('../utils/CustomError');
const Package = require('../models/Package');
const Transaction = require('../models/Transaction');
const { completeTransaction } = require('./transactionController');

const populateUser = { path: 'userId', select: 'firstName lastName' };
const populatePackage = {
  path: 'packageId',
  select: 'name price expiresAfter',
};

exports.getUserPackages = (req, res, next) => {
  const getAll = new GetAll(req, res, next, UserPackage, 'UserPackage');
  const { active } = req.query;
  if (active) {
    getAll.filter = { userId: req.user.id, isActive: active === 'true' };
  } else {
    getAll.filter = { userId: req.user.id };
  }
  getAll.populate.push(populateUser);
  getAll.populate.push(populatePackage);
  getAll.execute();
};

exports.createUserPackage = async (req, res, next) => {
  try {
    // Validate for inputs
    validateUserPackageInput(req);
    // Check if user and package exists
    const userId = req.user.id;
    const { packageId } = req.body;

    const userDoc = await User.findById(userId);
    if (!userDoc) {
      throw new CustomError("User doesn't exist", 404);
    }

    const packageDoc = await Package.findById(packageId);
    if (!packageDoc) {
      throw new CustomError("Package doesn't exist", 404);
    }

    // check if user has the available balance to buy package
    if (userDoc.balance < packageDoc.price) {
      throw new CustomError('insufficient balance', 400);
    }

    // check if user has unfinished package
    const isUserPackage = await UserPackage.findOne({ isActive: true });
    if (isUserPackage) {
      throw new CustomError(
        'Dear customer, You already have an active packege.',
        400
      );
    }

    // Perform transaction
    // Create Outgoing transaction for package and user
    const packageTransaction = {
      userId,
      amount: packageDoc.price,
      transactionMethodId: 'abababababababababababab',
      type: 'OUTGOING',
      currency: 'MONEY',
    };
    const transactionDoc = await Transaction.create(packageTransaction);
    if (!transactionDoc) {
      throw CustomError('Something went wrong while creating transaction', 500);
    }

    // Update userpackages
    const userPackage = {
      userId,
      packageId,
    };

    const userPackageDoc = await UserPackage.create(userPackage);
    if (!userPackageDoc) {
      throw new CustomError(
        'Something went wrong while creating user package',
        500
      );
    }

    // Update Update user balance
    const isCompleted = await completeTransaction(transactionDoc.id);
    if (!isCompleted) {
      throw new CustomError(
        'Something went wrong while updating transaction',
        500
      );
    }

    return res.status(201).json({
      data: userPackageDoc,
    });
  } catch (e) {
    return next(e);
  }
};

exports.getUserPackage = (req, res, next) => {
  const getOne = new GetOne(req, res, next, UserPackage, 'UserPackage');
  getOne.populate.push(populateUser);
  getOne.populate.push(populatePackage);
  getOne.execute();
};
