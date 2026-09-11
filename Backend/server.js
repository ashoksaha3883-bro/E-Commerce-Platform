import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoute.js";



dotenv.config();

const app = express();

// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());

app.use("/images", express.static("image"));

// ===============================
// ROUTES
// ===============================

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// ===============================
// TEST ROUTE
// ===============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Injoy Backend API is running",
  });
});

// ===============================
// MONGODB
// ===============================

connectDB();

// ===============================
// SERVER
// ===============================

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

