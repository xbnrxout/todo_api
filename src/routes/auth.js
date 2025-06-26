const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Make sure this exists
const router = express.Router();

// POST /api/v1/auth/signup
router.post("/auth/signup", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({ username, password, role });
    console.log("SIGNUP: Plain password:", password);
    console.log("SIGNUP: Final hashed password:", newUser.password);

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/v1/auth/login
router.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);

    console.log("Stored hash:", user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { sub: user._id, role: user.role },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1h" }
    );
    console.log("LOGIN: Input password:", password);
    console.log("LOGIN: Stored hash:", user.password);

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
