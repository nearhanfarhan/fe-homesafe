import React, { useEffect, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { AddressToCoordinates } from "../../utils/AddToCoord";
import { UserContext } from "../../contexts/UserContext";
import { returnUpdatedDestinationList } from "../../services/api";


export default function SearchLocation({
  placeholder,
  setQuery,
  locations,
  setLocations,
  selectedDestination,
  setSelectedDestination,
}) {
  const [destinations, setDestinations] = useState([]);
  const [reloadList, setReloadList] = useState(false);
  const { currentUser } = useContext(UserContext);

  const handlePlaceSelected = (place) => {
    console.log("place description", place);
    AddressToCoordinates(place.description).then((coords) => {
      setSelectedDestination({ ...selectedDestination, ...coords });
    });
    setQuery(place.description);
  };


  useEffect(() => {
    returnUpdatedDestinationList(currentUser, setDestinations);
  }, []);

  useEffect(() => {

    const formattedDestinations = destinations.map((destination) => ({
      isPredefinedPlace: true,
      label: destination.label,
      description: destination.address,
      geometry: {
        location: {
          lat: destination.latitude,
          lng: destination.longitude,
        },
      },
    }));
    setLocations(formattedDestinations);
  }, [destinations]);


  return (
    <View style={styles.searchContainer}>
      <View style={styles.autocompleteContainer}>
        <GooglePlacesAutocomplete
          placeholder={placeholder}
          minLength={2}
          autoFocus={false}
          returnKeyType={"search"}
          listViewDisplayed="auto"
          fetchDetails={true}

          renderDescription={(row) =>
            row.isPredefinedPlace ? row.label : row.description
          }
          onPress={(data, details = null) => {
            handlePlaceSelected(data);
          }}
          onFail={(error) => console.error(error)}
          query={{
            key: "AIzaSyDvVmqahHXDsFvalXZLkcfh5PL5F4Id8zo",
            language: "en",
          }}
          enablePoweredByContainer={false}
          styles={{
            textInputContainer: {
              width: "100%",
            },
            description: {
              fontWeight: "bold",
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },

          }}
          // Pass your predefinedPlaces (locations) here to update autocomplete predictions
          predefinedPlaces={locations}
          predefinedPlacesAlwaysVisible={true}

        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingBottom: 20,
    height: 60,
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 2,
    elevation: Platform.OS === "android" ? 50 : 0,
    padding: 5,
  },
});