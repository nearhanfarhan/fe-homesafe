import Autocomplete from 'react-native-autocomplete-input';
import { useState } from "react";
import { View, Text, Keyboard, TouchableOpacity,TextInput, FlatList } from "react-native";
import { searchLocations } from '../../services/api';
import { FontAwesome } from "@expo/vector-icons"; 
import styles from '../../styles/Searchbar.styles';

export default function SearchLocation({ query, setQuery, locations, setLocations, selectedDestination, setSelectedDestination }) {
  
    const findLocation = (searchText) => {
      setQuery(searchText);
      if(searchText) {
        setLocations(searchLocations(searchText));
      } else {
        setLocations([]);
      }
    };


    return (
      <View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.input}
              placeholder="Choose Destination..."
              placeholderTextColor={"grey"}
              value={query}
              onChangeText={(text) => findLocation(text)}
              onFocus={() => {
                if (query !== "") {
                  setQuery("");
                  setSelectedDestination(null);
                }
              }}
            />
            {selectedDestination && (
              <View style={styles.iconContainer}>
                <FontAwesome
                  name="map-marker"
                  size={24}
                  color="grey"
                />
              </View>
            )}
          </View>
        </View>
        {locations.length > 0 && (
          <FlatList
            data={locations}
            keyExtractor={(item) => item.identifier}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedDestination(item);
                  setLocations([]);
                  setQuery(item.identifier);
                }}
                style={styles.suggestion}
              >
                <Text style={styles.selectedContactText}>{item.identifier}</Text>
              </TouchableOpacity>
            )}
            style={styles.dropdown}
          />
        )}
      </View>
    );
  }