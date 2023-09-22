import { getUserContacts, returnUpdatedContactList } from "../../services/api";
import React, { useState, useEffect, useContext } from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native'
import { UserContext } from "../../services/userContext";
import styles from "../../styles/Searchbar.styles";
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
      }, []);

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
            return returnUpdatedContactList(currentUser, setContacts)
          }}
        />
        {selectedContacts.map((contact) => (
                <TouchableOpacity
              key={contact.id}
              onPress={() => handleRemoveContact(contact)}
              style={styles.selectedOption}
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


