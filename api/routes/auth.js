const express = require('express');
const {
  login,
  logout,
  verify,
  sendOtp,
} = require('../controllers/authController');

/**
 *
 *@swagger
 *components:
 *  schemas:
 *    Auth:
 *      type: object
 *      required:
 *        - phone
 *        - password
 *      properties:
 *        phone:
 *          type: string
 *          description: phone of user.
 *        password:
 *          type: string
 *          description: password of user.
 *      example:
 *          phone: "251919804354"
 *          password: "123456"
 */

/**
 *@swagger
 *tags:
 *  name: Auth
 *  description: API to authenticate users.
 */

const router = express.Router();

/**
 *@swagger
 *path:
 * /api/v1/auth/login/:
 *   post:
 *     summary: Authenticates a user.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       "200":
 *         description: returnes data object with token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: token of the auth
 *                 user:
 *                   type: object
 *                   $ref: '#/components/schemas/User'
 */
router.route('/login').post(login);

/**
 *@swagger
 *path:
 * /api/v1/auth/logout/{token}:
 *   post:
 *     summary: logs a user out and adds token to blacklist.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The user token
 *     responses:
 *       "200":
 *         description: returns an object with success true if all goes well
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 */
router.route('/logout/:token').post(logout);

/**
 *@swagger
 *path:
 * /api/v1/auth/sendotp/{id}:
 *   post:
 *     summary: sends otp message to user
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       "200":
 *         description: returns an object with success true if all goes well
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 */
router.route('/sendotp/:id').post(sendOtp);

/**
 *@swagger
 *path:
 * /api/v1/auth/verify/{id}:
 *   post:
 *     summary: verifies a user.
 *     tags: [Auth]
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
 *             type: object
 *             properties:
 *               otp:
 *                 type: number
 *                 required: true
 *                 description: 6 digit nunmber
 *     responses:
 *       "200":
 *         description: returns an object with success true if all goes well
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 */
router.route('/verify/:id').post(verify);

module.exports = router;
