const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const geo = require('./geo');

let NO_DB_LOCATIONS = [];

// TODO: 4 hours refresh
// TODO: sanitize data
// TODO: parseFloat where necessary
request('https://dashboard.getpopspots.com/public-data/challenge', function (error, response, body) {
  if (!error && response.statusCode === 200) {
    NO_DB_LOCATIONS = JSON.parse(body)
      .filter(location => {
        const {name, city, state, address, zip, lat, lng} = location;
        return name && city && state && address && zip && lat && lng;
      })
      .map(location => ({
        ...location,
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lng),
      }));
  }
});

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/locations', (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  res.send(geo.getClosest({lat, lng}, NO_DB_LOCATIONS));
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));