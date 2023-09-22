import axios from "axios";

const googleMapsApiKey = "AIzaSyDvVmqahHXDsFvalXZLkcfh5PL5F4Id8zo";

export function addressToCoordinates(address) {
  return new Promise((resolve, reject) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleMapsApiKey}`;

    axios
      .get(url)
      .then((response) => {
        // console.log ("response", response.data.status)
        if (response.data.status === "OK" && response.data.results.length > 0) {
          const { lat, lng } = response.data.results[0].geometry.location;
          resolve({ latitude: lat, longitude: lng, address });
        } else {
          console.log("Geocoding failed for the given address.");
          resolve(null);
        }
      })
      .catch((error) => {
        console.error(`Error during geocoding: ${error.message}`);
        reject(error);
      });
  });
}
