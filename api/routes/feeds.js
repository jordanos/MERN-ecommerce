const express = require('express');
const { feedImagesPath } = require('../config');

const {
  getFeeds,
  createFeed,
  getFeed,
  updateFeed,
  deleteFeed,
  uploadFeedImage,
} = require('../controllers/feedController');

// authentication and authorization
const { loginReq } = require('../middlewares/authMiddleware');
const { authorizeReq } = require('../middlewares/authorizationMiddleware');
const Feed = require('../models/Feed');
const imageUpload = require('../utils/images');

const router = express.Router();

/**
 *
 *@swagger
 *components:
 *  schemas:
 *    Feed:
 *      type: object
 *      required:
 *        - text
 *      properties:
 *        id:
 *          type: String
 *          description: The auto-generated id of the feed.
 *        text:
 *          type: string
 *          description: text of feed.
 *        image:
 *          type: string
 *          description: image of feed.
 *        owner:
 *          type: string
 *          description: user id of the feed owner
 *        createdAt:
 *          type: string
 *          format: date
 *          description: The date of the record creation.
 *      example:
 *        text: "i'm feeling good"
 */

/**
 *@swagger
 *tags:
 *  name: Feeds
 *  description: API to manage feeds.
 */

router
  .route('/')
  /**
   *@swagger
   *path:
   * /api/v1/feeds/?skip=0:
   *   get:
   *     summary: Lists all the feeds
   *     tags: [Feeds]
   *     parameters:
   *     - in: query
   *       name: skip
   *       schema:
   *         type: integer
   *       description: pagination value to skip to
   *     responses:
   *       "200":
   *         description: list of Feeds.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Feed'
   */
  .get(loginReq, getFeeds)
  /**
   *@swagger
   *path:
   * /api/v1/feeds/:
   *   post:
   *     summary: Creates a feed.
   *     tags: [Feeds]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Feed'
   *     responses:
   *       "201":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Feed'
   */
  .post(loginReq, createFeed);

router
  .route('/:id')
  /**
   *@swagger
   *path:
   * /api/v1/feeds/{id}:
   *   get:
   *     summary: gets a feed.
   *     tags: [Feeds]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The feed id
   *     responses:
   *       "200":
   *         description: returnes a feed.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Feed'
   */
  .get(getFeed)
  /**
   *@swagger
   *path:
   * /api/v1/feeds/{id}:
   *   put:
   *     summary: edits/updates a feed.
   *     tags: [Feeds]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The feed id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Feed'
   *     responses:
   *       "200":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Feed'
   */
  .put(loginReq, authorizeReq(Feed), updateFeed)
  /**
   *@swagger
   *path:
   * /api/v1/feeds/{id}:
   *   delete:
   *     summary: deletes a feed.
   *     tags: [Feeds]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The feed id
   *     responses:
   *       "200":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Feed'
   */
  .delete(loginReq, authorizeReq(Feed), deleteFeed);

/**
 *@swagger
 *path:
 * /api/v1/feeds/image/{id}:
 *   put:
 *     consumes:
 *     - multipart/form-data
 *     summary: uploads feed image.
 *     tags: [Feeds]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The feed id
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
 *               $ref: '#/components/schemas/Feed'
 */
// add validation of images for latter
router.put(
  '/image/:id',
  loginReq,
  authorizeReq(Feed),
  imageUpload(feedImagesPath).single('image'),
  uploadFeedImage
);

module.exports = router;
