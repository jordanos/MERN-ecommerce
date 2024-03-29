const axios = require('axios');
const Category = require('../models/Category');
const Hero = require('../models/Hero');
const Product = require('../models/Product');
const UserPackage = require('../models/UserPackage');
const Notification = require('../models/Notification');
const App = require('../models/App');

const OneSignalConfig = {
  appId: '1a85a386-49a2-4e36-a4bb-3eae8ff48a6b',
  apiKey: 'NjUzNWVlOTEtZGIzMS00MTc2LTk2ODktODA3NGY4MGI1NTM0',
};

exports.getHomePage = async (req, res, next) => {
  try {
    const notificationsCount = await Notification.count({
      userId: req.user.id,
      status: 'SENT',
    });
    const heros = await Hero.find();
    const categories = await Category.find();
    const trendingProducts = await Product.find()
      .limit(10)
      .populate('userId')
      .populate('categoryId')
      .sort({ createdAt: -1 });
    const fashion = await Product.find({
      categoryId: '62d43e6501a7d43674ce04f4',
    })
      .limit(10)
      .populate('userId')
      .populate('categoryId')
      .sort({ createdAt: -1 });
    const electronics = await Product.find({
      categoryId: '62d43e7401a7d43674ce04f6',
    })
      .limit(10)
      .populate('userId')
      .populate('categoryId')
      .sort({ createdAt: -1 });
    const groceries = await Product.find({
      categoryId: '62d43e1c01a7d43674ce04ee',
    })
      .limit(10)
      .populate('userId')
      .populate('categoryId')
      .sort({ createdAt: -1 });

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
          title: 'Fashion',
          products: fashion,
        },
        {
          title: 'Electronics',
          products: electronics,
        },
        {
          title: 'Groceries',
          products: groceries,
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
    };

    return res.status(200).send(myShop);
  } catch (e) {
    return next(e);
  }
};

exports.createNotification = async (req, res, next) => {
  const headers = {
    // eslint-disable-next-line prefer-template
    Authorization: 'Basic' + OneSignalConfig.apiKey,
  };

  const options = {
    url: 'https://onesignal.com/api/v1/notifications',
    port: 443,
    path: '',
    method: 'POST',
    headers,
  };
  try {
    const response = await axios({
      method: options.method,
      url: options.url,
      data: {
        app_id: OneSignalConfig.appId,
        contents: { on: 'Test Push Notification' },
        included_segments: ['All'],
        content_available: true,
        small_icon: 'ic_notification_icon',
        data: {
          PushTitle: 'Notification Test',
        },
      },
      headers,
    });

    return res.status(200).send(response);
  } catch (e) {
    return next(e);
  }
};

exports.getVersion = async (req, res, next) => {
  try {
    const doc = await App.findOne();
    return res.status(200).send(doc);
  } catch (e) {
    return next(e);
  }
};
