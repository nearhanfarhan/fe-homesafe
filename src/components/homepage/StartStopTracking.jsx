import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Redirect, router } from "expo-router";
import { Button } from "@rneui/base";

export default function StartStopTracking ({selectedDestination}) {
    const [isTracking, setIsTracking] = useState(false); 
    const handleStart = () => {
        setIsTracking(!isTracking)
        // ... logic for tracking
        // if tracking is started
        // use selected destination to trigger text when reached
        console.log(selectedDestination);
    }

return (
    <View style={styles.buttonContainer}>
      <Button
        style={styles.button}
        onPress={handleStart}
        iconContainerStyle={{ marginLeft: 10 }}
        titleStyle={{ fontWeight: '800' }}
        buttonStyle={{
          backgroundColor: "#397af8",
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
      >
        <Text style={styles.buttonText}>
          {isTracking ? 'Stop' : 'Start'}
        </Text>
      </Button>
    </View>
)}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -60,
  },
  buttonText: {
    color: "white",
    fontSize: 18
  }

});