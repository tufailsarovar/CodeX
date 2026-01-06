import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    description: String,
    techStack: [String],
    price: Number,
    screenshotUrl: String,
    livePreviewUrl: String,
    zipFileUrl: String,
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
