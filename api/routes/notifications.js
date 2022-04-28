const express = require('express');

const {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
} = require('../controllers/notificationController');

const router = express.Router();

/**
 *
 *@swagger
 *components:
 *  schemas:
 *    Notification:
 *      type: object
 *      required:
 *        - titile
 *        - text
 *        - userId
 *      properties:
 *        id:
 *          type: String
 *          description: The auto-generated id of the document.
 *        title:
 *          type: String
 *          description: title of notification.
 *        text:
 *          type: String
 *          description: text of notification.
 *        type:
 *          type: String
 *          description: notification type, might be priority.
 *        status:
 *          type: String
 *          description: notification status read, unread.
 *        createdAt:
 *          type: string
 *          format: date
 *          description: The date of the record creation.
 *        userId:
 *          type: string
 *          description: notification reciever user id
 *      example:
 *        title: "morning"
 *        text: "first Notification from rica"
 *        userId: fa124b57a700cccb21b45be1
 */

/**
 *@swagger
 *tags:
 *  name: Notifications
 *  description: API to manage Notifications.
 */

router
  .route('/')
  /**
   *@swagger
   *path:
   * /api/v1/notifications:
   *   get:
   *     summary: Lists all the Notifications
   *     tags: [Notifications]
   *     responses:
   *       "200":
   *         description: list of Notifications.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Notification'
   */
  .get(getAll)
  /**
   *@swagger
   *path:
   * /api/v1/notifications?skip=0:
   *   post:
   *     summary: Creates a Notification.
   *     tags: [Notifications]
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
   *             $ref: '#/components/schemas/Notification'
   *     responses:
   *       "201":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Notification'
   */
  .post(createOne);

router
  .route('/:id')
  /**
   *@swagger
   *path:
   * /api/v1/notifications/{id}:
   *   get:
   *     summary: gets a Notification object.
   *     tags: [Notifications]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The Notification id
   *     responses:
   *       "200":
   *         description: returnes a Notification object.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Notification'
   */
  .get(getOne)
  /**
   *@swagger
   *path:
   * /api/v1/notifications/{id}:
   *   put:
   *     summary: edits/updates a Notification.
   *     tags: [Notifications]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The Notification id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Notification'
   *     responses:
   *       "200":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Notification'
   */
  .put(updateOne)
  /**
   *@swagger
   *path:
   * /api/v1/notifications/feeds/{id}:
   *   delete:
   *     summary: deletes a Notification.
   *     tags: [Notifications]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The Notification id
   *     responses:
   *       "200":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Notification'
   */
  .delete(deleteOne);

module.exports = router;
