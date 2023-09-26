import axios from "axios";

const googleMapsApiKey = "AIzaSyDvVmqahHXDsFvalXZLkcfh5PL5F4Id8zo";

export function coordinatesToAddress(latitude, longitude) {
  return new Promise((resolve, reject) => {
    const encodedCoordinates = encodeURIComponent(`${latitude},${longitude}`);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${encodedCoordinates}&key=${googleMapsApiKey}`;

    axios
      .get(url)
      .then((response) => {
        if (response.data.status === "OK" && response.data.results.length > 0) {
          const address = response.data.results[0].formatted_address;
          resolve(address);
        } else {
          console.log("Geocoding failed for the given coordinates.");
          resolve(null);
        }
      })
      .catch((error) => {
        console.error(`Error during geocoding: ${error.message}`);
        reject(error);
      });
  });
}
