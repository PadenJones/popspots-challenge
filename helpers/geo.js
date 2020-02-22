const geoLib = require('geolib');

const getClosest = (origin, locations) => {
  const a = {
    latitude: origin.lat,
    longitude: origin.lng,
  };

  const distances = locations.map((location, index) => {
    const b = {
      latitude: location.lat,
      longitude: location.lng,
    };

    return ({
      index,
      distance: geoLib.getDistance(a, b),
    });
  });

  const sorted = distances.sort((lhs, rhs) => lhs.distance - rhs.distance);

  return sorted.map(location => locations[location.index]);
};

module.exports = {
  getClosest,
};
