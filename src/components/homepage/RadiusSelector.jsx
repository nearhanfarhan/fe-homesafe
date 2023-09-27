import React, { useEffect, useState } from "react";
import { Button, Text, View, StyleSheet, Alert } from "react-native";
import {Picker} from '@react-native-picker/picker';

export default function RadiusSelector({ selectedRadius, setSelectedRadius, selectedDestination, setSelectedDestination }) {
  const [radiusSize, setRadiusSize] = useState(150);
  const [radiusCat, setRadiusCat] = useState('medium')

  const handleRadiusChange = (value) => {
    if (value === 50){
      setRadiusCat('small')
    } else if (value === 150){
      setRadiusCat('medium')
    } else if (value === 500){
      setRadiusCat('large')
    } else if (value === 1000){
      setRadiusCat('very large')
    }
    setRadiusSize(value);
    setSelectedRadius({...selectedRadius, radius: value, size: radiusCat}); // Update the selectedRadius state in the parent component
  };

  return (
    <View >
      <Text>Select Radius Size:</Text>
      <Picker
        selectedValue={radiusSize}
        onValueChange={(itemValue) => handleRadiusChange(itemValue)}
      >
        <Picker.Item label="Small (50 meters)" value={50} />
        <Picker.Item label="Medium (150 meters)" value={150} />
        <Picker.Item label="Large (500 meters)" value={500} />
        <Picker.Item label="Very Large (1000 meters)" value={1000} />
      </Picker>
      <Button
        title="Apply"
        onPress={() => {
          // You can perform additional actions when the "Apply" button is pressed
          if (selectedDestination.radius === radiusSize){
            console.log('radius already selected.');
            Alert.alert('radius already selected.');
            return;
          }
          setSelectedDestination({...selectedDestination, radius: radiusSize})
          Alert.alert(`new radius ${radiusCat}: ${radiusSize}m selected`)
          console.log("Selected Radius:", radiusSize);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
      flex            : 1,
      backgroundColor : "#fff",
      alignItems      : "center",
      justifyContent  : "center",
  },
  picker: {
    width: 200, // Set the width as needed
    backgroundColor: "#eee", // Set the background color
    borderRadius: 8, // Set border radius
    marginBottom: 20, // Add margin as needed
  },
});

{/*  */}