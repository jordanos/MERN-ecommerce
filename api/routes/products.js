const router = require('express').Router();
const express = require('express');
const multer = require('multer');
const path = require('path');
const { productImagesPath } = require('../config');

/* const { GetAllProduct, CreateProdcut, GetProductById
, EditProduct, GetAllProductByUserId, DeleteProduct,
 GetAllProductCatagory, GetProductByBrand, RateProduct, 
 GetHighRatedProduct, GetLowPricedProduct, GetHighPricedProduct,
  GetRelatedProducts, GetTrendingProducts, GetHeroProducts,
   RemoveTrendingProduct, RemoveHeroProduct, CreateHeroProduct, 
   CreateTrendingProduct } = require('../controllers/productController') */

const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require('../controllers/productController');

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
 *        category:
 *          type: string
 *          description: image of user.
 *        ProductCondition:
 *          type: string
 *          description: condition of the product.
 *        brand:
 *          type: string
 *          description: brand of the product
 *        createdAt:
 *          type: string
 *          format: date
 *          description: The date of the record creation.
 *      example:
 *        name: iphone
 *        price: 20000
 *        quantity: 12
 *        productCondition: "new"
 */

/**
 *@swagger
 *tags:
 *  name: Products
 *  description: API to manage lkmklnm.
 */

router.use('/images', express.static('./src/images/'));

router
  .route('/')
  /**
   *@swagger
   *path:
   * /api/v1/products/:
   *   get:
   *     summary: Lists all the products
   *     tags: [Products]
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
  .post(createProduct);
router
  .route('/:id')
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
  .put(updateProduct)
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
  .delete(deleteProduct)
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

  .get(getProduct);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `./public/${productImagesPath}`);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({ storage });

/**
 *@swagger
 *path:
 * /api/v1/users/image/{id}:
 *   put:
 *     consumes:
 *     - multipart/form-data
 *     summary: uploads a user image.
 *     tags: [Users]
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
