const router = require('express').Router();
const { productImagesPath } = require('../config');

const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  getHeroImages,
  filterByCategories,
  getMyProducts,
} = require('../controllers/productController');

// authentication and authorization
const { loginReq } = require('../middlewares/authMiddleware');
const { authorizeReq } = require('../middlewares/authorizationMiddleware');
const { saveImage } = require('../middlewares/saveImage');
const Product = require('../models/Product');
const imageUpload = require('../utils/images');

// products route

/**
 *
 *@swagger
 *components:
 *  schemas:
 *    Product:
 *      type: object
 *      required:
 *        - name
 *        - price
 *        - quantity
 *        - ProductCondition
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the user.
 *        userId:
 *          type: string
 *          description: The owner of the product
 *        name:
 *          type: string
 *          description: name of the product.
 *        price:
 *          type: number
 *          description: price of the product.
 *        quantity:
 *          type: number
 *          description: quantity of the product.
 *        description:
 *          type: string
 *          description: description of the product.
 *        image:
 *          type: file
 *          format: binary
 *          description: image of the product.
 *        categoryId:
 *          type: string
 *          description: category of product.
 *        condition:
 *          type: string
 *          enum: [NEW, SLIGHTLY USED, USED]
 *          description: condition of the product.
 *        brand:
 *          type: string
 *          description: brand of the product
 *        tags:
 *          type: array
 *          description: tags of a product
 *        createdAt:
 *          type: string
 *          format: date
 *          description: The date of the record creation.
 *      example:
 *        name: iphone
 *        price: 20000
 *        quantity: 12
 *        condition: NEW
 *        categoryId: aababaaaababab2213
 */

/**
 *@swagger
 *tags:
 *  name: Products
 *  description: API to manage products.
 */

router
  .route('/')
  /**
   *@swagger
   *path:
   * /api/v1/products/?skip=0:
   *   get:
   *     summary: Lists all the products
   *     tags: [Products]
   *     parameters:
   *     - in: query
   *       name: skip
   *       schema:
   *         type: integer
   *       description: pagination value to skip to
   *     responses:
   *       "200":
   *         description: list of products.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   */
  .get(getProducts)
  /**
   *@swagger
   *path:
   * /api/v1/products/:
   *   post:
   *     summary: Creates a product.
   *     tags: [Products]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Product'
   *     responses:
   *       "201":
   *         description: returns data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   */
  .post(loginReq, createProduct);
router
  .route('/:id')
  /**
   *@swagger
   *path:
   * /api/v1/products/{id}:
   *   get:
   *     summary: gets a product.
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The product id
   *     responses:
   *       "200":
   *         description: returns a product.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   */

  .get(getProduct)
  /**
   *@swagger
   *path:
   * /api/v1/products/{id}:
   *   put:
   *     summary: edits/updates a product.
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The product id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Product'
   *     responses:
   *       "200":
   *         description: returns data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   */
  .put(loginReq, authorizeReq(Product), updateProduct)
  /**
   *@swagger
   *path:
   * /api/v1/products/{id}:
   *   delete:
   *     summary: deletes a product.
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The product id
   *     responses:
   *       "200":
   *         description: returns data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   */
  .delete(loginReq, authorizeReq(Product), deleteProduct);

/**
 *@swagger
 *path:
 * /api/v1/products/image/{id}:
 *   put:
 *     consumes:
 *     - multipart/form-data
 *     summary: uploads a user image.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
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
router.put(
  '/image/:id',
  loginReq,
  authorizeReq(Product),
  imageUpload().single('image'),
  saveImage(productImagesPath),
  uploadImage
);

/**
 *@swagger
 *path:
 * /api/v1/products/hero/images:
 *   get:
 *     summary: Lists all hero images of products
 *     tags: [Products]
 *     responses:
 *       "200":
 *         description: list of images.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.get('/hero/images', getHeroImages);

/**
 *@swagger
 *path:
 * /api/v1/products/filter/categories?skip=0&&cat=Shoe:
 *   get:
 *     summary: Lists all the products by filter
 *     tags: [Products]
 *     parameters:
 *     - in: query
 *       name: skip
 *       schema:
 *         type: integer
 *       description: pagination value to skip to
 *     - in: query
 *       name: cat
 *       schema:
 *         type: string
 *       description: category name
 *     responses:
 *       "200":
 *         description: list of products.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.get('/filter/categories', filterByCategories);

/**
 *@swagger
 *path:
 * /api/v1/products/my/products?skip=0:
 *   get:
 *     summary: Lists all my products
 *     tags: [Products]
 *     parameters:
 *     - in: query
 *       name: skip
 *       schema:
 *         type: integer
 *       description: pagination value to skip to
 *     responses:
 *       "200":
 *         description: list of products.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.get('/my/products', loginReq, getMyProducts);

module.exports = router;
