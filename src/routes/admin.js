const express = require("express");
const User = require("../models/User");

const router = express.Router();

// List all users (admin only)
router.get("/users", async (req, res) => {
  const users = await User.find({}, "username role");
  res.json(users);
});

module.exports = router;
