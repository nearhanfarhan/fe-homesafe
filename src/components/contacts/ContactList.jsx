import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import ContactCard from "./ContactCard";

const ContactList = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        // call backend here to get contacts instead of this
        const contactsData = [
            {
                id: 1,
                name: "Mum",
                telNo: "07777 777 777",
                avatarUrl: "https://cdn4.iconfinder.com/data/icons/cool-avatars-2/190/00-08-512.png",
                defaultMessage: "Hi Mum, I am back home"
            },
            {
                id: 2,
                name: "Wife",
                telNo: "07777 777 888",
                avatarUrl: "https://cdn3.iconfinder.com/data/icons/cool-avatars-2/190/00-32-2-512.png",
                defaultMessage: "Hi Darling, I am back home"
            },
            {
                id: 3,
                name: "Bestie",
                telNo: "07777 777 666",
                avatarUrl: "https://cdn3.iconfinder.com/data/icons/cool-avatars-2/190/00-38-2-512.png",
                defaultMessage: "Hiya, I am back home"
            }
        ];
        setContacts(contactsData);
    }, []);

    return (
        <View style={styles.contactList}>
            {contacts.map((contact) => {
                return <ContactCard key={contact.id} contact={contact} />
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    contactList: {
        width: "100%",
        margin: 20
    }
});

export default ContactList;