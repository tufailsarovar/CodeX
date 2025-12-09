import express from "express";
import { createProject, getProjects, getProjectById } from "../controllers/projectController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", protect, adminOnly, createProject);

export default router;
