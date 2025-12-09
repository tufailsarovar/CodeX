import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import downloadRoutes from "./routes/downloadRoutes.js";

dotenv.config();
console.log("MONGO_URI from env:", process.env.MONGO_URI?.slice(0, 40) + "...");
const app = express();
const PORT = process.env.PORT || 5000;

// DB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "CodeX API running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/download", downloadRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || "Server error"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
