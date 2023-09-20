import React, { useState } from 'react';
import { Keyboard, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Redirect } from 'expo-router';
import styles from '../../styles/Saved.styles';
import { Avatar } from '@rneui/themed';
import { Button } from "@rneui/base";
import { Input, Text } from '@rneui/base';

export default function SavedCards({ destinations = [] }) {
  const [newLabel, setNewLabel] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [destinationsList, setDestinationsList] = useState(destinations);

  const handleDelete = (id) => {
    const updatedDestinations = destinationsList.filter((item) => item.id !== id);
    setDestinationsList(updatedDestinations);
  }

  const handleAddDestination = () => {
    if (newLabel && newAddress) {
      const newDestination = {
        id: Date.now(),
        label: newLabel,
        location: newAddress,
      };
      setDestinationsList([...destinationsList, newDestination]);
      setNewLabel('');
      setNewAddress('');
      Keyboard.dismiss()
    }
  }

  return (
  
      <ScrollView style={styles.container}>
        {destinationsList.length > 0 ? (
          destinationsList.map((item) => (
            <View key={item.id} style={styles.detailsContainer}>
              <Avatar style={styles.avatar} size={64} rounded source={require("../../assets/location5.png")} />
              <View style={styles.address}>
                  <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.location}>{item.location}</Text>
                </View>
              <Button style={styles.remove} onPress={() => handleDelete(item.id)}>
                <Text style={styles.removeText}>Remove</Text>
              </Button>
            </View>
          ))
        ) : (
          <View style={styles.noDestinations}>
            <Text style={styles.noDests}>No saved destinations</Text>
          </View>
        )}
     
        <View style={styles.addAddress}>
        <Text style={styles.heading}>Add a new address</Text>
      <Input
      style={styles.input}
        placeholder="Label"
        placeholderTextColor={'grey'}
        value={newLabel}
        onChangeText={(text) => setNewLabel(text)}
      />
      <Input
        placeholder="Address"
        placeholderTextColor={'grey'}
        value={newAddress}
        onChangeText={(text) => setNewAddress(text)}
      />
      <Button title="Add Destination" onPress={handleAddDestination} />
    </View>
    </ScrollView>
  );
}

