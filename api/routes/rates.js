const router = require('express').Router();
const {
  getRatings,
  createRating,
  getRating,
  updateRating,
  deleteRating,
} = require('../controllers/rateController');

const { loginReq } = require('../middlewares/authMiddleware');
const { authorizeReq } = require('../middlewares/authorizationMiddleware');
// const Product = require('../models/Product');
// const RatingReview = require('../models/RatingReview');
// Rating route

/**
 *
 *@swagger
 *components:
 *  schemas:
 *    Rate:
 *      type: object
 *      required:
 *        - rateCount
 *      properties:
 *        id:
 *          type: String
 *          description: The auto-generated id of the document.
 *        userId:
 *          type: String
 *          description: id of the user.
 *        productId:
 *         type: String
 *         description: id of the product
 *        rateCount:
 *         type: Number
 *         description: number of rates
 *      example:
 *        rateCount:3
 */

router
  .route('/')
  /**
   *@swagger
   *path:
   * /api/v1/rates?skip=0:
   *   get:
   *     summary: Lists all the product rates
   *     tags: [Rates]
   *     responses:
   *       "200":
   *         description: list of rates.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/RatingReview'
   */
  .get(getRatings)

  /**
   *@swagger
   *path:
   * /api/v1/rates:
   *   post:
   *     summary: Creates a rate.
   *     tags: [Rates]
   *     parameters:
   *     - in: query
   *       name: skip
   *       schema:
   *         type: integer
   *       description: pagination value to skip to
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               userId:
   *                 type: string
   *               productId:
   *                 type: string
   *     responses:
   *       "201":
   *         description: returns data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Rate'
   */
  .post(loginReq, createRating);

router
  .route('/:id')
  /**
   *@swagger
   *path:
   * /api/v1/rates/{id}:
   *   put:
   *     summary: edits/updates a rating.
   *     tags: [Rates]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The rate id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Rate'
   *     responses:
   *       "200":
   *         description: returns data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Rate'
   */

  .put(loginReq, authorizeReq, updateRating)
  /**
   *@swagger
   *path:
   * /api/v1/rates/{id}:
   *   delete:
   *     summary: deletes a rate.
   *     tags: [Rates]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The rate id
   *     responses:
   *       "200":
   *         description: returns data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Rate'
   */

  .delete(loginReq, authorizeReq, deleteRating)
  /**
   *@swagger
   *path:
   * /api/v1/rates/{id}:
   *   get:
   *     summary: gets a rate object.
   *     tags: [Rates]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The rate id
   *     responses:
   *       "200":
   *         description: returns a rate object.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Rate'
   */
  .get(getRating);

module.exports = router;
