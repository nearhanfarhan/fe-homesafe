import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import styles from "../../styles/Homepage.styles";

export default function DestinationPicker() {
  const validDestinations = ["Home", "Work", "School", "Sophie's house", "Sofa shop", "Gym", "Starbucks", "Airport"];
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (text) => {
    setInputValue(text)
    if (text === "") {
      setSuggestions([]);
      return;
    }
    const filteredSuggestions = validDestinations.filter((destination) =>
      destination.toLowerCase().includes(text.toLowerCase())
    ).slice(0, 3);
    setSuggestions(filteredSuggestions);
  };

  const handleSelectDestination = (destination) => {
    if (validDestinations.includes(destination)) {
    setInputValue(destination);
    // include a function for what to do with the selected option and invoke here
    setSuggestions([]); 
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Choose Destination..."
        placeholderTextColor={'grey'}
        value={inputValue}
        onChangeText={handleInputChange}
        onFocus={() => {
          if (inputValue !== "") {
            setInputValue("");
          }
        }}
      />
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectDestination(item)}>
            <Text style={styles.suggestion}>{item}</Text>
          </TouchableOpacity>
        )}
        style={styles.dropdown}
      />
    </View>
  );
}
