const axios = require('axios');

const googleMapsApiKey = 'AIzaSyAQfQIC-Fy3-cQhPkkgH-aIwPxAumcpScw';

function addressToCoordinates(address) {
  return new Promise((resolve, reject) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleMapsApiKey}`;

    axios.get(url)
      .then((response) => {
        if (response.data.status === 'OK' && response.data.results.length > 0) {
          const { lat, lng } = response.data.results[0].geometry.location;
          resolve({ latitude: lat, longitude: lng });
        } else {
          console.log('Geocoding failed for the given address.');
          resolve(null);
        }
      })
      .catch((error) => {
        console.error(`Error during geocoding: ${error.message}`);
        reject(error);
      });
  });
}

// Usage example
const address = "McDonald's Oxford Circus, Oxford Street, London, UK";

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