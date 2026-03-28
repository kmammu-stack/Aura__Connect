/**
 * presence.js — Routes
 * Maps endpoints to controller functions + validation middleware.
 */

const express = require("express");
const router = express.Router();

const { goOnline, getNearby, connectUsers, getConnections } = require("../controllers/presenceController");
const { validateGoOnline, validateNearby } = require("../middleware/validate");
const { authenticateToken } = require("../middleware/auth");

// POST /go-online  — user marks themselves as online
router.post("/go-online", authenticateToken, validateGoOnline, goOnline);

// GET /nearby      — fetch nearby active users
router.get("/nearby", authenticateToken, validateNearby, getNearby);

router.post("/connect", authenticateToken, connectUsers);
router.get("/connections", authenticateToken, getConnections);

module.exports = router;
