import { Router } from "express";
import { createCustomer, getAllCustomers } from "../controllers/customer.controller";
import { getProjectsByCustomer } from "../controllers/project.controller";
const router = Router();
/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer management
 */

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer created successfully
 */

router.post("/", createCustomer);
/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     description: Fetch all customers with pagination and optional search
 *     tags: [Customers]
 *     parameters:
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
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name, email, or phone
 *     responses:
 *       200:
 *         description: List of customers
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
 *                   example: 25
 *                 totalPages:
 *                   type: number
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       address:
 *                         type: string
 *                       createdDate:
 *                         type: string
 *       500:
 *         description: Server error
 */
router.get("/", getAllCustomers);
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
export default router;
