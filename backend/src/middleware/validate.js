/**
 * validate.js
 * Lightweight request validation middleware.
 */

/**
 * Validates POST /go-online body: { userId, lat, lng }
 */
function validateGoOnline(req, res, next) {
  const { userId, lat, lng } = req.body;

  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    return res.status(400).json({ error: "userId is required and must be a non-empty string." });
  }

  if (lat === undefined || lng === undefined) {
    return res.status(400).json({ error: "lat and lng are required." });
  }

  const parsedLat = parseFloat(lat);
  const parsedLng = parseFloat(lng);

  if (isNaN(parsedLat) || parsedLat < -90 || parsedLat > 90) {
    return res.status(400).json({ error: "lat must be a number between -90 and 90." });
  }

  if (isNaN(parsedLng) || parsedLng < -180 || parsedLng > 180) {
    return res.status(400).json({ error: "lng must be a number between -180 and 180." });
  }

  // Normalize to numbers on req.body
  req.body.lat = parsedLat;
  req.body.lng = parsedLng;
  req.body.userId = userId.trim();

  next();
}

/**
 * Validates GET /nearby query params: { lat, lng, radius? }
 */
function validateNearby(req, res, next) {
  const { lat, lng } = req.query;

  if (lat === undefined || lng === undefined) {
    return res.status(400).json({ error: "lat and lng query params are required." });
  }

  const parsedLat = parseFloat(lat);
  const parsedLng = parseFloat(lng);

  if (isNaN(parsedLat) || parsedLat < -90 || parsedLat > 90) {
    return res.status(400).json({ error: "lat must be a number between -90 and 90." });
  }

  if (isNaN(parsedLng) || parsedLng < -180 || parsedLng > 180) {
    return res.status(400).json({ error: "lng must be a number between -180 and 180." });
  }

  // Normalize
  req.query.lat = parsedLat;
  req.query.lng = parsedLng;

  next();
}

module.exports = { validateGoOnline, validateNearby };
