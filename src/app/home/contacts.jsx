import { useState, useEffect, useContext } from "react";
import { Redirect } from "expo-router";
import { ScrollView, Text } from "react-native";
import { auth } from "../../firebase";
import AddContact from "../../components/contacts/AddContact";
import ContactList from "../../components/contacts/ContactList";
import { UserContext } from "../../contexts/UserContext";
import { ContactContext } from "../../contexts/ContactContext";
import { getUserContacts } from "../../services/api";

export default function ContactsPage() {
  if (!auth.currentUser) {
    return <Redirect href="/login" />;
  }
  const { currentUser } = useContext(UserContext);
  const { contacts, setContacts } = useContext(ContactContext);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const snapshot = await getUserContacts(currentUser);
        if (snapshot.exists()) {
          const contactsData = snapshot.val();
          const valuesArray = Object.keys(contactsData).map((key) => ({
            id: key,
            ...contactsData[key],
          }));
          setContacts(valuesArray);
        } else {
          setContacts([]);
        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error("Error fetching contacts: ", error);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Text>Loading...</Text>

  return (
    <ScrollView>
      <AddContact contacts={contacts} setContacts={setContacts} />
      <ContactList contacts={contacts} setContacts={setContacts} />
    </ScrollView>
  );
}
