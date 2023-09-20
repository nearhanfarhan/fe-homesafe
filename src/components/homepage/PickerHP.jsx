import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { View, Text } from "react-native";
import styles from "../../styles/Homepage.styles";

export default function PickerHP() {

    const [selectedDestination, setSelectedDestination] = useState('');

    return (
       <View >
       <Picker style={styles.picker}
       selectedDestination={selectedDestination}
       selectedValue={selectedDestination}
       onValueChange={(itemValue, itemIndex) => setSelectedDestination(itemValue)} >
       <Picker.Item label="Home" value="home" />
       <Picker.Item label="Work" value="work" />
       <Picker.Item label="School" value="school" />
     </Picker>
    <Text style={styles.selectedDest}>Selected Destination: {selectedDestination}</Text> 
    </View>
    )
}