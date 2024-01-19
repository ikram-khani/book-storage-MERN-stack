// Import necessary modules and models
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const router = express.Router();

// Route for user registration
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username or password is missing
    if (!username || !password) {
      return res.status(400).send({
        message: 'Send both username and password',
      });
    }

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ message: 'Username is already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = {
      username,
      password: hashedPassword,
    };

    const user = await User.create(newUser);

    return res.status(201).send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for user login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username or password is missing
    if (!username || !password) {
      return res.status(400).send({
        message: 'Send both username and password',
      });
    }

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    // Generate and send a JWT token
    const token = jwt.sign({ userId: user._id }, 'yourSecretKey', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
