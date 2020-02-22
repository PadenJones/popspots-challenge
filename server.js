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
 *
 * These aren't secure; however, putting them here
 * helps us avoid needing to redeploy if they're hardcoded.
 * We could also store them in a database.
 */
app.get('/api/tokens', (req, res) => {
  res.send({
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
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
