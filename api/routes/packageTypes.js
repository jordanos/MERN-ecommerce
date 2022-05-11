const router = require('express').Router();

const {
  getPackages,
  createPackage,
  getPackage,
  updatePackage,
  deletePackage,
} = require('../controllers/packageTypesController');
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
 *      properties:
 *        name:
 *          type: string
 *          description: name of the package.
 *        price:
 *          type: number
 *          description: price of the package type.
 *      example:
 *        name: "monthly"
 *        price: 599.99
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

  .delete(deletePackage)

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

  .get(getPackage);

module.exports = router;
