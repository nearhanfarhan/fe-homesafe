const NodeGeocoder = require('node-geocoder');

const geocoder = NodeGeocoder({
  provider: 'openstreetmap',
});

function addressToCoordinates(address) {
  return new Promise((resolve, reject) => {
    geocoder.geocode(address, (error, result) => {
      if (error) {
        console.error(`Error during geocoding: ${error.message}`);
        reject(error);
      } else if (result.length > 0) {
        const { latitude, longitude } = result[0];
        resolve({ latitude, longitude });
      } else {
        console.log('Geocoding failed for the given address.');
        resolve(null);
      }
    });
  });
}

module.exports = addressToCoordinates


// .then() and .catch() chain to be edited in function call

const address = 'McDonalds, Oxford Street, UK';

addressToCoordinates(address)
  .then((coordinates) => {
    if (coordinates) {
      console.log(`Latitude: ${coordinates.latitude}, Longitude: ${coordinates.longitude}`);
    } else {
      console.log('Geocoding failed for the given address.');
    }
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
  });








