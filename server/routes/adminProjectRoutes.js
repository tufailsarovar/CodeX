import express from "express";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { Project } from "../models/Project.js";

const router = express.Router();

/* CREATE PROJECT */
router.post("/", adminMiddleware, async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json(project);
});

/* UPDATE PROJECT */
router.put("/:id", adminMiddleware, async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(project);
});

/* DELETE PROJECT */
router.delete("/:id", adminMiddleware, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
});

export default router;
