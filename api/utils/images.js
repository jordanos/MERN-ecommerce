const multer = require('multer');

const filter = (req, file, cb) => {
  cb(null, true);
  // console.log(file);
  // if (file.mimetype.split('/')[0] === 'image') {
  //   cb(null, true);
  // } else {
  //   cb(new Error('Only images are allowed!'));
  // }
};

const imageInMemory = multer({
  storage: multer.memoryStorage(),
  fileFilter: filter,
});

const imageUpload = () => imageInMemory;

module.exports = imageUpload;
