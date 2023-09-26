import { getUserContacts, returnUpdatedContactList } from "../../services/api";
import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { UserContext } from "../../contexts/UserContext";
import { ContactContext } from "../../contexts/ContactContext";
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function SearchContacts({ setSelectedContacts }) {
    const { currentUser } = useContext(UserContext);
    const { contacts, setContacts } = useContext(ContactContext);
    const [loading, setLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        if (currentUser) {
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
          } catch (error) {
            console.error("Error fetching contacts: ", error);
          } finally {
            setLoading(false);
          }
        }
      };
      fetchData();
    }, [currentUser, setContacts]);
  
    if (loading) return <Text>Loading...</Text>;
      if (loading) return <Text>Loading...</Text>

      const handleChange = (items) => {
        const updatedContacts = contacts.filter(contact => items.includes(contact.id));
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
            labelField="name"
            valueField="id"
            placeholder="Choose contacts to notify"
            searchPlaceholder="Search for a contact..."
            value={selectedItems}
            onChange={handleChange}
            visibleSelectedItem={true}
            selectedStyle={styles.selectedStyle}
            renderSelectedItem={(itemToRender, unSelect) => (
              <View style={styles.selectedStyle}>
                <Text style={styles.textSelectedStyle}>{itemToRender.name}</Text>
                <AntDesign style={styles.iconSelectedStyle} color="black" name="closecircleo" size={17} />
              </View>
            )}
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
      marginBottom: 2
    },
    autocompleteContainer: {
      zIndex: 1,
      padding: 5,
    },
    dropdown: {
      backgroundColor: 'white',
      borderBottomColor: 'gray',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5
    },
    placeholderStyle: {
      fontSize: 16,
      color: "#666"
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
      borderRadius: 15,
      backgroundColor: 'white',
      flexDirection: 'row',
      paddingVertical: 5,
      paddingHorizontal: 10,
      marginTop: 5,
      marginRight: 5
    },
    textSelectedStyle: {
      
    },
    iconSelectedStyle: {
      marginLeft: 5
    }
  });

