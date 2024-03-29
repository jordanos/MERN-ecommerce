/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Product = require('../models/Product');
const {
  GetAll,
  CreateOne,
  GetOne,
  DeleteOne,
  UpdateOne,
} = require('./templates');
const { validateUserInput } = require('../utils/validators');
const { hashPassword } = require('../utils/helpers');

const Admin = require('../models/Admin');

const Feed = require('../models/Feed');
const Follow = require('../models/Follow');
const { userUpload } = require('../utils/multerFormatter');
const { userImagesPath } = require('../config');
const saveImageFunction = require('../utils/saveImageFunction');
const Package = require('../models/Package');
const UserPackage = require('../models/UserPackage');
const CustomError = require('../utils/CustomError');

// const userUpload = multer({
//   storage: multer.memoryStorage(),
//   filter,
// }).single('image');

exports.getUsers = (req, res, next) => {
  const getAll = new GetAll(req, res, next, User, 'user');
  getAll.execute();
};

exports.createUser = (req, res, next) => {
  // eslint-disable-next-line consistent-return
  userUpload(req, res, async (err) => {
    if (err) {
      return next(err);
    }
    try {
      await validateUserInput(req);
    } catch (e) {
      return next(e);
    }

    let modifiedReq = req;

    if (req.file) {
      try {
        const filename = await saveImageFunction(req.file, userImagesPath);
        modifiedReq = {
          ...req,
          body: { ...req.body, image: filename },
        };
      } catch (e) {
        return next(e);
      }
    }

    // setup a vallidaion function otherwise an error will be thrown
    try {
      const userDoc = await User.create(modifiedReq.body);
      const packageDoc = await Package.findOne({ name: 'Free' });
      if (packageDoc) {
        await UserPackage.create({
          userId: userDoc.id,
          packageId: packageDoc.id,
        });
      }
      return res.status(201).send(userDoc);
    } catch (e) {
      return next(e);
    }
  });
};

exports.createAdmin = (req, res, next) => {
  const createOne = new CreateOne(req, res, next, Admin, 'admin');
  createOne.validate = validateUserInput;
  createOne.execute();
};

exports.getAdmin = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Admin, 'user');
  getAll.execute();
};

exports.getUser = (req, res, next) => {
  const getOne = new GetOne(req, res, next, User, 'user');
  getOne.transform = async () => {
    // add products count
    // add following count
    // add followers count
    // add posts count
    const { id } = req.params;
    const productsCount = await Product.countDocuments({ userId: id });
    const feedsCount = await Feed.countDocuments({ userId: id });
    const followersCount = await Follow.countDocuments({ followingId: id });
    const followingCount = await Follow.countDocuments({ followerId: id });

    getOne.doc = {
      user: getOne.doc,
      productsCount,
      feedsCount,
      followersCount,
      followingCount,
    };

    return getOne.doc;
  };
  getOne.execute();
};

exports.updateUser = async (req, res, next) => {
  // eslint-disable-next-line consistent-return
  userUpload(req, res, async (err) => {
    if (err) {
      return next(err);
    }
    try {
      await validateUserInput(req);
    } catch (e) {
      return next(e);
    }

    let modifiedReq = req;

    if (req.file) {
      try {
        const filename = await saveImageFunction(req.file, userImagesPath);
        modifiedReq = {
          ...req,
          body: { ...req.body, image: filename },
        };
      } catch (e) {
        return next(e);
      }
    }

    if (modifiedReq.body.password) {
      const validatedData = req.body;
      delete validatedData.password;
      modifiedReq = { ...req, body: validatedData };
    }

    const updateOne = new UpdateOne(modifiedReq, res, next, User, 'user');
    // setup a vallidaion function otherwise an error will be thrown
    updateOne.validate = () => {};
    // hash password if exists
    if (req.body.password) {
      req.body.password = await hashPassword(modifiedReq.body.password);
    }

    updateOne.execute();
  });
};

exports.changePassword = async (req, res, next) => {
  try {
    if (!req.body.newPassword || !req.body.oldPassword) {
      throw new CustomError('New password and old password are required', 400);
    }

    if (req.body.newPassword.length < 6) {
      throw new CustomError('Password length must be greater than 6', 400);
    }

    const { newPassword } = req.body;
    const { oldPassword } = req.body;
    const userDoc = await User.findById(req.user.id);
    if (userDoc) {
      if (!(await bcrypt.compare(oldPassword, userDoc.password))) {
        throw new CustomError('Old password is incorrect', 400);
      }

      userDoc.password = newPassword;
      userDoc.save();
    }
    res.status(200).send({ status: 'success' });
  } catch (e) {
    return next(e);
  }
};

exports.deleteUser = (req, res, next) => {
  const deleteOne = new DeleteOne(req, res, next, User, 'user');
  deleteOne.execute();
};
