const NodeGeocoder = require('node-geocoder');

const geocoder = NodeGeocoder({
  provider: 'openstreetmap',
});

function coordinatesToAddress(latitude, longitude) {
  return new Promise((resolve, reject) => {
    geocoder.reverse({ lat: latitude, lon: longitude }, (error, result) => {
      if (error) {
        console.error(`Error during reverse geocoding: ${error.message}`);
        reject(error);
      } else if (result.length > 0) {
        const address = result[0].formattedAddress;
        resolve(address);
      } else {
        console.log('Reverse geocoding failed for the given coordinates.');
        resolve(null);
      }
    });
  });
}

module.exports = coordinatesToAddress;


// .then() and .catch() chain to be edited in function call

const latitude = 51.4422662;
const longitude = -0.0371897; 

coordinatesToAddress(latitude, longitude)
  .then((address) => {
    if (address) {
      console.log(`Address: ${address}`);
    } else {
      console.log('Reverse geocoding failed for the given coordinates.');
    }
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
  });