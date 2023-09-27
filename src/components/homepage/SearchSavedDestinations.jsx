import { useContext, useEffect, useState } from "react"
import { getUserDestinations, returnUpdatedDestinationList } from "../../services/api"
import { UserContext } from "../../contexts/UserContext"
import { Text } from "@rneui/base"
import styles from "../../styles/Homepage.styles";
import { View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';


export const SearchSavedDestinations = () => {
    const {currentUser} = useContext(UserContext)
    const [destinations, setDestinations] = useState([])
    const [dropdownDestination, setDropdownDestination] = useState("")

    useEffect(() => {
      returnUpdatedDestinationList(currentUser, setDestinations);
    }, [currentUser]);
    
    useEffect(() => {
      console.log(destinations);
    }, [destinations]);

    const handleChange = (items) => {
        console.log(items)
      };

    return (      
    <>
        <View style={styles.searchContainer}>
          <View style={styles.autocompleteContainer}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              search
              data={destinations}
              labelField="Destination"
              valueField="id"
              placeholder="Select from saved destinations"
              searchPlaceholder="Select from saved destinations?"
              value={dropdownDestination}
              onChange={handleChange}
              visibleSelectedItem={true}
              selectedStyle={styles.selectedStyle}
              renderItem={(item) => (
                <View style={styles.selectedStyle}>
                  <Text style={styles.textSelectedStyle}>{item.label}</Text>
                </View>
              )}
            />
          </View>
        </View>
        </>
  )
}