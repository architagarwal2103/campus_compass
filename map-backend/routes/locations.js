const express = require('express');
const router = express.Router();

let locations = []; // simple in-memory storage

// Get all locations
router.get('/', (req, res) => {
  res.json(locations);
});

// Add a new location
router.post('/', (req, res) => {
  const { lat, lng, title, description } = req.body;
  const newLocation = { id: Date.now(), lat, lng, title, description, images: [] };
  locations.push(newLocation);
  res.status(201).json(newLocation);
});

// Upload image (optional extension later)

module.exports = router;
