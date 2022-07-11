const express = require('express');

const {
  getHeros,
  createHero,
  getHero,
  updateHero,
  deleteHero,
} = require('../controllers/heroController');

const { getHomePage, getMyShop } = require('../controllers/appController');

const { loginReq } = require('../middlewares/authMiddleware');

const router = express.Router();

// users route

/**
 *
 *@swagger
 *components:
 *  schemas:
 *    App:
 *      type: object
 *      required:
 *      properties:
 *        id:
 *          type: String
 *          description: The auto-generated id of the user.
 *        name:
 *          type: string
 *          description: name of the user.
 *        image:
 *          type: string
 *          description: image of user.
 *        createdAt:
 *          type: string
 *          format: date
 *          description: The date of the record creation.
 *      example:
 *        name: "hero 1"
 */

/**
 *@swagger
 *tags:
 *  name: App
 *  description: API to manage app.
 */

router
  .route('/heros')
  /**
   *@swagger
   *path:
   * /api/v1/app/heros/?skip=0:
   *   get:
   *     summary: Lists all the heros
   *     tags: [App]
   *     parameters:
   *     - in: query
   *       name: skip
   *       schema:
   *         type: integer
   *       description: pagination value to skip to
   *     responses:
   *       "200":
   *         description: list of heros.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/App'
   */
  .get(getHeros)
  /**
   *@swagger
   *path:
   * /api/v1/app/heros/:
   *   post:
   *     summary: Creates a hero.
   *     tags: [App]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/App'
   *     responses:
   *       "201":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/App'
   */
  .post(createHero);

router
  .route('/heros/:id')
  /**
   *@swagger
   *path:
   * /api/v1/app/hero/{id}:
   *   get:
   *     summary: gets a hero.
   *     tags: [App]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The hero id
   *     responses:
   *       "200":
   *         description: returnes a hero.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/App'
   */
  .get(getHero)
  /**
   *@swagger
   *path:
   * /api/v1/app/heros/{id}:
   *   put:
   *     summary: edits/updates a hero.
   *     tags: [App]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The hero id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/App'
   *     responses:
   *       "200":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/App'
   */
  .put(updateHero)
  /**
   *@swagger
   *path:
   * /api/v1/app/heros/{id}:
   *   delete:
   *     summary: deletes a hero.
   *     tags: [App]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The hero id
   *     responses:
   *       "200":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/App'
   */
  .delete(deleteHero);

/**
 *@swagger
 *path:
 * /api/v1/app/homepage:
 *   get:
 *     summary: homepage
 *     tags: [App]
 *     responses:
 *       "200":
 *         description: homepage.
 */
router.get('/homepage', loginReq, getHomePage);

/**
 *@swagger
 *path:
 * /api/v1/app/myshop:
 *   get:
 *     summary: myshop
 *     tags: [App]
 *     responses:
 *       "200":
 *         description: myshop page.
 */
router.get('/myshop', loginReq, getMyShop);

module.exports = router;
