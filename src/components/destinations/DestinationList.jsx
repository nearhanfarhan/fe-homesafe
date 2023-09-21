import { View } from 'react-native';
import { Redirect } from 'expo-router';
import styles from '../../styles/Destinations.styles';
import { Avatar, ListItem } from '@rneui/themed';
import { Text } from '@rneui/base';

export default function DestinationList({ destinations, setDestinations }) {
  const handleDelete = (id) => {
    const updatedDestinations = destinations.filter((item) => item.identifier !== id);
    setDestinations(updatedDestinations);
  }

  return (
      <View>
        {destinations.length > 0 ? (
          destinations.map((item) => (
            <ListItem key={item.identifier} bottomDivider>
              <Avatar size={64} rounded source={require("../../assets/location.png")} />
              <ListItem.Content>
                <ListItem.Title>{item.label}</ListItem.Title>
                <ListItem.Subtitle>{item.identifier}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.ButtonGroup
                buttons={['Remove']}
                onPress={(value) => {
                  switch(value) {
                    case 0:
                      handleDelete(item.identifier);
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
