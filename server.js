require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const geo = require('./helpers/geo');
const locations = require('./models/locations');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 * Keeping parameter validation light, in a real application
 * we'd need to be a little more thorough
 */
app.get('/api/locations', (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);

  const closest = (lat && lng)
    ? geo.getClosest({lat, lng}, locations.all)
    : locations.all;

  res.send(closest);
});

/**
 * Non-secret API tokens for the frontend
 */
app.get('/api/tokens', (req, res) => {
  res.send({
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    GOOGLE_MAPS_TOKEN: process.env.GOOGLE_MAPS_TOKEN,
  })
});

/**
 * Serve static files in production so we can run as a single app
 */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
