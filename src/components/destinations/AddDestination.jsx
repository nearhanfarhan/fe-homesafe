import React, { useState } from 'react';
import { Keyboard, View, SafeAreaView } from 'react-native';
import styles from '../../styles/Destinations.styles';
import { Button } from "@rneui/base";
import { Input, Text } from '@rneui/base';
import SearchLocation from '../homepage/SearchLocation';

export default function AddDestination({ destinations, setDestinations }) {
  const [selectedDestination, setSelectedDestination] = useState('');

  const handleAddDestination = () => {
    if (selectedDestination) {
      setDestinations([...destinations, selectedDestination]);
      Keyboard.dismiss()
    }
  }

  return (
    <View>
      <SearchLocation selectedDestination={selectedDestination} setSelectedDestination={setSelectedDestination} />
      <Button title="Add Destination" onPress={handleAddDestination} />
    </View>
  );
}

