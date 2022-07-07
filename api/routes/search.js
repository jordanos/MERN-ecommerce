const router = require('express').Router();

const { search } = require('../controllers/searchController');

/**
 *@swagger
 *tags:
 *  name: Search
 *  description: API to manage search.
 */

/**
 *@swagger
 *path:
 * /api/v1/search/?skip=0:
 *   get:
 *     summary: Search endpoint
 *     tags: [Search]
 *     parameters:
 *     - in: query
 *       name: skip
 *       schema:
 *         type: integer
 *       description: pagination value to skip to
 *     - in: query
 *       name: q
 *       required: true
 *       schema:
 *         type: string
 *       description: query/name to search
 *     - in: query
 *       name: price
 *       schema:
 *         type: string
 *         enum: [asc, desc]
 *       description: order by price, asc, desc
 *     - in: query
 *       name: rate
 *       schema:
 *         type: string
 *         enum: [asc, desc]
 *       description: order by rate, asc, desc
 *     responses:
 *       "200":
 *         description: list of products.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.route('/').get(search);

module.exports = router;
