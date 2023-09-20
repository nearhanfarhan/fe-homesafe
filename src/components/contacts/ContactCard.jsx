import { StyleSheet, View, Text } from "react-native";
import { Button } from "@rneui/base";
import { Avatar } from '@rneui/themed';

const ContactCard = ({contact, handleRemove}) => {
    return (
        <View style={styles.contactCard}>
            <Avatar size={64} rounded source={contact.avatarUrl ? { uri: contact.avatarUrl } : require("../../assets/default-avatar.png")} />
            <View style={styles.details}>
                <Text>{contact.name}</Text>
                <Text>{contact.telNo}</Text>
            </View>
            <Button title="remove" onPress={() => handleRemove(contact.id) } />
        </View>
    );
};

const styles = StyleSheet.create({
    contactCard: {
        width: "100%",
        padding: 5,
        flexDirection: "row"
    },
    avatar: {
        resizeMode: 'center',
        height: 50,
        width: 50
    },
    details: {
        width: "50%",
        paddingLeft: 10,
        paddingTop: 5
    },
    remove: {
        height: 50,
        width: 50,
        paddingLeft: 15,
        margin: 0,
        backgroundColor: "#f1f1f1",
        textAlign: "center",
        borderWidth: 1,
        borderColor: "black"
    },
    removeIcon: {
        fontSize: 35,
        color: "black",
        margin: 0
    }
});

export default ContactCard;