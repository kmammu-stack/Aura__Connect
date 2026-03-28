const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const { formatUserForViewer } = require("../utils/formatUser");

// ─────────────────────────────────────────
// POST /user — Create or Update a user
// ─────────────────────────────────────────
router.post("/user", async (req, res) => {
    try {
        const { name, email, password, interests, mode, jobTitle, bio } = req.body;

        // Manual validation
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }
        if (mode && !["work", "social", "chill"].includes(mode)) {
            return res.status(400).json({ error: 'Mode must be "work", "social", or "chill"' });
        }

        if (interests && interests.length > 10) {
            return res.status(400).json({ error: "Max 10 interests allowed" });
        }

        // Upsert — update if exists, create if not
        const user = await User.findOneAndUpdate(
            { email },
            { name, email, interests, mode, jobTitle, bio },
            { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
        );

        return res.status(200).json({
            message: "User saved successfully",
            user: formatUserForViewer(user),
        });

    } catch (err) {
        // Handle duplicate email at DB level
        if (err.code === 11000) {
            return res.status(409).json({ error: "Email already exists" });
        }
        return res.status(500).json({ error: "Server error", details: err.message });
    }
});

// ─────────────────────────────────────────
// GET /user/:id — Fetch a user profile
// ─────────────────────────────────────────
router.get("/user/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Validate MongoDB ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({
            user: formatUserForViewer(user),
        });

    } catch (err) {
        return res.status(500).json({ error: "Server error", details: err.message });
    }
});

module.exports = router;