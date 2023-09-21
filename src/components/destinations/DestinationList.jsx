import React, { useState } from 'react';
import { Keyboard, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Redirect } from 'expo-router';
import styles from '../../styles/Destinations.styles';
import { Avatar } from '@rneui/themed';
import { Button } from "@rneui/base";
import { Input, Text } from '@rneui/base';

export default function DestinationList({ destinations, setDestinations }) {
  const handleDelete = (id) => {
    const updatedDestinations = destinations.filter((item) => item.id !== id);
    setDestinations(updatedDestinations);
  }

  return (
      <View>
        {destinations.length > 0 ? (
          destinations.map((item) => (
            <View key={item.identifier} style={styles.detailsContainer}>
              <Avatar style={styles.avatar} size={64} rounded source={require("../../assets/location.png")} />
              <View style={styles.address}>
                  <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.location}>{item.identifier}</Text>
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
    </View>
  );
}

