const router = require('express').Router();

const {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
} = require('../controllers/transactionMethodController');

// TransactionMethods route

/**
 *
 *@swagger
 *components:
 *  schemas:
 *    TransactionMethod:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the document.
 *        name:
 *          type: string
 *          description: name of the transaction method.
 *        createdAt:
 *          type: string
 *          format: date
 *          description: The date of the record creation.
 *      example:
 *        name: Yenepay
 */

/**
 *@swagger
 *tags:
 *  name: TransactionMethods
 *  description: API to manage transaction methods.
 */

router
  .route('/')
  /**
   *@swagger
   *path:
   * /api/v1/transaction-methods/?skip=0:
   *   get:
   *     summary: Lists all the transaction methods
   *     tags: [TransactionMethods]
   *     parameters:
   *     - in: query
   *       name: skip
   *       schema:
   *         type: integer
   *       description: pagination value to skip to
   *     responses:
   *       "200":
   *         description: list of transaction methods.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/TransactionMethod'
   */
  .get(getAll)
  /**
   *@swagger
   *path:
   * /api/v1/transaction-methods/:
   *   post:
   *     summary: Creates a transaction method
   *     tags: [TransactionMethods]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/TransactionMethod'
   *     responses:
   *       "201":
   *         description: returns data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/TransactionMethod'
   */
  .post(createOne);
router
  .route('/:id')
  /**
   *@swagger
   *path:
   * /api/v1/transaction-methods/{id}:
   *   get:
   *     summary: gets a transaction method
   *     tags: [TransactionMethods]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The transaction method id
   *     responses:
   *       "200":
   *         description: returns a transaction method.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/TransactionMethod'
   */

  .get(getOne)
  /**
   *@swagger
   *path:
   * /api/v1/transaction-methods/{id}:
   *   put:
   *     summary: edits/updates a transaction.
   *     tags: [TransactionMethods]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The transaction id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/TransactionMethod'
   *     responses:
   *       "200":
   *         description: returns data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/TransactionMethod'
   */
  .put(updateOne)
  /**
   *@swagger
   *path:
   * /api/v1/transaction-methods/{id}:
   *   delete:
   *     summary: deletes a transaction.
   *     tags: [TransactionMethods]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The transaction id
   *     responses:
   *       "200":
   *         description: returns data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/TransactionMethod'
   */
  .delete(deleteOne);

module.exports = router;
