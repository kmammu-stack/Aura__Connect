/**
 * geoUtils.js
 * Haversine distance formula + expiry check.
 */

const EARTH_RADIUS_METERS = 6371000; // ~6,371 km in meters

/**
 * Calculate straight-line distance between two coordinates using Haversine.
 * @param {number} lat1 - Latitude of point A (degrees)
 * @param {number} lng1 - Longitude of point A (degrees)
 * @param {number} lat2 - Latitude of point B (degrees)
 * @param {number} lng2 - Longitude of point B (degrees)
 * @returns {number} Distance in meters
 */
function haversineDistance(lat1, lng1, lat2, lng2) {
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_METERS * c;
}

/**
 * Check if a presence entry has expired.
 * @param {number} timestamp   - ms epoch when user went online
 * @param {number} expiryMins  - expiry window in minutes (default: 30)
 * @returns {boolean} true if still active (not expired)
 */
function isActive(timestamp, expiryMins = 30) {
  const expiryMs = expiryMins * 60 * 1000;
  return Date.now() - timestamp < expiryMs;
}

module.exports = { haversineDistance, isActive };
