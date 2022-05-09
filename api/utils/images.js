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

// app.post('/', imageUploader.single('photo'), async (req, res, next) => {
//   // req.file includes the buffer
//   // path: where to store resized photo
//   const path = `./public/img/${req.file.filename}`;

//   // toFile() method stores the image on disk
//   await sharp(req.file.buffer).resize(300, 300).toFile(path);
//   next();
// });

// const storage = (imagePath) =>
//   multer.memoryStorage({
//     destination(req, file, cb) {
//       cb(null, `./public/${imagePath}`);
//     },
//     filename(req, file, cb) {
//       cb(null, Date.now() + path.extname(file.originalname));
//     },
//   });

const imageUpload = () => imageInMemory;

module.exports = imageUpload;
