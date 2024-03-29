const express = require('express');

const {
  getFollows,
  createFollow,
  getFollow,
  updateFollow,
  deleteFollow,
  getFollowers,
  getFollowings,
  isFollowing,
} = require('../controllers/followController');

// authentication and authorization
const { loginReq } = require('../middlewares/authMiddleware');
const { authorizeReq } = require('../middlewares/authorizationMiddleware');
const Follow = require('../models/Follow');

const router = express.Router();

/**
 *
 *@swagger
 *components:
 *  schemas:
 *    Follow:
 *      type: object
 *      required:
 *        - followingId
 *      properties:
 *        id:
 *          type: String
 *          description: The auto-generated id of the follow.
 *        followerId:
 *          type: String
 *          description: id of the follower.
 *        followingId:
 *          type: String
 *          description: id of the following.
 *        createdAt:
 *          type: string
 *          format: date
 *          description: The date of the record creation.
 *      example:
 *        followingId: fa124b57a700cccb21b45be1
 */

/**
 *@swagger
 *tags:
 *  name: Follows
 *  description: API to manage Follows.
 */

router
  .route('/')
  /**
   *@swagger
   *path:
   * /api/v1/follows/?skip=0:
   *   get:
   *     summary: Lists all the follows
   *     tags: [Follows]
   *     parameters:
   *     - in: query
   *       name: skip
   *       schema:
   *         type: integer
   *       description: pagination value to skip to
   *     responses:
   *       "200":
   *         description: list of users.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Follow'
   */
  .get(loginReq, getFollows)
  /**
   *@swagger
   *path:
   * /api/v1/follows/:
   *   post:
   *     summary: Creates a follow.
   *     tags: [Follows]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Follow'
   *     responses:
   *       "201":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Follow'
   */
  .post(loginReq, createFollow);

router
  .route('/:id')
  /**
   *@swagger
   *path:
   * /api/v1/follows/{id}:
   *   get:
   *     summary: gets a follow.
   *     tags: [Follows]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The follow id
   *     responses:
   *       "200":
   *         description: returnes a follow.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Follow'
   */
  .get(getFollow)
  /**
   *@swagger
   *path:
   * /api/v1/follows/{id}:
   *   put:
   *     summary: edits/updates a follow.
   *     tags: [Follows]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The follow id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Follow'
   *     responses:
   *       "200":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Follow'
   */
  .put(loginReq, authorizeReq(Follow), updateFollow)
  /**
   *@swagger
   *path:
   * /api/v1/follows/{id}:
   *   delete:
   *     summary: deletes a follow.
   *     tags: [Follows]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The follow id
   *     responses:
   *       "200":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Follow'
   */
  .delete(loginReq, authorizeReq(Follow), deleteFollow);

/**
 *@swagger
 *path:
 * /api/v1/follows/followings/{id}?skip=0:
 *   get:
 *     summary: Lists all the followings of a user
 *     tags: [Follows]
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
 *         description: list of users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/followings/:id', getFollowings);

/**
 *@swagger
 *path:
 * /api/v1/follows/followers/{id}?skip=0:
 *   get:
 *     summary: Lists all the followers of a user
 *     tags: [Follows]
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
 *         description: list of users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/followers/:id', getFollowers);

/**
 *@swagger
 *path:
 * /api/v1/follows/followers/{followerId}/{followingId}:
 *   get:
 *     summary: checks if users are following eachother
 *     tags: [Follows]
 *     parameters:
 *       - in: path
 *         name: followerId
 *         schema:
 *           type: string
 *         required: true
 *         description: The follower user id
 *       - in: path
 *         name: followingId
 *         schema:
 *           type: string
 *         required: true
 *         description: The following user id
 *     responses:
 *       "200":
 *         description: isFollowing with boolean value.
 */
router.get('/isfollowing/:followerId/:followingId', isFollowing);

module.exports = router;
