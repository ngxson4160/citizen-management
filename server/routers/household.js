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
