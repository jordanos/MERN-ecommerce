const Category = require('../models/Category');
const Hero = require('../models/Hero');

const {
  GetAll,
  CreateOne,
  GetOne,
  DeleteOne,
  UpdateOne,
} = require('./templates');

exports.getHeros = (req, res, next) => {
  const getAll = new GetAll(req, res, next, Hero, 'Hero');
  getAll.execute();
};

exports.createHero = (req, res, next) => {
  const createOne = new CreateOne(req, res, next, Hero, 'Hero');
  // setup a vallidaion function otherwise an error will be thrown
  createOne.validate = () => {};

  createOne.execute();
};

exports.getHero = (req, res, next) => {
  const getOne = new GetOne(req, res, next, Hero, 'Hero');
  getOne.execute();
};

exports.updateHero = async (req, res, next) => {
  const updateOne = new UpdateOne(req, res, next, Hero, 'Hero');
  // setup a vallidaion function otherwise an error will be thrown
  updateOne.validate = () => {};

  updateOne.execute();
};

exports.deleteHero = (req, res, next) => {
  const deleteOne = new DeleteOne(req, res, next, Hero, 'Hero');
  deleteOne.execute();
};

exports.uploadImage = (req, res, next) => {
  req.body = { image: req.file.filename };
  const updateOne = new UpdateOne(req, res, next, Hero, 'Hero');
  // setup a vallidaion function otherwise an error will be thrown
  updateOne.validate = () => {};

  updateOne.execute();
};

// exports.homePage = async (req, res, next) => {
//   // getter
//   const home = {
//     heroImages: [],
//     categories: [],
//     homeProducts: [
//       {
//         title: "Trending",
//         product: {}
//       },
//     ],
//   }

//   try {
//     const heros = await Hero.find();
//     const categories = await Category.find();
//     const Trending = await Pr

//   } catch(e) {
//     next(e)
//   }
// }
