import { getUserContacts } from "../../services/api";
import React, { useState, useEffect, useContext } from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native'
import { UserContext } from "../../services/userContext";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function SearchContacts() {
    const { currentUser } = useContext(UserContext);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true)
          try {
            const snapshot = await getUserContacts(currentUser);
            if (snapshot.exists()) {
              const contactsData = snapshot.val();
              const valuesArray = Object.keys(contactsData).map((key) => ({
                id: key,
                ...contactsData[key],
              }));
              setContacts(valuesArray);
            } else {
              setContacts([]);
            }
            setLoading(false)
          } catch (error) {
            setLoading(false)
            console.error("Error fetching contacts: ", error);
          }
        };
        fetchData();
      }, [currentUser]);

      if (loading) return <Text>Loading...</Text>

      const handleInputChange = (text) => {
        setInputValue(text);
        if (text === "") {
          setSuggestions([]);
          return;
        }
     const filteredContacts = contacts.filter((contact) =>
      contact.name && contact.name.toLowerCase().includes(text.toLowerCase())
    ).filter((contact) => !selectedContacts.some((c) => c.id === contact.id));

      setSuggestions(filteredContacts.slice(0, 3));
    };
  
    const handleSelectContact = (contact) => {
      // add function later?
      setInputValue("");
      setSuggestions([]); 
  
   
  
    if (!selectedContacts.some((c) => c.id === contact.id)) {
        setSelectedContacts([...selectedContacts, contact]);
      }
    };
  
    const handleRemoveContact = (contact) => {
    
      setSelectedContacts(selectedContacts.filter((c) => c.id !== contact.id));
    };
  
    return (
      <View>
        <TextInput
          style={styles.input}
          placeholder="Choose Contacts..."
          placeholderTextColor={'grey'}
          value={inputValue}
          onChangeText={handleInputChange}
          onFocus={() => {
            if (inputValue !== "") {
              setInputValue("");
            }
          }}
        />
        {selectedContacts.map((contact) => (
                <TouchableOpacity
              key={contact.id}
              onPress={() => handleRemoveContact(contact)}
              style={styles.selectedContact}
            >
              <Text style={styles.selectedContactText}>{contact.name}</Text>
            </TouchableOpacity>
            ))}
        {inputValue !== "" && suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectContact(item)}>
                <Text style={styles.suggestion}>{item.name}</Text>
              </TouchableOpacity>
            )}
            style={styles.dropdown}
          />
        )}
      </View>
    );
  }


const styles = StyleSheet.create({
  input: {
    padding: 15,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: 'grey',
    marginBottom: 10,
  },
  selectedContact: {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    textAlign: 'center',
  },
  suggestion: {
    padding: 12,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
  },
  dropdown: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
  },
});


