const express = require('express');

const {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
} = require('../controllers/tagController');

const router = express.Router();

/**
 *
 *@swagger
 *components:
 *  schemas:
 *    Tag:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        id:
 *          type: String
 *          description: The auto-generated id of the document.
 *        name:
 *          type: String
 *          description: name of tag.
 *        createdAt:
 *          type: string
 *          format: date
 *          description: The date of the record creation.
 *      example:
 *        name: trending
 */

/**
 *@swagger
 *tags:
 *  name: Tags
 *  description: API to manage Tags.
 */

router
  .route('/')
  /**
   *@swagger
   *path:
   * /api/v1/tags?skip=0:
   *   get:
   *     summary: Lists all the tags
   *     tags: [Tags]
   *     parameters:
   *     - in: query
   *       name: skip
   *       schema:
   *         type: integer
   *       description: pagination value to skip to
   *     responses:
   *       "200":
   *         description: list of tags.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Tag'
   */
  .get(getAll)
  /**
   *@swagger
   *path:
   * /api/v1/tags:
   *   post:
   *     summary: Creates a tag.
   *     tags: [Tags]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Tag'
   *     responses:
   *       "201":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Tag'
   */
  .post(createOne);

router
  .route('/:id')
  /**
   *@swagger
   *path:
   * /api/v1/tags/{id}:
   *   get:
   *     summary: gets a tag object.
   *     tags: [Tags]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The tag id
   *     responses:
   *       "200":
   *         description: returnes a tag object.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Tag'
   */
  .get(getOne)
  /**
   *@swagger
   *path:
   * /api/v1/tags/{id}:
   *   put:
   *     summary: edits/updates a tag.
   *     tags: [Tags]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The tag id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Tag'
   *     responses:
   *       "200":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Tag'
   */
  .put(updateOne)
  /**
   *@swagger
   *path:
   * /api/v1/tags/{id}:
   *   delete:
   *     summary: deletes a tag.
   *     tags: [Tags]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The tag id
   *     responses:
   *       "200":
   *         description: returnes data object with acknowledged=true.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Tag'
   */
  .delete(deleteOne);

module.exports = router;
