import { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import ContactCard from "./ContactCard";
import {
  getUserContacts,
  removeContactFromUser,
  returnUpdatedContactList,
} from "../../services/api";
import { UserContext } from "../../contexts/UserContext";

const ContactList = ({ contacts, setContacts }) => {
  const { currentUser } = useContext(UserContext);

  const handleDelete = (id) => {
    if (id) {
      // need to update firebase here
      return removeContactFromUser(currentUser, id)
        .then(() => {
          return returnUpdatedContactList(currentUser, setContacts);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  if (contacts.length === 0)
    return (
      <Text style={styles.noContacts}>
        No contacts to show. Add contacts above
      </Text>
    );
  return (
    <View style={styles.contactList}>
      {contacts.map((contact) => {
        return (
          <ContactCard
            key={contact.id}
            contact={contact}
            handleDelete={handleDelete}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  contactList: {
    width: "100%",
    margin: 20,
  },
  noContacts: {
    fontSize: 17,
    margin: 20,
  },
});

export default ContactList;
