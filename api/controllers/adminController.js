const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');
const Product = require('../models/Product');
const Hero = require('../models/Hero');
const UserPackage = require('../models/UserPackage');

const { validateCategoryInput } = require('../utils/validators');
const { validatePackageInput } = require('../utils/validators');

const CustomError = require('../utils/CustomError');
const { GetAll, CreateOne } = require('./templates');
const {
  populateCategory,
  populateUser,
  populateTags,
} = require('./productController');
const Package = require('../models/Package');
const Category = require('../models/Category');

exports.adminLogin = async (req, res, next) => {
  try {
    // Get req data and init required data
    const { email, password } = req.body;

    const adminDoc = await Admin.findOne({ email });
    if (!(adminDoc && (await bcrypt.compare(password, adminDoc.password)))) {
      throw new CustomError('Invalid Credentials', 401);
    }

    // Create token
    const token = jwt.sign({ id: adminDoc.id }, process.env.SECRET_KEY, {
      expiresIn: '9999d',
    });

    res.status(200).json({ token, admin: adminDoc });
  } catch (e) {
    next(e);
  }
};

exports.createAdmin = async (req, res, next) => {
  const createOne = new CreateOne(req, res, next, Admin, 'admin');
  createOne.validate = async () => {};
  createOne.execute();
};

exports.adminHomePage = async (req, res, next) => {
  try {
    const getData = async (model, now, todayStart, week, month) => {
      const today = await model.count({
        createdAt: { $gte: todayStart, $lte: now },
      });
      const thisWeek = await model.count({
        createdAt: { $gte: week, $lte: now },
      });
      const thisMonth = await model.count({
        createdAt: { $gte: month, $lte: now },
      });
      const total = await model.count();

      return { today, thisWeek, thisMonth, total };
    };

    const getDataForDays = async (model, days, now) => {
      const newDays = await Promise.all(
        days.map(async (day, i) => {
          const start = new Date();
          start.setDate(now.getDate() - i);
          const end = new Date();
          end.setDate(start.getDate() + 1);
          const count = await model.count({
            createdAt: { $gte: start, $lte: end },
          });
          return count;
        })
      );
      return newDays;
    };

    const homePage = {
      users: {
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        total: 0,
      },
      products: {
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        total: 0,
      },
      packages: {
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        total: 0,
      },
      graph: {
        users: [],
        products: [],
        packages: [],
      },
    };

    const now = new Date();
    const todayStart = new Date();
    todayStart.setDate(now.getDate() - 1);
    const weekStart = new Date();
    weekStart.setDate(now.getDate() - 7);
    const monthStart = new Date();
    monthStart.setDate(now.getDate() - 30);

    // status
    homePage.users = await getData(
      User,
      now,
      todayStart,
      weekStart,
      monthStart
    );

    homePage.products = await getData(
      Product,
      now,
      todayStart,
      weekStart,
      monthStart
    );

    homePage.packages = await getData(
      UserPackage,
      now,
      todayStart,
      weekStart,
      monthStart
    );

    const days = [1, 2, 3, 4, 5, 6, 7];
    homePage.graph.users = await getDataForDays(User, days, now);
    homePage.graph.products = await getDataForDays(Product, days, now);
    homePage.graph.packages = await getDataForDays(UserPackage, days, now);

    return res.status(200).send(homePage);
  } catch (e) {
    return next(e);
  }
};

exports.adminProducts = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Product, 'product');
  // add joins
  getAll.populate.push(populateCategory);
  getAll.populate.push(populateUser);
  getAll.populate.push(populateTags);

  getAll.execute();
};

exports.adminUsers = (req, res, next) => {
  const getAll = new GetAll(req, res, next, User, 'user');
  getAll.execute();
};

exports.adminPackages = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Package, 'package');
  getAll.execute();
};

exports.adminCreatePackage = (req, res, next) => {
  const createOne = new CreateOne(req, res, next, Package, 'package');
  createOne.validate = validatePackageInput;
  createOne.execute();
};

exports.adminHeros = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Hero, 'hero');
  getAll.execute();
};

exports.adminCreateHero = (req, res, next) => {
  const createOne = new CreateOne(req, res, next, Hero, 'hero');
  createOne.validate = validatePackageInput;
  createOne.execute();
};

exports.adminCategories = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Category, 'category');
  getAll.execute();
};

exports.adminCreateCategory = (req, res, next) => {
  const createOne = new CreateOne(req, res, next, Category, 'category');
  createOne.validate = validateCategoryInput;
  createOne.execute();
};
