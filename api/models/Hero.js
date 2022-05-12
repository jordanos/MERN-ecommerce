const mongoose = require('mongoose');
const { heroImagesPath } = require('../config');
const { formatImageUrl } = require('../utils/helpers');

const HeroSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'hero image',
    },
    image: {
      type: String,
      default: 'default_image.png',
      get: (image) => formatImageUrl(heroImagesPath, image),
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toObject: { getters: true, setters: true, virtuals: true },
    toJSON: { getters: true, setters: true, virtuals: true },
    runSettersOnQuery: true,
  }
);

module.exports = mongoose.model('Hero', HeroSchema);
