const Category = require('../models/Category');
const Hero = require('../models/Hero');
const Product = require('../models/Product');
const UserPackage = require('../models/UserPackage');
const Notification = require('../models/Notification');
const {
  populateCategory,
  populateUser,
  populateTags,
} = require('./productController');

exports.getHomePage = async (req, res, next) => {
  try {
    const notificationsCount = await Notification.count({ _id: req.user.id });
    const heros = await Hero.find();
    const categories = await Category.find();
    const trendingProducts = await Product.find({
      categoryId: '62bff654706a523ec8fbf7a2',
    })
      .limit(10)
      .populate('userId')
      .populate('categoryId');
    const sportProducts = await Product.find({
      categoryId: '62bff74966153fd934c67656',
    })
      .limit(10)
      .populate('userId')
      .populate('categoryId');
    const gamingProducts = await Product.find({
      categoryId: '62bff686706a523ec8fbf7a4',
    })
      .limit(10)
      .populate('userId')
      .populate('categoryId');
    const computerProducts = await Product.find({
      categoryId: '62bff6bb706a523ec8fbf7a8',
    })
      .limit(10)
      .populate('userId')
      .populate('categoryId');

    res.status(200).send({
      notificationsCount,
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
  try {
    const userId = req.user.id;
    const products = await Product.find({ userId })
      .populate(populateCategory)
      .populate(populateUser)
      .populate(populateTags);

    const packageDoc = await UserPackage.findOne({
      userId,
      isActive: true,
    }).populate('packageId');

    const now = new Date();

    const myShop = {
      package: packageDoc
        ? {
            remainingPosts: packageDoc.packageId.maxPosts - packageDoc.posts,
            expiresAfter:
              packageDoc.packageId.expiresAfter -
              Math.ceil(
                Math.abs(packageDoc.createdAt.getTime() - now.getTime()) /
                  (1000 * 3600 * 24)
              ),
          }
        : { remainingPosts: 0, expiresAfter: 0 },
      products,
    };

    return res.status(200).send(myShop);
  } catch (e) {
    return next(e);
  }
};
