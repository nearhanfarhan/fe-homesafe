import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { AddressToCoordinates } from '../../utils/AddToCoord';

export default function SearchLocation({
  query,
  setQuery,
  locations,
  setLocations,
  selectedDestination,
  setSelectedDestination,
}) {
  const handlePlaceSelected = (place) => {
    
    console.log("place description", place)
    AddressToCoordinates(place.description).then((coords) => {
      setSelectedDestination({ ...selectedDestination, ...coords })
    });
    // setSelectedDestination(place);
    setQuery(place.description);
    setLocations([]);
  };

  // useEffect(() => {
  //   // You can use the `locations` state to update the autocomplete predictions
  //   // based on the user's input. You can pass it as the `predefinedPlaces` prop.
  // console.log(selectedDestination)
  
  // }, [selectedDestination]);

  return (
    <View style={styles.searchContainer}>
        <View style={styles.autocompleteContainer}>
          <GooglePlacesAutocomplete
            placeholder="Search for a location"
            minLength={2} 
            autoFocus={false}
            returnKeyType={'search'}
            listViewDisplayed="auto"
            fetchDetails={true}
            renderDescription={(row) => row.label}
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
            predefinedPlacesAlwaysVisible ={true}
          />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    position: "relative",
    flex: 1,
    paddingTop: 50,
    paddingBottom: 20,
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
    padding: 5,
  }
});