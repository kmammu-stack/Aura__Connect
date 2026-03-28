const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey_for_hackathon";

router.post("/register", async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data.email || !data.password || !data.name) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return res.status(409).json({ error: "Email already registered" });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        
        const newUser = new User({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            interests: data.interests || [],
            mode: data.mode || "work",
            auraScore: 100,
            authProvider: data.authProvider || "email"
        });
        
        await newUser.save();
        
        const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });
        
        const user_data = {
            id: newUser._id.toString(),
            name: newUser.name,
            email: newUser.email,
            interests: newUser.interests,
            mode: newUser.mode,
            auraScore: newUser.auraScore,
            authProvider: newUser.authProvider,
            token
        };
        
        res.status(201).json(user_data);
    } catch (err) {
        console.error("Register Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data.email || !data.password) return res.status(400).json({ error: "Missing email or password" });
        
        const user = await User.findOne({ email: data.email });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });
        
        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
        
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        
        const user_data = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            interests: user.interests,
            mode: user.mode,
            auraScore: user.auraScore,
            authProvider: user.authProvider,
            token
        };
        
        res.status(200).json(user_data);
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.put("/profile", async (req, res) => {
    try {
        const data = req.body;
        const user_id = data.id;
        if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        
        const user = await User.findById(user_id);
        if (!user) return res.status(404).json({ error: "User not found" });
        
        if (data.interests) user.interests = data.interests;
        if (data.name) user.name = data.name;
        
        await user.save();
        
        const user_data = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            interests: user.interests,
            mode: user.mode,
            auraScore: user.auraScore,
            authProvider: user.authProvider
        };
        
        res.status(200).json(user_data);
    } catch (err) {
        console.error("Update Profile Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/profile/:id", async (req, res) => {
    try {
        const user_id = req.params.id;
        if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        
        const user = await User.findByIdAndDelete(user_id);
        if (!user) return res.status(404).json({ error: "User not found" });
        
        res.status(200).json({ message: "Account deleted successfully" });
    } catch (err) {
        console.error("Delete Profile Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
