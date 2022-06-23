const router = require('express').Router();

const {
  getPackages,
  createPackage,
  getPackage,
  updatePackage,
  deletePackage,
} = require('../controllers/packageController');
// packages route

/**
 *
 *@swagger
 *components:
 *  schemas:
 *    PackageTypes:
 *      type: object
 *      required:
 *        - name
 *        - price
 *        - expiresAfter
 *        - maxPosts
 *      properties:
 *        id:
 *          type: string
 *          description: id of the package.
 *        name:
 *          type: string
 *          description: name of the package.
 *        price:
 *          type: number
 *          description: price of the package type.
 *        maxPosts:
 *          type: number
 *          description: max posts allowed.
 *        expiresAfter:
 *          type: number
 *          description: after how many days the package will expire.
 *        image:
 *          type: string
 *          description: image of the package.
 *        createdAt:
 *          type: string
 *          format: date
 *          description: created at date of the package.
 *      example:
 *        name: "basic"
 *        price: 9.99
 *        maxPosts: 10
 *        expiresAfter: 30
 */

/**
 *@swagger
 *tags:
 *  name: Packages
 *  description: API to manage package types.
 */
router
  .route('/')
  /**
   *@swagger
   *path:
   * /api/v1/packages/:
   *   get:
   *     summary: Lists all the Packages
   *     tags: [Packages]
   *     responses:
   *       "200":
   *         description: list of packages.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PackageTypes'
   */

  .get(getPackages)

  /**
   *@swagger
   *path:
   * /api/v1/packages/:
   *   post:
   *     summary: Creates a package.
   *     tags: [Packages]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PackageTypes'
   *     responses:
   *       "201":
   *         description: returns data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PackageTypes'
   */
  .post(createPackage);
router
  .route('/:id')

  /**
   *@swagger
   *path:
   * /api/v1/packages/{id}:
   *   get:
   *     summary: gets a package.
   *     tags: [Packages]
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
   *               $ref: '#/components/schemas/PackageTypes'
   */

  .get(getPackage)

  /**
   *@swagger
   *path:
   * /api/v1/packages/{id}:
   *   put:
   *     summary: edits/updates a package.
   *     tags: [Packages]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The package id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PackageTypes'
   *     responses:
   *       "200":
   *         description: returns data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PackageTypes'
   */

  .put(updatePackage)

  /**
   *@swagger
   *path:
   * /api/v1/packages/{id}:
   *   delete:
   *     summary: deletes a package.
   *     tags: [Packages]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The package id
   *     responses:
   *       "200":
   *         description: returns data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PackageTypes'
   */

  .delete(deletePackage);

module.exports = router;
