import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import styles from "../../styles/Homepage.styles";

export default function ContactsPicker() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (text) => {
    setInputValue(text);
    if (text === "") {
      setSuggestions([]);
      return;
    }

    const contacts = [
      "Mum",
      "Wife",
      "Bestie",
      "Edward",
      "Liv",
      "Lizard"
    ];

    const filteredContacts = contacts.filter((contact) =>
      contact.toLowerCase().includes(text.toLowerCase())
    );
    setSuggestions(filteredContacts.slice(0, 3));
  };

  const handleSelectContact = (contact) => {
    setInputValue(contact);
    // function later same as destination
    setSuggestions([]); 
    
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Choose Contact..."
        placeholderTextColor={'grey'}
        value={inputValue}
        onChangeText={handleInputChange}
        onFocus={() => {
          if (inputValue !== "") {
            setInputValue("");
          }
        }}
      />
      {inputValue !== "" && suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectContact(item)}>
              <Text style={styles.suggestion}>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.dropdown} 
        />
      )}
    </View>
  );
}

