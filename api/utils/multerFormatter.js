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

exports.userUpload = multer({
  storage: multer.memoryStorage(),
  filter,
}).single('image');

exports.productUpload = multer({
  storage: multer.memoryStorage(),
  filter,
}).array('images');
