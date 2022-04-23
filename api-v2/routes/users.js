const express = require("express");
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  //   deleteUser,
} = require("../controllers/userController");
const { loginReq } = require("../middlewares/authMiddleware");
const { authorizeUser } = require("../middlewares/authorizationMiddleware");

const router = express.Router();

/**
 *
 *@swagger
 *components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *      properties:
 *        id:
 *          type: String
 *          description: The auto-generated id of the user.
 *        name:
 *          type: string
 *          description: name of the user.
 *        email:
 *          type: string
 *          description: email of user.
 *        password:
 *          type: string
 *          description: password of user.
 *        createdAt:
 *          type: string
 *          format: date
 *          description: The date of the record creation.
 *      example:
 *        name: Abebe
 *        email: abebe@xyz.com
 */

/**
 *@swagger
 *tags:
 *  name: Users
 *  description: API to manage users.
 */

router
  .route("/")
  /**
   *@swagger
   *path:
   * /api/v1/users/:
   *   get:
   *     summary: Lists all the users
   *     tags: [Users]
   *     responses:
   *       "200":
   *         description: list of users.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   */
  .get(getUsers)
  /**
   *@swagger
   *path:
   * /api/v1/users/:
   *   post:
   *     summary: Creates a user.
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       "201":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   */
  .post(createUser);

router
  .route("/:id")
  /**
   *@swagger
   *path:
   * /api/v1/users/{id}:
   *   get:
   *     summary: gets a user.
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The user id
   *     responses:
   *       "200":
   *         description: returnes a user.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   */
  .get(getUser)
  /**
   *@swagger
   *path:
   * /api/v1/users/{id}:
   *   put:
   *     summary: edits/updates a user.
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The user id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       "200":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   */
  .put(loginReq, authorizeUser, updateUser)
  /**
   *@swagger
   *path:
   * /api/v1/users/{id}:
   *   delete:
   *     summary: deletes a user.
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The user id
   *     responses:
   *       "200":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   */
  .delete(loginReq, authorizeUser, deleteUser);

module.exports = router;
