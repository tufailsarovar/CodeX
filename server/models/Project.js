import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    description: String,
    techStack: [String],

    price: Number,
    originalPrice: Number,

    screenshotUrl: String,
    livePreviewUrl: String,

    // ✅ INDIVIDUAL FILES
    files: {
      sourceCode: String,
      ppt: String,
      documentation: String,
      fullBundle: String
    }
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
