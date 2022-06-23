const express = require('express');

const {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
} = require('../controllers/conversationController');

// authentication and authorization
const { loginReq } = require('../middlewares/authMiddleware');
const { authorizeReq } = require('../middlewares/authorizationMiddleware');
const Conversation = require('../models/Conversation');

const router = express.Router();

/**
 *
 *@swagger
 *components:
 *  schemas:
 *    Conversation:
 *      type: object
 *      required:
 *        - toId
 *      properties:
 *        id:
 *          type: String
 *          description: The auto-generated id of the document.
 *        fromId:
 *          type: String
 *          description: id of the sender.
 *        toId:
 *          type: String
 *          description: id of the reciever.
 *        type:
 *          type: String
 *          description: Conversation type.
 *        createdAt:
 *          type: string
 *          format: date
 *          description: The date of the record creation.
 *        updatedAt:
 *          type: string
 *          format: date
 *          description: The date of the record update.
 *      example:
 *        toId: fa124b57a700cccb21b45be1
 */

/**
 *@swagger
 *tags:
 *  name: Conversations
 *  description: API to manage Conversations.
 */

router
  .route('/')
  /**
   *@swagger
   *path:
   * /api/v1/conversations?skip=0:
   *   get:
   *     summary: Lists all the Conversations
   *     tags: [Conversations]
   *     parameters:
   *     - in: query
   *       name: skip
   *       schema:
   *         type: integer
   *       description: pagination value to skip to
   *     responses:
   *       "200":
   *         description: list of Conversations.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Conversation'
   */
  .get(loginReq, getAll)
  /**
   *@swagger
   *path:
   * /api/v1/conversations:
   *   post:
   *     summary: Creates a Conversation.
   *     tags: [Conversations]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Conversation'
   *     responses:
   *       "201":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Conversation'
   */
  .post(loginReq, createOne);

router
  .route('/:id')
  /**
   *@swagger
   *path:
   * /api/v1/conversations/{id}:
   *   get:
   *     summary: gets a Conversation object.
   *     tags: [Conversations]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The Conversation id
   *     responses:
   *       "200":
   *         description: returnes a Conversation object.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Conversation'
   */
  .get(loginReq, getOne)
  /**
   *@swagger
   *path:
   * /api/v1/conversations/{id}:
   *   put:
   *     summary: edits/updates a Conversation.
   *     tags: [Conversations]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The Conversation id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Conversation'
   *     responses:
   *       "200":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Conversation'
   */
  .put(loginReq, authorizeReq(Conversation), updateOne)
  /**
   *@swagger
   *path:
   * /api/v1/conversations/{id}:
   *   delete:
   *     summary: deletes a Conversation.
   *     tags: [Conversations]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The Conversation id
   *     responses:
   *       "200":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Conversation'
   */
  .delete(loginReq, authorizeReq(Conversation), deleteOne);

module.exports = router;
