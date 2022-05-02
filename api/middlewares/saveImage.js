const sharp = require('sharp');
const path = require('path');

const saveImage = (imagePath) => {
  const save = async (req, res, next) => {
    try {
      // req.file includes the buffer
      // generate unique filename
      const filename = Date.now() + path.extname(req.file.originalname);
      req.file.filename = filename;
      // location: where to store resized photo
      const location = `./public/${imagePath}/${filename}`;
      // toFile() method stores the image on disk
      await sharp(req.file.buffer).resize(300, 300).toFile(location);
      return next();
    } catch (e) {
      return next(e);
    }
  };
  return save;
};

module.exports = saveImage;
