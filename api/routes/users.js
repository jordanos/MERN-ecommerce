const express = require('express');
const multer = require('multer');
const path = require('path');
const { userImagesPath } = require('../config');

const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  uploadImage,
  //   deleteUser,
} = require('../controllers/userController');

const { loginReq } = require('../middlewares/authMiddleware');
const { authorizeUser } = require('../middlewares/authorizationMiddleware');

const router = express.Router();

// users route

/**
 *
 *@swagger
 *components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - phone
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
 *        phone:
 *          type: string
 *          description: phone number of user.
 *        password:
 *          type: string
 *          description: password of user.
 *        address:
 *          type: string
 *          description: address of user.
 *        image/png:
 *          type: string
 *          format: binary
 *          description: image of user.
 *        status:
 *          type: string
 *          description: status of user.
 *        createdAt:
 *          type: string
 *          format: date
 *          description: The date of the record creation.
 *      example:
 *        name: "Abebe"
 *        phone: "251919803245"
 *        password: "123456"
 */

/**
 *@swagger
 *tags:
 *  name: Users
 *  description: API to manage users.
 */

router
  .route('/')
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
  .route('/:id')
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

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `./public/${userImagesPath}`);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({ storage });

/**
 *@swagger
 *path:
 * /api/v1/users/image/{id}:
 *   put:
 *     consumes:
 *     - multipart/form-data
 *     summary: uploads a user image.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *       - in: formData
 *         name: image
 *         type: file
 *         required: true
 *         description: image file
 *     responses:
 *       "200":
 *         description: returned data object with acknowledged=true.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
// add validation of images for latter

router.put('/image/:id', imageUpload.single('image'), uploadImage);

module.exports = router;
