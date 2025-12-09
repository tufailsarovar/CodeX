import { Project } from "../models/Project.js";
import { Order } from "../models/Order.js";

// This assumes project.zipFileUrl is a direct URL to cloud storage
// or a local /downloads path you host statically.
export const downloadProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.user._id;

    const order = await Order.findOne({
      user: userId,
      project: projectId,
      paymentStatus: "paid"
    });

    if (!order) {
      return res.status(403).json({
        message: "You have not purchased this project or payment not completed"
      });
    }

    const project = await Project.findById(projectId);
    if (!project || !project.zipFileUrl) {
      return res.status(404).json({ message: "Download not available" });
    }

    // For now just send the URL, frontend can redirect.
    res.json({ downloadUrl: project.zipFileUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to process download" });
  }
};
