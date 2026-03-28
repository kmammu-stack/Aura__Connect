/**
 * presenceController.js
 * Core business logic for Aura presence features.
 */

const { upsertPresence, getAllPresence } = require("../utils/presenceStore");
const { haversineDistance, isActive } = require("../utils/geoUtils");
const { formatForNearby, isVisible } = require("../utils/visibilityFormatter");

const DEFAULT_RADIUS_METERS = 500;
const DEFAULT_EXPIRY_MINS   = 30;

// In-memory store for connections: { userId: Set<connectedUserId> }
const userConnections = new Map();

/**
 * POST /go-online
 * Body: { userId, lat, lng, name?, interests?, mode?, auraScore? }
 */
function goOnline(req, res) {
  const { userId, lat, lng, name, interests, mode, auraScore } = req.body;
  upsertPresence(userId, lat, lng, { name, interests, mode, auraScore });
  return res.status(200).json({
    success: true,
    message: `User ${userId} is now online.`,
    data: { userId, lat, lng, timestamp: Date.now() },
  });
}

/**
 * GET /nearby
 * Query: lat, lng, radius?, expiry?
 */
function getNearby(req, res) {
  const { lat, lng } = req.query;
  const radius     = parseFloat(req.query.radius) || DEFAULT_RADIUS_METERS;
  const expiryMins = parseFloat(req.query.expiry) || DEFAULT_EXPIRY_MINS;

  const nearbyUsers = getAllPresence()
    .filter((user) => isActive(user.timestamp, expiryMins))
    .filter((user) => isVisible(user))
    .reduce((acc, user) => {
      const distanceMeters = haversineDistance(lat, lng, user.lat, user.lng);
      if (distanceMeters <= radius) {
        const onlineSinceMins = Math.floor((Date.now() - user.timestamp) / 60000);
        acc.push(formatForNearby(user, Math.round(distanceMeters), onlineSinceMins));
      }
      return acc;
    }, [])
    .sort((a, b) => a.distanceMeters - b.distanceMeters);

  // Inject Hackathon Demo Users if none found
  if (nearbyUsers.length === 0 && lat && lng) {
      nearbyUsers.push(
          formatForNearby({ userId: 'v_bot1', name: 'Alex (Builder)', interests: ['AI', 'Startups', 'TypeScript'], mode: 'work', auraScore: 98, lat: parseFloat(lat), lng: parseFloat(lng) }, 120, 5),
          formatForNearby({ userId: 'v_bot2', name: 'Sam (Founder)', interests: ['Web3', 'SaaS', 'Product'], mode: 'social', auraScore: 85, lat: parseFloat(lat), lng: parseFloat(lng) }, 340, 12),
          formatForNearby({ userId: 'v_bot3', name: 'Jordan (Engineer)', interests: ['React', 'Backend', 'System Design'], mode: 'chill', auraScore: 75, lat: parseFloat(lat), lng: parseFloat(lng) }, 450, 2)
      );
  }

  return res.status(200).json({
    success: true,
    count: nearbyUsers.length,
    radiusMeters: radius,
    expiryMins,
    data: nearbyUsers,
  });
}

/**
 * POST /connect
 * Body: { userId, targetId }
 */
function connectUsers(req, res) {
  const { userId, targetId } = req.body;
  if (!userConnections.has(userId)) userConnections.set(userId, new Set());
  if (!userConnections.has(targetId)) userConnections.set(targetId, new Set());
  
  userConnections.get(userId).add(targetId);
  userConnections.get(targetId).add(userId);
  
  return res.status(200).json({ success: true, message: "Connected successfully" });
}

/**
 * GET /connections
 * Query: userId
 */
function getConnections(req, res) {
  const { userId } = req.query;
  const connectedIds = userConnections.get(userId) || new Set();
  
  const allUsers = getAllPresence();
  // We also try to fetch the hackathon bot profiles mockingly if they are connected
  const hackathonBots = [
      { userId: 'v_bot1', name: 'Alex (Builder)', interests: ['AI', 'Startups', 'TypeScript'], mode: 'work', distance: '120m', lastActive: '5m' },
      { userId: 'v_bot2', name: 'Sam (Founder)', interests: ['Web3', 'SaaS', 'Product'], mode: 'social', distance: '340m', lastActive: '12m' },
      { userId: 'v_bot3', name: 'Jordan (Engineer)', interests: ['React', 'Backend', 'System Design'], mode: 'chill', distance: '450m', lastActive: '2m' }
  ];
  
  const connectedProfiles = [];
  connectedIds.forEach(id => {
      const match = allUsers.find(u => u.userId === id);
      if (match) {
          connectedProfiles.push(formatForNearby(match, null, 1));
      } else {
          const botMatch = hackathonBots.find(b => b.userId === id);
          if (botMatch) connectedProfiles.push(botMatch);
      }
  });

  return res.status(200).json({
    success: true,
    data: connectedProfiles
  });
}

module.exports = { goOnline, getNearby, connectUsers, getConnections };
