const sharp = require('sharp');
const path = require('path');

const saveImageFunction = async (file, imagePath) => {
  const filename = Date.now() + path.extname(file.originalname);

  // location: where to store resized photo
  const location = `./public${imagePath}${filename}`;
  // toFile() method stores the image on disk
  await sharp(file.buffer).resize(300, 300).toFile(location);
  return filename;
};

module.exports = saveImageFunction;
