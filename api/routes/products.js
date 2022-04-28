const router = require('express').Router();
const express = require('express');
const Category = require('../models/Category');

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
 
} = require('../controllers/productController');
const Product = require('../models/Product');
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
 *        - description
 *        - image
 *        - ProductCondition
 *        - brand
 *      properties:
 *        ProductId:
 *          type: String
 *          description: The auto-generated id of the user.
 *        owner:
 *          type: number
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
 *        image/png:
 *          type: string
 *          format: binary
 *          description: image of the product.
 *        category: 
 *          type: string
 *          description: image of user.
 *        ProductCondition:
 *          type: string
 *          description: condition of the product.
 *        isTrending:
 *          type: boolean
 *          description: trending status of the product
 *        brand:
 *          type: string
 *          description: brand of the product
 *        createdAt:
 *          type: string
 *          format: date
 *          description: The date of the record creation.
 */

/**
 *@swagger
 *tags:
 *  name: Products
 *  description: API to manage lkmklnm.
 */

router.use('/images', express.static('./src/images/'));

router.route('/')
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
router.route('/:id')
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

// get products by category

router.get('/filter', async (req, res) => {
  categoryFetched = [];
  productsFetched = [];

  await Category.find({}).then((categories) => {
    categoryFetched = categories.map((category) => {
      return {
        name: category.name,
        id: category._id,
      };
    });
  return category = {
      count: categoryFetched.length,
      name: categoryFetched,
    }
  })
  .then(async()=>{
    await productModel.find().populate(category)
    .then(products => {

        productsFetched = products.map(product => {
            return product
        })

    })

   })
  .catch(err=>{
    console.log('err',err)
  }) 
  res.status(200).json({category,productsFetched});

});
// create trending product
//router.route('/trending').get(getTrendingProducts).post(createTrendingProducts);
//router.route('/trending/:id').delete(removeTrendingProduct);


//get products by descending order
router.get('/desc',async(req,res)=>{
  const query= {};
  const sort={price:-1};
  const data = Product.find(query).sort(sort);
  return data;
})
//get products by ascending order

router.get('/asc',async(req,res)=>{
  const query= {};
  const sort= {price:1};
  const data = Product.find(query).sort(sort);
 return data;
})
//rate a product


module.exports = router;
