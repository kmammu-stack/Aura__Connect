/**
 * visibilityFormatter.js
 *
 * YOU own this — controls how user data appears inside /nearby responses.
 * Even though Padmavathi owns the user schema,
 * you control what gets exposed to other users in the discovery feed.
 *
 * This is where mode-based visibility logic lives.
 */

/**
 * Modes and what they expose:
 *   "chill"  → name + interests visible
 *   "work"   → name + mode visible, interests hidden
 *   "social" → full profile visible
 *   "ghost"  → hidden from /nearby entirely (filtered before this runs)
 */
const VISIBILITY_RULES = {
  chill:  { showName: true,  showInterests: true,  showEmail: false },
  work:   { showName: true,  showInterests: false, showEmail: false },
  social: { showName: true,  showInterests: true,  showEmail: false },
  ghost:  { showName: false, showInterests: false, showEmail: false }, // shouldn't reach here
};

/**
 * Format a user's profile for the /nearby response.
 * Applies visibility rules based on the user's mode.
 *
 * @param {object} user        - Full user object from store/DB
 * @param {number} distanceMeters
 * @param {number} onlineSinceMins
 * @returns {object}           - Shaped object safe to return to requester
 */
function formatForNearby(user, distanceMeters, onlineSinceMins) {
  const mode = user.mode || "chill";
  const rules = VISIBILITY_RULES[mode] || VISIBILITY_RULES.chill;

  return {
    userId:        user.userId,
    name:          rules.showName      ? (user.name || "Anonymous") : null,
    interests:     rules.showInterests ? (user.interests || [])     : [],
    mode:          mode,
    auraScore:     user.auraScore ?? 50,
    distanceMeters,
    onlineSinceMins,
  };
}

/**
 * Should this user be visible in /nearby at all?
 * Ghost mode = invisible.
 *
 * @param {object} user
 * @returns {boolean}
 */
function isVisible(user) {
  return (user.mode || "chill") !== "ghost";
}

module.exports = { formatForNearby, isVisible };
