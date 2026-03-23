import { Router } from "express";
import { createEstimation, deleteEstimation, updateEstimation, uploadFiles } from "../controllers/estimation.controller";
import { upload } from "../utils/multer";
import { getEstimationsByProject } from "../models/estimation.model";
const router = Router();
/**
 * @swagger
 * tags:
 *   name: Estimations
 *   description: Estimation management
 */

/**
 * @swagger
 * /api/estimations:
 *   post:
 *     summary: Create estimation
 *     tags: [Estimations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estimation'
 *     responses:
 *       201:
 *         description: Estimation created successfully
 *       500:
 *         description: Server error
 */
router.post("/", upload.array("attachments"), createEstimation);

/**
 * @swagger
 * /api/estimations/{id}:
 *   put:
 *     summary: Update estimation
 *     description: Fully update an estimation including products and components
 *     tags: [Estimations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Estimation ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estimation'
 *     responses:
 *       200:
 *         description: Estimation updated successfully
 *       404:
 *         description: Estimation not found
 *       500:
 *         description: Server error
 */
router.put("/:id", upload.array("attachments"), updateEstimation);
/**
 * @swagger
 * /api/estimations/{id}:
 *   delete:
 *     summary: Delete estimation
 *     tags: [Estimations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Estimation ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estimation deleted successfully
 *       404:
 *         description: Estimation not found
 */
router.delete("/:id", deleteEstimation);
/**
 * @swagger
 * /api/estimations/{id}/files:
 *   post:
 *     summary: Upload files for estimation
 *     tags: [Estimations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Estimation ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Files uploaded successfully
 *       404:
 *         description: Estimation not found
 */
router.post("/:id/files", upload.array("files"), uploadFiles);
/**
 * @swagger
 * /api/estimations/project/{projectId}:
 *   get:
 *     summary: Get all estimations for a project
 *     description: Returns all estimations linked to a specific project including products, components, and attachments
 *     tags: [Estimations]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of estimations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Estimation'
 *       500:
 *         description: Server error
 */
router.get("/project/:projectId", getEstimationsByProject);
export default router;
