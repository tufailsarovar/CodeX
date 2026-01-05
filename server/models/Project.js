import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["frontend", "mern", "other"],
      default: "other"
    },
    description: { type: String, required: true },
    techStack: [{ type: String }],
    price: { type: Number, required: true },
    screenshotUrl: { type: String },
    livePreviewUrl: { type: String },
    zipFileUrl: { type: String }, // URL/path to the zip stored e.g. on Cloud or local
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
