import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";


// =====================================================
// REGISTER USER
// =====================================================

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Normalize email
    const normalizedEmail = email
      .toLowerCase()
      .trim();

    // Check if user already exists
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    // Send response
    return res.status(201).json({
      success: true,
      message: "Account created successfully",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(
      "Register Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error while creating account",
    });
  }
};


// =====================================================
// LOGIN USER
// =====================================================

export const loginUser = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Normalize email
    const normalizedEmail = email
      .toLowerCase()
      .trim();

    // Find user
    const user = await User.findOne({
      email: normalizedEmail,
    });

    // User does not exist
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    // Wrong password
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }


    // =================================================
    // CREATE JWT TOKEN
    // =================================================

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );


    // =================================================
    // LOGIN SUCCESS
    // =================================================

    return res.status(200).json({
      success: true,
      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(
      "Login Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error while logging in",
    });
  }
};