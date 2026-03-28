# Aura Backend — MVP

Real-time presence API. Users go online with location, discover nearby people.

---

## Folder Structure

```
aura-backend/
├── src/
│   ├── server.js                  # Entry point — starts the server
│   ├── app.js                     # Express app setup
│   ├── routes/
│   │   └── presence.js            # Route definitions
│   ├── controllers/
│   │   └── presenceController.js  # Business logic (go-online, nearby)
│   ├── middleware/
│   │   └── validate.js            # Input validation
│   └── utils/
│       ├── presenceStore.js       # In-memory data store
│       └── geoUtils.js            # Haversine distance + expiry logic
└── package.json
```

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Start the server (production)
npm start

# 3. Or start with auto-reload (development)
npm run dev
```

Server runs at: `http://localhost:3000`

---

## API Reference

### `POST /go-online`
Mark a user as online with their current location.

**Request body:**
```json
{
  "userId": "user_abc",
  "lat": 19.0760,
  "lng": 72.8777
}
```

**Response:**
```json
{
  "success": true,
  "message": "User user_abc is now online.",
  "data": {
    "userId": "user_abc",
    "lat": 19.076,
    "lng": 72.8777,
    "timestamp": 1712300000000
  }
}
```

---

### `GET /nearby`
Fetch all active users within a radius.

**Query params:**
| Param    | Required | Default | Description                        |
|----------|----------|---------|------------------------------------|
| `lat`    | ✅       | —       | Your latitude                      |
| `lng`    | ✅       | —       | Your longitude                     |
| `radius` | ❌       | `500`   | Search radius in meters            |
| `expiry` | ❌       | `30`    | Presence expiry window in minutes  |

**Example:**
```
GET /nearby?lat=19.0760&lng=72.8777&radius=500&expiry=60
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "radiusMeters": 500,
  "expiryMins": 30,
  "data": [
    {
      "userId": "user_xyz",
      "lat": 19.0762,
      "lng": 72.8780,
      "distanceMeters": 34,
      "onlineSinceMins": 5
    }
  ]
}
```

---

## Quick Test (curl)

```bash
# Go online
curl -X POST http://localhost:3000/go-online \
  -H "Content-Type: application/json" \
  -d '{"userId": "div", "lat": 19.0760, "lng": 72.8777}'

# Add a nearby user
curl -X POST http://localhost:3000/go-online \
  -H "Content-Type: application/json" \
  -d '{"userId": "bhargav", "lat": 19.0762, "lng": 72.8780}'

# Fetch nearby
curl "http://localhost:3000/nearby?lat=19.0760&lng=72.8777&radius=500"
```

---

## Upgrading to PostgreSQL (post-hackathon)

Replace `presenceStore.js` with a PostgreSQL table:

```sql
CREATE TABLE presence (
  user_id    TEXT PRIMARY KEY,
  lat        DOUBLE PRECISION NOT NULL,
  lng        DOUBLE PRECISION NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Use PostGIS for native geospatial queries (optional but powerful)
```

Use `pg` npm package + connection pool. The rest of the codebase stays unchanged.
