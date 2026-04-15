import express from "express";
import cookieParser from "cookie-parser"; 
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({ path: "./backend/.env" });

const app = express();
const __dirname = path.resolve();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS (localhost)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.options(
  "*",
  cors({
   origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

// ✅ API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// ✅ Test route (IMPORTANT for debugging)
app.get("/", (req, res) => {
  res.send("API WORKING ✅");
});

// ✅ ONLY for production (Render)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// ✅ PORT
const PORT = process.env.PORT || 5001;

// ✅ Start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ DB connection failed:", err);
  });