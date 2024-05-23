import express from "express";

import * as householdController from '../controllers/household.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Household:
 *       type: object
 *       required:
 *         - headId
 *       properties:
 *         _id:
 *           type: string
 *         headId:
 *           type: integer
 *           description: Head member Id
 *         members:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               memberId:
 *                 type: integer
 *         number:
 *           type: integer
 *         apartmentNumber:
 *           type: integer
 *         place:
 *           type: string
 *         change:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               date:
 *                 type: string
 */

 /**
  * @swagger
  * tags:
  *   name: household
  *   description: Households managing API
  */

 const router = express.Router();

/**
 * @swagger
 * /household:
 *   get:
 *     summary: Return the list of all households
 *     operationId: getHousehold
 *     tags: [household]
 *     responses:
 *       200:
 *         description: The list of households
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Household'
 */
router.get('/', householdController.getHousehold);

/**
 * @swagger
 * /household:
 *   post:
 *     summary: Create a new household
 *     operationId: createHousehold
 *     tags: [household]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: integer
 *               apartmentNumber:
 *                 type: integer
 *               place:
 *                 type: string
 *     responses:
 *       201:
 *         description: Infomation of household after create successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Household'
 *       500:
 *         description: The message of errors
 */
router.post('/', householdController.createHousehold);

/**
 * @swagger
 * /household/{householdId}:
 *   put:
 *     summary: Modify information of a household
 *     operationId: editHousehold
 *     tags: [household]
 *     parameters:
 *       - in: path
 *         name: householdId
 *         schema:
 *           type: string
 *         required: true
 *         description: The household id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: integer
 *               apartmentNumber:
 *                 type: integer
 *               place:
 *                 type: string
 *     responses:
 *       200:
 *         description: Infomation of household after change successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Household'
 *       500:
 *         description: The message of errors
 */
router.put('/:householdId/', householdController.editHousehold);