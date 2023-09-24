import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { AddressToCoordinates } from '../../utils/AddToCoord';

export default function SearchLocation({
  placeholder,
  query,
  setQuery,
  locations,
  setLocations,
  selectedDestination,
  setSelectedDestination,
}) {
  const handlePlaceSelected = (place) => {
    AddressToCoordinates(place.description).then((coords) => {
      console.log(coords);
      setSelectedDestination({ ...selectedDestination, ...coords })
    });
    setSelectedDestination(place);
    setQuery(place.description);
    setLocations([]);
  };

  useEffect(() => {
    // You can use the `locations` state to update the autocomplete predictions
    // based on the user's input. You can pass it as the `predefinedPlaces` prop.
  }, [locations]);
  
  return (
    <View style={styles.searchContainer}>
        <View style={styles.autocompleteContainer}>
          <GooglePlacesAutocomplete
            placeholder={placeholder}
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
            enablePoweredByContainer={false}
            styles={{
              textInputContainer: {
                width: '100%'
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
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingBottom: 20,
    height: 60
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 2,
    padding: 5,
  }
});