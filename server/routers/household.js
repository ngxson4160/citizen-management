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