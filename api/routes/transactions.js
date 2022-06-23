const router = require('express').Router();

const {
  getTransactions,
  createTransaction,
  getTransaction,
  completeTransactionTest,
} = require('../controllers/transactionController');
const { loginReq } = require('../middlewares/authMiddleware');
// Transactions route

/**
 *
 *@swagger
 *components:
 *  schemas:
 *    Transaction:
 *      type: object
 *      required:
 *        - amount
 *        - transactionMethodId
 *        - type
 *        - currency
 *      properties:
 *        id:
 *          type: string
 *          description: generated id of the document.
 *        userId:
 *          type: string
 *          description: user id of the transaction owner.
 *        amount:
 *          type: number
 *          description: amount to be transferred on the transaction.
 *        transactionMethodId:
 *          type: string
 *          description: transaction method model reference id.
 *        type:
 *          type: string
 *          enum: [INCOMING, OUTGOING]
 *          description: transaction type, deposit(INCOMING) or cashout/transfer(OUTGOING).
 *        currency:
 *          type: string
 *          enum: [COIN, MONEY]
 *          description: currency used in transaction.
 *        status:
 *          type: string
 *          enum: [PENDING, COMPLETED, REJECTED]
 *          description: status of transaction.
 *        createdAt:
 *          type: string
 *          format: date
 *          description: when the transaction was created.
 *      example:
 *        amount: 9.99
 *        transactionMethodId: ababe21f18121ac21c1c2a21
 *        type: OUTGOING
 *        currency: MONEY
 */

/**
 *@swagger
 *tags:
 *  name: Transactions
 *  description: API to manage transactions.
 */
router
  .route('/')
  /**
   *@swagger
   *path:
   * /api/v1/transactions/:
   *   get:
   *     summary: Lists all the Transactions
   *     tags: [Transactions]
   *     responses:
   *       "200":
   *         description: list of Transactions.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Transaction'
   */
  .get(getTransactions)

  /**
   *@swagger
   *path:
   * /api/v1/transactions/:
   *   post:
   *     summary: Creates a transaction.
   *     tags: [Transactions]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Transaction'
   *     responses:
   *       "201":
   *         description: returns data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Transaction'
   */
  .post(loginReq, createTransaction);
router
  .route('/:id')

  /**
   *@swagger
   *path:
   * /api/v1/transactions/{id}:
   *   get:
   *     summary: gets a transaction.
   *     tags: [Transactions]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The transaction id
   *     responses:
   *       "200":
   *         description: returns a transaction.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Transaction'
   */
  .get(getTransaction);

/**
 *@swagger
 *path:
 * /api/v1/transactions/{id}:
 *   put:
 *     summary: completes a transaction.
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction id
 *     responses:
 *       "200":
 *         description: returns a status.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 */
router.put('/:id', loginReq, completeTransactionTest);

module.exports = router;
