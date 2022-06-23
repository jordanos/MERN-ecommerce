const router = require('express').Router();

const {
  getUserPackages,
  createUserPackage,
  getUserPackage,
} = require('../controllers/userPackageController');
const { loginReq } = require('../middlewares/authMiddleware');
// packages route

/**
 *
 *@swagger
 *components:
 *  schemas:
 *    UserPackage:
 *      type: object
 *      required:
 *        - packageId
 *      properties:
 *        id:
 *          type: string
 *          description: id of the document.
 *        userId:
 *          type: string
 *          description: user id of the package owner.
 *        packageId:
 *          type: number
 *          description: id of package.
 *        createdAt:
 *          type: string
 *          format: date
 *          description: created at date of the package.
 *      example:
 *        packageId: "62b2bbefc9242801c729033c"
 */

/**
 *@swagger
 *tags:
 *  name: UserPackages
 *  description: API to manage package types.
 */
router
  .route('/')
  /**
   *@swagger
   *path:
   * /api/v1/user-packages/?skip=0&&active=false:
   *   get:
   *     summary: Lists all the Packages
   *     tags: [UserPackages]
   *     parameters:
   *     - in: query
   *       name: skip
   *       schema:
   *         type: integer
   *       description: pagination value to skip to
   *     - in: query
   *       name: active
   *       schema:
   *         type: boolean
   *       description: to filter only active packages
   *     responses:
   *       "200":
   *         description: list of UserPackages.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserPackage'
   */
  .get(loginReq, getUserPackages)

  /**
   *@swagger
   *path:
   * /api/v1/user-packages/:
   *   post:
   *     summary: Creates a package.
   *     tags: [UserPackages]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserPackage'
   *     responses:
   *       "201":
   *         description: returns data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserPackage'
   */
  .post(loginReq, createUserPackage);
router
  .route('/:id')

  /**
   *@swagger
   *path:
   * /api/v1/user-packages/{id}:
   *   get:
   *     summary: gets a package.
   *     tags: [UserPackages]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The package id
   *     responses:
   *       "200":
   *         description: returns a package.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserPackage'
   */
  .get(loginReq, getUserPackage);

module.exports = router;
