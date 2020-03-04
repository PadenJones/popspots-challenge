const request = require('request');
const { isString, isFloat } = require('../helpers/validators');

/**
 * In the real world we would have a DB and some way
 * to process background jobs
 *
 * We'd kick off a job that would request and sanatize
 * the data every 4 hours, then insert it into the db, which
 * we would query using some sort of ORM (most likely)..
 *
 * Jobs would be queued and ran asynchronously most likely
 * in a separate application
 */

const locations = require('../public/locations.json');

// const RESOURCE_URL = 'https://dashboard.getpopspots.com/public-data/challenge';
const REFRESH_RATE_HRS = 4;

let noDBLocations = [];

const copy = {
  nonParsable: 'could not parse locations from Popspots',
  nonArray: 'locations from Popspots were not an array',
  invalid: (name) => `location: ${name} was invalid`,
  badResponse: 'request to Popspots failed',
};

const sanitize = (locations) => locations.filter(location => {
  const {name, city, state, address, zip, lat, lng} = location;

  const valid =
    isString(name) &&
    isString(city) &&
    isString(state) &&
    isString(address) &&
    isString(zip) &&
    isFloat(lat) &&
    isFloat(lng);

  if (!valid) {
    console.warn(copy.invalid(name));
  }

  return valid;
});

const parse = (jsonLocations) => {
  let parsed;

  try {
    parsed = JSON.parse(jsonLocations);

    if (Array.isArray(parsed)) {
      return parsed;
    } else {
      console.error(copy.nonArray);
      return [];
    }
  } catch {
    console.error(copy.nonParsable);
    return [];
  }
};

const refresh = () => {
  // request(RESOURCE_URL, function (error, response, body) {
  //   if (error || response.statusCode !== 200) {
  //     console.error(copy.badResponse);
  //     return;
  //   }
  //   const parsed = parse(body);
  //   const sanitized = sanitize(parsed);
  //
  //   if (sanitized) {
  //     noDBLocations.length = 0;
  //     sanitized.forEach(location => noDBLocations.push(location));
  //   }
  // });

  const sanitized = sanitize(locations);

  if (sanitized) {
    noDBLocations.length = 0;
    sanitized.forEach(location => noDBLocations.push(location));
  }
};

setInterval(refresh, REFRESH_RATE_HRS * 60 * 60 * 1000);
refresh();

module.exports = {all: noDBLocations};
