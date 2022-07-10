const express = require('express');
const {
  adminLogin,
  createAdmin,
  adminHomePage,
  adminProducts,
  adminUsers,
  adminPackages,
  adminCreatePackage,
  adminHeros,
  adminCreateHero,
  adminCategories,
  adminCreateCategory,
} = require('../controllers/adminController');
const { adminReq } = require('../middlewares/authMiddleware');
const {
  authorizeAdmin,
  AuthAdminEnum,
} = require('../middlewares/authorizationMiddleware');

const router = express.Router();

/**
 *@swagger
 *tags:
 *  name: Admin
 *  description: API to manage admin operations.
 */

/**
 *@swagger
 *path:
 * /api/v1/admin/auth/login:
 *   post:
 *     summary: login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       "200":
 *         description: success.
 */
router.route('/auth/login').post(adminLogin);

/**
 *@swagger
 *path:
 * /api/v1/admin/auth/register:
 *   post:
 *     summary: register
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               read:
 *                 type: boolean
 *               write:
 *                 type: boolean
 *               addAdmin:
 *                 type: boolean
 *               removeAdmin:
 *                 type: boolean
 *               isSuper:
 *                 type: boolean
 *             required:
 *               - email
 *     responses:
 *       "200":
 *         description: success.
 */
router
  .route('/auth/register')
  .post(adminReq, authorizeAdmin(AuthAdminEnum.addAdmin), createAdmin);

/**
 *@swagger
 *path:
 * /api/v1/admin/app/homepage:
 *   get:
 *     summary: home page
 *     tags: [Admin]
 *     responses:
 *       "200":
 *         description: success.
 */
router.route('/app/homepage').get(adminHomePage);

/**
 *@swagger
 *path:
 * /api/v1/admin/products:
 *   get:
 *     summary: products
 *     tags: [Admin]
 *     responses:
 *       "200":
 *         description: success.
 */
router.route('/products').get(adminProducts);

/**
 *@swagger
 *path:
 * /api/v1/admin/users:
 *   get:
 *     summary: users
 *     tags: [Admin]
 *     responses:
 *       "200":
 *         description: success.
 */
router.route('/users').get(adminUsers);

/**
 *@swagger
 *path:
 * /api/v1/admin/packages:
 *   get:
 *     summary: packages
 *     tags: [Admin]
 *     responses:
 *       "200":
 *         description: success.
 */
router.route('/packages').get(adminPackages);

/**
 *@swagger
 *path:
 * /api/v1/admin/packages:
 *   post:
 *     summary: create package
 *     tags: [Admin]
 *     responses:
 *       "200":
 *         description: success.
 */
router.route('/packages').post(adminCreatePackage);

/**
 *@swagger
 *path:
 * /api/v1/admin/heros:
 *   get:
 *     summary: heros
 *     tags: [Admin]
 *     responses:
 *       "200":
 *         description: success.
 */
router.route('/heros').get(adminHeros);

/**
 *@swagger
 *path:
 * /api/v1/admin/heros:
 *   post:
 *     summary: create hero
 *     tags: [Admin]
 *     responses:
 *       "200":
 *         description: success.
 */
router.route('/heros').post(adminCreateHero);

/**
 *@swagger
 *path:
 * /api/v1/admin/categories:
 *   get:
 *     summary: categories
 *     tags: [Admin]
 *     responses:
 *       "200":
 *         description: success.
 */
router.route('/categories').get(adminCategories);

/**
 *@swagger
 *path:
 * /api/v1/admin/categories:
 *   post:
 *     summary: create category
 *     tags: [Admin]
 *     responses:
 *       "200":
 *         description: success.
 */
router.route('/categories').post(adminCreateCategory);

module.exports = router;
