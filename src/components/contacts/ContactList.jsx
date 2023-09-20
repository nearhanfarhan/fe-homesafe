import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import ContactCard from "./ContactCard";

const ContactList = ({contacts, setContacts}) => {
    const handleRemove = (id) => {
        if(id) {
            // need to update firebase here
            setContacts(contacts.filter((contact) => contact.id !== id));
        }
    };

    return (
        <View style={styles.contactList}>
            {contacts.map((contact) => {
                return <ContactCard key={contact.id} contact={contact} handleRemove={handleRemove} />
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