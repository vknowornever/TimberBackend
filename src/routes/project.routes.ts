import { Router } from "express";
import { createProject, deleteProject, getProjectsByCustomer } from "../controllers/project.controller";
const router = Router();
/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management
 */

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer
 *               - projectName
 *             properties:
 *               customer:
 *                 type: string
 *                 description: Customer ObjectId
 *               projectName:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Project created successfully
 */

router.post("/", createProject);
/**
 * @swagger
 * /api/projects/customer/{customerId}:
 *   get:
 *     summary: Get all projects for a customer
 *     description: Fetch all projects linked to a specific customer with pagination
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         description: Customer ID
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Page number (default = 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Number of records per page (default = 10)
 *     responses:
 *       200:
 *         description: List of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 page:
 *                   type: number
 *                   example: 1
 *                 limit:
 *                   type: number
 *                   example: 10
 *                 total:
 *                   type: number
 *                   example: 5
 *                 totalPages:
 *                   type: number
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       customer:
 *                         type: string
 *                       projectName:
 *                         type: string
 *                       description:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *       500:
 *         description: Server error
 */
router.get("/customer/:customerId", getProjectsByCustomer);
router.delete("/projects/:id", deleteProject);
export default router;
