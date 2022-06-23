const router = require('express').Router();

const { getAll, createOne, getOne } = require('../controllers/ipnController');

// Ipn route

/**
 *
 *@swagger
 *components:
 *  schemas:
 *    Ipn:
 *      type: object
 *      required:
 *        - message
 *        - from
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the document.
 *        message:
 *          type: string
 *          description: message from the payment gateway service.
 *        from:
 *          type: string
 *          description: ipn message from.
 *        createdAt:
 *          type: string
 *          format: date
 *          description: The date of the record creation.
 *      example:
 *        message: id,name,transactionNo
 *        from: https://yenepay.com
 */

/**
 *@swagger
 *tags:
 *  name: IPN
 *  description: API to manage IPN Requests.
 */

router
  .route('/')
  /**
   *@swagger
   *path:
   * /api/v1/ipn/?skip=0:
   *   get:
   *     summary: Lists all the ipn requests
   *     tags: [IPN]
   *     parameters:
   *     - in: query
   *       name: skip
   *       schema:
   *         type: integer
   *       description: pagination value to skip to
   *     responses:
   *       "200":
   *         description: list of ipn requests
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Ipn'
   */
  .get(getAll)
  /**
   *@swagger
   *path:
   * /api/v1/ipn/:
   *   post:
   *     summary: accepts/creates ipn request
   *     tags: [IPN]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Ipn'
   *     responses:
   *       "201":
   *         description: returns data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Ipn'
   */
  .post(createOne);
router
  .route('/:id')
  /**
   *@swagger
   *path:
   * /api/v1/ipn/{id}:
   *   get:
   *     summary: gets ipn request
   *     tags: [IPN]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The Ipn id
   *     responses:
   *       "200":
   *         description: returns ipn recorded ipn request
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Ipn'
   */

  .get(getOne);

module.exports = router;
