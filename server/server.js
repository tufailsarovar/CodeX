import dotenv from "dotenv";
dotenv.config();
// import cookieParser from "cookie-parser";
// import morgan from "morgan";
import express from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import downloadRoutes from "./routes/downloadRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";



console.log("MONGO_URI from env:", process.env.MONGO_URI?.slice(0, 40) + "...");
const app = express();
const PORT = process.env.PORT || 5000;

// DB
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "https://codex-tufail.vercel.app",
  "https://code-x-eight-murex.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow server-to-server / Postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



// Routes
app.get("/", (req, res) => {
  res.json({ message: "CodeX API running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/download", downloadRoutes);
app.use("/api/contact", contactRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || "Server error"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
