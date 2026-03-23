import { Router } from "express";
import {
  createJobCard,
  getJobCardsByProject,
  deleteJobCard,
  updateJobCard,
  uploadJobCardFiles
} from "../controllers/jobCard.controller";
import { upload } from "../utils/multer";

const router = Router();
/**
 * @swagger
 * /api/job-cards:
 *   post:
 *     summary: Create job card
 *     tags: [JobCards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project:
 *                 type: string
 *               productName:
 *                 type: string
 *               description:
 *                 type: string
 *               quantity:
 *                 type: number
 *               woodType:
 *                 type: string
 *               status:
 *                 type: string
 *               siteLocation:
 *                 type: string
 *               workers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     phone:
 *                       type: string
 *               onsiteMeasurement:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     length:
 *                       type: number
 *                     breadth:
 *                       type: number
 *                     thickness:
 *                       type: number
 *               carpenterCharges:
 *                 type: number
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *               dueDate:
 *                 type: string
 */
router.post("/", createJobCard);

router.put("/:id", updateJobCard);
/**
 * @swagger
 * /api/job-cards/project/{projectId}:
 *   get:
 *     summary: Get job cards by project
 *     tags: [JobCards]
 */
router.get("/project/:projectId", getJobCardsByProject);

router.delete("/:id", deleteJobCard);
/**
 * @swagger
 * /api/job-cards/{id}/files:
 *   post:
 *     summary: Upload reference images
 *     tags: [JobCards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
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
 */
router.post("/:id/files", upload.array("files"), uploadJobCardFiles);


export default router;