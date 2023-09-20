import { useState, useEffect, useContext } from "react";
import { Redirect } from "expo-router";
import { ScrollView } from "react-native";
import { auth } from "../../firebase";
import AddContact from "../../components/contacts/AddContact";
import ContactList from "../../components/contacts/ContactList";
import { UserContext } from "../../services/userContext";
import { getUserContacts } from "../../services/api";

export default function ContactsPage() {
  if (!auth.currentUser) {
    return <Redirect href="/login" />;
  }
  const { currentUser } = useContext(UserContext);

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    return getUserContacts(currentUser)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const contactsData = snapshot.val();
        const valuesArray = Object.keys(contactsData).map((key) => ({
          id: key,
          ...contactsData[key],
        }));
        console.log(valuesArray);
        setContacts(valuesArray);
      } else {
        setContacts([]);
      }
    });
  }, []);

  return (
    <ScrollView>
      <AddContact contacts={contacts} setContacts={setContacts} />
      <ContactList contacts={contacts} setContacts={setContacts} />
    </ScrollView>
  );
}
