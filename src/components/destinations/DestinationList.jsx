import { View } from "react-native";
import { Redirect } from "expo-router";
import styles from "../../styles/Destinations.styles";
import { Avatar, ListItem } from "@rneui/themed";
import { Text } from "@rneui/base";
import {
  removeDestinationFromUser,
  returnUpdatedDestinationList,
} from "../../services/api";
import { useContext } from "react";
import { UserContext } from "../../services/userContext";

export default function DestinationList({ destinations, setDestinations }) {

  const {currentUser} = useContext(UserContext)

  const handleDelete = (id) => {
    console.log(id)
    return removeDestinationFromUser(currentUser, id)
      .then(() => {
        return returnUpdatedDestinationList(currentUser, setDestinations);
      })
      .catch((error) => {
        console.error("error deleting destination", error);
      });
  };
  return (
    <View>
      {destinations.length > 0 ? (
        destinations.map((item) => (
          <ListItem key={item.id} bottomDivider>
            <Avatar
              size={64}
              rounded
              source={require("../../assets/location.png")}
            />
            <ListItem.Content>
              <ListItem.Title>{item.label}</ListItem.Title>
              <ListItem.Subtitle>{item.location}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.ButtonGroup
              buttons={["Remove"]}
              onPress={(value) => {
                switch (value) {
                  case 0:
                    handleDelete(item.id);
                    break;
                }
              }}
              containerStyle={{ marginBottom: 20 }}
            />
          </ListItem>
        ))
      ) : (
        <View style={styles.noDestinations}>
          <Text style={styles.noDests}>No saved destinations</Text>
        </View>
      )}
    </View>
  );
}
