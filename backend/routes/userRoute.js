const express = require("express");
const router = express.Router();
const { User } = require("../models/userModel.js");

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const oldUser = await User.findOne({ username });
    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({
      message: "New user added",
      userId: newUser._id,
      username: newUser.username,
    });
  } catch (error) {
    console.error("Error adding new user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
