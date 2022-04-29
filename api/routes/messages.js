const express = require('express');

const {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
} = require('../controllers/messageController');

// authentication and authorization
const { loginReq } = require('../middlewares/authMiddleware');
const { authorizeReq } = require('../middlewares/authorizationMiddleware');
const Message = require('../models/Message');

const router = express.Router();

/**
 *
 *@swagger
 *components:
 *  schemas:
 *    Message:
 *      type: object
 *      required:
 *        - text
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
 *        text:
 *          type: String
 *          description: text of the message.
 *        type:
 *          type: String
 *          description: message type.
 *        status:
 *          type: String
 *          description: message status read, unread.
 *        createdAt:
 *          type: string
 *          format: date
 *          description: The date of the record creation.
 *      example:
 *        toId: fa124b57a700cccb21b45be1
 *        text: "hello"
 */

/**
 *@swagger
 *tags:
 *  name: Messages
 *  description: API to manage Messages.
 */

router
  .route('/')
  /**
   *@swagger
   *path:
   * /api/v1/messages?skip=0:
   *   get:
   *     summary: Lists all the messages
   *     tags: [Messages]
   *     parameters:
   *     - in: query
   *       name: skip
   *       schema:
   *         type: integer
   *       description: pagination value to skip to
   *     responses:
   *       "200":
   *         description: list of Messages.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Message'
   */
  .get(loginReq, getAll)
  /**
   *@swagger
   *path:
   * /api/v1/messages:
   *   post:
   *     summary: Creates a Message.
   *     tags: [Messages]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Message'
   *     responses:
   *       "201":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Message'
   */
  .post(loginReq, createOne);

router
  .route('/:id')
  /**
   *@swagger
   *path:
   * /api/v1/messages/{id}:
   *   get:
   *     summary: gets a Message object.
   *     tags: [Messages]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The Message id
   *     responses:
   *       "200":
   *         description: returnes a Message object.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Message'
   */
  .get(loginReq, getOne)
  /**
   *@swagger
   *path:
   * /api/v1/messages/{id}:
   *   put:
   *     summary: edits/updates a Message.
   *     tags: [Messages]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The Message id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Message'
   *     responses:
   *       "200":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Message'
   */
  .put(loginReq, authorizeReq(Message), updateOne)
  /**
   *@swagger
   *path:
   * /api/v1/messages/{id}:
   *   delete:
   *     summary: deletes a Message.
   *     tags: [Messages]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The Message id
   *     responses:
   *       "200":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Message'
   */
  .delete(loginReq, authorizeReq(Message), deleteOne);

module.exports = router;
