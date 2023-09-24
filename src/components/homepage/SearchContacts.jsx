import { getUserContacts, returnUpdatedContactList } from "../../services/api";
import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { UserContext } from "../../services/userContext";
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function SearchContacts() {
    const { currentUser } = useContext(UserContext);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
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
              setContacts(valuesArray.map(contact => { return { ...contact, label: contact.name, value: contact.id } }));
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

      const handleChange = (items) => {
        const updatedContacts = contacts.filter(contact => items.includes(contact.id));
        console.log(updatedContacts);
        setSelectedContacts(updatedContacts);
        setSelectedItems(items);
      };

    return (
      <>
      <View style={styles.searchContainer}>
        <View style={styles.autocompleteContainer}>
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={contacts}
            labelField="label"
            valueField="value"
            placeholder="Choose contacts to notify"
            searchPlaceholder="Search for a contact..."
            value={selectedItems}
            onChange={handleChange}
            visibleSelectedItem={true}
            selectedStyle={styles.selectedStyle}
            // renderSelectedItem={(item, unSelect) => (
            //   <></>
            // )}
          />
        </View>
      </View>
      {/* { selectedContacts && selectedContacts.length > 0 ? (
          <Text>{selectedContacts.map(contact => { return <>{contact.name} </> })} will be notified when you arrive at your destination</Text>
        ) : (<></>) } */}
      </>
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
    },
    dropdown: {
      height: 50,
      backgroundColor: 'white',
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
      paddingVertical: 5,
      paddingHorizontal: 10
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 14,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    icon: {
      marginRight: 5,
    },
    selectedStyle: {
      borderRadius: 12,
    },
  });

