const sharp = require('sharp');
const path = require('path');

const saveImageFunction = async (req, imagePath) => {
  const filename = Date.now() + path.extname(req.file.originalname);
  req.file.filename = filename;
  // location: where to store resized photo
  const location = `./public${imagePath}${filename}`;
  // toFile() method stores the image on disk
  await sharp(req.file.buffer).resize(300, 300).toFile(location);
};

module.exports = saveImageFunction;
