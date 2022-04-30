const multer = require('multer');
const path = require('path');

// const storage = multer.memoryStorage();

// const filter = (req, file, cb) => {
//   if (file.mimetype.split('/')[0] === 'image') {
//     cb(null, true);
//   } else {
//     cb(new Error('Only images are allowed!'));
//   }
// };

// exports.imageUploader = multer({
//   storage,
//   fileFilter: filter,
// });

// app.post('/', imageUploader.single('photo'), async (req, res, next) => {
//   // req.file includes the buffer
//   // path: where to store resized photo
//   const path = `./public/img/${req.file.filename}`;

//   // toFile() method stores the image on disk
//   await sharp(req.file.buffer).resize(300, 300).toFile(path);
//   next();
// });

const storage = (imagePath) =>
  multer.diskStorage({
    destination(req, file, cb) {
      cb(null, `./public/${imagePath}`);
    },
    filename(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

const imageUpload = (imagePath) => {
  const multerUpload = multer({ storage: storage(imagePath) });
  return multerUpload;
};

module.exports = imageUpload;
