/**
 * presenceStore.js
 * In-memory store for MVP. Replace with PostgreSQL for production.
 *
 * Structure:
 * {
 *   userId: { userId, lat, lng, timestamp }
 * }
 */

const store = new Map();

/**
 * Upsert a user's presence entry.
 * Optionally attach profile fields (name, interests, mode, auraScore)
 * — populated when user module is integrated.
 *
 * @param {string} userId
 * @param {number} lat
 * @param {number} lng
 * @param {object} profile - optional: { name, interests, mode, auraScore }
 */
function upsertPresence(userId, lat, lng, profile = {}) {
  const existing = store.get(userId) || {};
  store.set(userId, {
    ...existing,      // preserve any existing profile data
    ...profile,       // overwrite with new profile if provided
    userId,
    lat,
    lng,
    timestamp: Date.now(),
  });
}

/**
 * Return all current presence entries as an array.
 * @returns {Array}
 */
function getAllPresence() {
  return Array.from(store.values());
}

/**
 * Remove a user's presence entry (e.g. explicit go-offline).
 * @param {string} userId
 */
function removePresence(userId) {
  store.delete(userId);
}

module.exports = { upsertPresence, getAllPresence, removePresence };
