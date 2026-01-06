import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
} from "../controllers/projectController.js";

const router = express.Router();

// PUBLIC ROUTES
router.get("/", getProjects);
router.get("/:id", getProjectById);

export default router;
