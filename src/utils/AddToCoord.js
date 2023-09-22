
import axios from "axios";

const googleMapsApiKey = "AIzaSyAQfQIC-Fy3-cQhPkkgH-aIwPxAumcpScw";

export function AddressToCoordinates(address) {
  return new Promise((resolve, reject) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleMapsApiKey}`;

    axios
      .get(url)
      .then((response) => {
        if (response.data.status === "OK" && response.data.results.length > 0) {
          const { lat, lng } = response.data.results[0].geometry.location;
          resolve({ latitude: lat, longitude: lng });
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
