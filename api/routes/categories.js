const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const { categoryImagesPath } = require('../config');
const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  uploadImage,
} = require('../controllers/categoryController');

// categories route

/**
 *
 *@swagger
 *components:
 *  schemas:
 *    Category:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        name:
 *          type: string
 *          description: name of the category.
 *        image:
 *          type: string
 *          format: binary
 *          description: image of category.
 *      example:
 *        name: "Electronics"
 */

/**
 *@swagger
 *tags:
 *  name: Categories
 *  description: API to manage products.
 */
router
  .route('/')
  /**
   *@swagger
   *path:
   * /api/v1/categories/:
   *   get:
   *     summary: Lists all the categories
   *     tags: [Categories]
   *     responses:
   *       "200":
   *         description: list of categories.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Category'
   */
  .get(getCategories)

  /**
   *@swagger
   *path:
   * /api/v1/categories/:
   *   post:
   *     summary: Creates a category.
   *     tags: [Categories]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Category'
   *     responses:
   *       "201":
   *         description: returns data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Category'
   */
  .post(createCategory);

router
  .route('/:id')
  /**
   *@swagger
   *path:
   * /api/v1/categories/{id}:
   *   put:
   *     summary: edits/updates a category.
   *     tags: [Categories]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The category id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Category'
   *     responses:
   *       "200":
   *         description: returns data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Category'
   */
  .put(updateCategory)

  /**
   *@swagger
   *path:
   * /api/v1/categories/{id}:
   *   delete:
   *     summary: deletes a category.
   *     tags: [Categories]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The category id
   *     responses:
   *       "200":
   *         description: returns data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Category'
   */
  .delete(deleteCategory)

  /**
   *@swagger
   *path:
   * /api/v1/categories/{id}:
   *   get:
   *     summary: gets a category.
   *     tags: [Categories]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The category id
   *     responses:
   *       "200":
   *         description: returns a category.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Category'
   */
  .get(getCategory);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `./public/${categoryImagesPath}`);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({ storage });

/**
 *@swagger
 *path:
 * /api/v1/categories/image/{id}:
 *   put:
 *     consumes:
 *     - multipart/form-data
 *     summary: uploads a category image.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *       - in: formData
 *         name: image
 *         type: file
 *         required: true
 *         description: image file
 *     responses:
 *       "200":
 *         description: returnes data object with acknowledged=true.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
// add validation of images for latter
router.put('/image/:id', imageUpload.single('image'), uploadImage);

module.exports = router;

module.exports = router;
