import { Project } from "../models/Project.js";

/* =========================
   GET ALL PROJECTS
========================= */
export const getAllProjects = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = {};
    if (category) {
      filter.category = category;
    }

    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};


/* =========================
   GET PROJECT BY ID
========================= */
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Get project error:", error);
    res.status(500).json({ message: "Failed to fetch project" });
  }
};

/* =========================
   CREATE PROJECT (ADMIN)
========================= */
export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ message: "Failed to create project" });
  }
};

/* =========================
   UPDATE PROJECT (ADMIN)
========================= */
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Update project error:", error);
    res.status(500).json({ message: "Failed to update project" });
  }
};

/* =========================
   DELETE PROJECT (ADMIN)
========================= */
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({ message: "Failed to delete project" });
  }
};
