const express = require('express');
const { login } = require('../controllers/authController');

/**
 *
 *@swagger
 *components:
 *  schemas:
 *    Auth:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          description: email of user.
 *        password:
 *          type: string
 *          description: password of user.
 *      example:
 *          email: abebe@xyz.com
 *          password: 123456
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
 *               $ref: '#/components/schemas/Auth'
 */
router.route('/login').post(login);

// todo
// send otp
router.route('/verify').post();

// todo
// logout user and expire the jwt token
router.route('/logout').post();

module.exports = router;
