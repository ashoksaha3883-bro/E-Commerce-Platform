import express from "express";

import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import User from "../models/User.js";

const router = express.Router();

// =====================================================
// PUBLIC ROUTES
// =====================================================

router.post("/register", registerUser);

router.post("/login", loginUser);

// =====================================================
// PROTECTED ROUTE - CURRENT USER
// =====================================================

router.get(
  "/me",
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findById(
        req.user.userId
      ).select("-password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(
        "Get Current User Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Unable to get user",
      });
    }
  }
);

export default router;