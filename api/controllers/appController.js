const Category = require('../models/Category');
const Hero = require('../models/Hero');
const Product = require('../models/Product');
const UserPackage = require('../models/UserPackage');
const {
  populateCategory,
  populateUser,
  populateTags,
} = require('./productController');

exports.getHomePage = async (req, res, next) => {
  try {
    const heros = await Hero.find();
    const categories = await Category.find();
    const trendingProducts = await Product.find({
      categoryId: '62bff654706a523ec8fbf7a2',
    })
      .populate('userId')
      .populate('categoryId');
    const sportProducts = await Product.find({
      categoryId: '62bff74966153fd934c67656',
    })
      .populate('userId')
      .populate('categoryId');
    const gamingProducts = await Product.find({
      categoryId: '62bff686706a523ec8fbf7a4',
    })
      .populate('userId')
      .populate('categoryId');
    const computerProducts = await Product.find({
      categoryId: '62bff6bb706a523ec8fbf7a8',
    })
      .populate('userId')
      .populate('categoryId');

    res.status(200).send({
      heros,
      categories,
      homeProducts: [
        {
          title: 'Trending Products',
          products: trendingProducts,
        },
        {
          title: 'Sports Products',
          products: sportProducts,
        },
        {
          title: 'Gaming Products',
          products: gamingProducts,
        },
        {
          title: 'Computer Products',
          products: computerProducts,
        },
      ],
    });
  } catch (e) {
    next(e);
  }
};

exports.getMyShop = async (req, res, next) => {
  const userId = req.user.id;
  const products = await Product.find({ userId })
    .populate.push(populateCategory)
    .populate.push(populateUser)
    .populate.push(populateTags);

  const package = await UserPackage.findOne({
    userId,
    isActive: true,
  }).populate('packageId');

  const myShop = {
    package,
    products,
  };
};
