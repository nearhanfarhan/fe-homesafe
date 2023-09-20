import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../styles/Homepage.styles";
import { Redirect, router } from "expo-router";
import { Button } from "@rneui/base";

export default function HomepageButtons () {

    const [isTracking, setIsTracking] = useState(false); 


        const handleStart = () => {
            setIsTracking(!isTracking)
            // ... logic for tracking
        }


  

return (
    <View style={styles.buttonContainer}>
        <Button
        style={styles.button}
        onPress={handleStart}
      >
        <Text style={styles.buttonText}>
          {isTracking ? 'Stop' : 'Start'}
        </Text>
      </Button>
        </View>
)}