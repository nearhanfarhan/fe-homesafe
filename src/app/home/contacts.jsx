import { useState, useEffect, useContext } from "react";
import { Redirect } from "expo-router";
import { ScrollView } from "react-native";
import { auth } from "../../firebase";
import AddContact from "../../components/contacts/AddContact"
import ContactList from "../../components/contacts/ContactList";
import { UserContext } from "../../services/userContext";

export default function ContactsPage() {
  if (!auth.currentUser) {
    return <Redirect href="/login" />;
  }
  const {currentUser} = useContext(UserContext)

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
    <ScrollView>
      <AddContact contacts={contacts} setContacts={setContacts} />
      <ContactList contacts={contacts} setContacts={setContacts} />
    </ScrollView>
  );
}
