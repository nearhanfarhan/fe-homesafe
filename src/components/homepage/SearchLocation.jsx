import Autocomplete from 'react-native-autocomplete-input';
import { useState } from "react";
import { View, Text, Keyboard, TouchableOpacity } from "react-native";
import { searchLocations } from '../../services/api';
import styles from "../../styles/Homepage.styles";

export default function SearchLocation({ query, setQuery, locations, setLocations, selectedDestination, setSelectedDestination }) {
    const placeholder = 'Search for a location';

    const findLocation = (searchText) => {
      setQuery(searchText);
      if(searchText) {
        setLocations(searchLocations(searchText));
      } else {
        setLocations([]);
      }
    };

    return (
      <View style={styles.searchContainer}>
        <View style={styles.autocompleteContainer}>
          <Autocomplete
            autoCorrect={false}
            data={locations}
            value={query}
            onChangeText={(text) => findLocation(text)}
            placeholder={placeholder}
            flatListProps={{
              keyboardShouldPersistTaps: 'always',
              keyExtractor: (destination) => destination.identifier,
              renderItem: ({ item }) => (
                <TouchableOpacity onPress={() => { 
                    setSelectedDestination(item);
                    setLocations([]);
                    setQuery(item.identifier);
                    Keyboard.dismiss();
                  }}>
                  <Text>
                    {item.identifier}
                  </Text>
                </TouchableOpacity>
              ),
            }}
          />
          {selectedDestination ? ( <Text>Selected Destination: {selectedDestination.identifier}</Text> ) : ( <></> ) }
        </View>        
      </View>
    )
}