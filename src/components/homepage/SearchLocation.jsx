import Autocomplete from 'react-native-autocomplete-input';
import { useState } from "react";
import { View, Text, Keyboard, TouchableOpacity } from "react-native";
import { searchLocations } from '../../services/api';
import styles from "../../styles/Homepage.styles";

export default function SearchLocation({ selectedDestination, setSelectedDestination }) {
    const [locations, setLocations] = useState([]);
    const [query, setQuery] = useState('');
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
      //  <View >
      //   <Picker style={styles.picker}
      //   selectedDestination={selectedDestination}
      //   selectedValue={selectedDestination}
      //   onValueChange={(itemValue, itemIndex) => setSelectedDestination(itemValue)} >
      //     <Picker.Item label="Home" value="home" />
      //     <Picker.Item label="Work" value="work" />
      //     <Picker.Item label="School" value="school" />
      //   </Picker>
      //   <Text style={styles.selectedDest}>Selected Destination: {selectedDestination}</Text> 
      // </View>
    )
}