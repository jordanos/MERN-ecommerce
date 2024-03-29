const express = require('express');

const {
  getLikes,
  toggleLike,
  getLike,
  updateLike,
  deleteLike,
  getLikings,
  getLikers,
  isLiking,
} = require('../controllers/likeController');

// authentication and authorization
const { loginReq } = require('../middlewares/authMiddleware');
const { authorizeReq } = require('../middlewares/authorizationMiddleware');
const LikeFeed = require('../models/LikeFeed');

const router = express.Router();

/**
 *
 *@swagger
 *components:
 *  schemas:
 *    Like:
 *      type: object
 *      required:
 *        - likedObjectId
 *      properties:
 *        id:
 *          type: String
 *          description: The auto-generated id of the document.
 *        userId:
 *          type: String
 *          description: id of the user.
 *        likedObjectId:
 *          type: String
 *          description: id of the liked object.
 *        createdAt:
 *          type: string
 *          format: date
 *          description: The date of the record creation.
 *      example:
 *        likedObjectId: fa124b57a700cccb21b45be1
 */

/**
 *@swagger
 *tags:
 *  name: Likes
 *  description: API to manage Likes.
 */

router
  .route('/feeds')
  /**
   *@swagger
   *path:
   * /api/v1/likes/feeds?skip=0:
   *   get:
   *     summary: Lists all the feed likes
   *     tags: [Likes]
   *     responses:
   *       "200":
   *         description: list of likes.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Like'
   */
  .get(loginReq, getLikes)
  /**
   *@swagger
   *path:
   * /api/v1/likes/feeds:
   *   post:
   *     summary: toggles a like.
   *     tags: [Likes]
   *     parameters:
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               feedId:
   *                 type: string
   *     responses:
   *       "201":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Like'
   */
  .post(loginReq, toggleLike);

router
  .route('/feeds/:id')
  /**
   *@swagger
   *path:
   * /api/v1/likes/feeds/{id}:
   *   get:
   *     summary: gets a like object.
   *     tags: [Likes]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The like id
   *     responses:
   *       "200":
   *         description: returnes a like object.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Like'
   */
  .get(getLike)
  /**
   *@swagger
   *path:
   * /api/v1/likes/feeds/{id}:
   *   put:
   *     summary: edits/updates a like.
   *     tags: [Likes]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The like id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Like'
   *     responses:
   *       "200":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Like'
   */
  .put(loginReq, authorizeReq(LikeFeed), updateLike)
  /**
   *@swagger
   *path:
   * /api/v1/likes/feeds/{id}:
   *   delete:
   *     summary: deletes a like.
   *     tags: [Likes]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The like id
   *     responses:
   *       "200":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Like'
   */
  .delete(loginReq, authorizeReq(LikeFeed), deleteLike);

/**
 *@swagger
 *path:
 * /api/v1/likes/feeds/likings/{id}?skip=0:
 *   get:
 *     summary: Lists all feeds a user liked
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *         description: pagination value to skip to
 *     responses:
 *       "200":
 *         description: list of feeds.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feed'
 */
router.get('/feeds/likings/:id', getLikings);

/**
 *@swagger
 *path:
 * /api/v1/likes/feeds/likers/{id}?skip=0:
 *   get:
 *     summary: Lists all users who liked a feed
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The feed id
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *         description: pagination value to skip to
 *     responses:
 *       "200":
 *         description: list of users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/feeds/likers/:id', getLikers);

/**
 *@swagger
 *path:
 * /api/v1/likes/feeds/isliking/{userId}/{feedId}:
 *   get:
 *     summary: checks for like existence
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id who liked the feed
 *       - in: path
 *         name: feedId
 *         schema:
 *           type: string
 *         required: true
 *         description: The feed id which is liked
 *     responses:
 *       "200":
 *         description: status with boolean value.
 */
router.get('/feeds/isliking/:userId/:feedId', isLiking);

module.exports = router;
