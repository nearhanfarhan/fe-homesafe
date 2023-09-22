import React, { useEffect } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function SearchLocation({
  query,
  setQuery,
  locations,
  setLocations,
  selectedDestination,
  setSelectedDestination,
}) {
  const handlePlaceSelected = (place) => {
    setSelectedDestination(place);
    setQuery(place.description);
    setLocations([]);
  };

  useEffect(() => {
    // You can use the `locations` state to update the autocomplete predictions
    // based on the user's input. You can pass it as the `predefinedPlaces` prop.
  }, [locations]);

  return (
    <GooglePlacesAutocomplete
      placeholder="Search for a location"
      minLength={2} 
      autoFocus={false}
      returnKeyType={'search'}
      listViewDisplayed="auto"
      fetchDetails={true}
      renderDescription={(row) => row.description}
      onPress={(data, details = null) => {
        handlePlaceSelected(data);
      }}
      onFail={(error) => console.error(error)}
      query={{
        key: 'AIzaSyDvVmqahHXDsFvalXZLkcfh5PL5F4Id8zo',
        language: 'en',
      }}
      styles={{
        textInputContainer: {
          width: '100%',
        },
        description: {
          fontWeight: 'bold',
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
      // Pass your predefinedPlaces (locations) here to update autocomplete predictions
      predefinedPlaces={locations}
    />
  );
}