import { Redirect } from "expo-router";
import { View, Text } from "react-native";
import { auth } from "../../firebase";
import AddContact from "../../components/contacts/AddContact"
import ContactList from "../../components/contacts/ContactList";

export default function ContactsPage() {
  if (!auth.currentUser) {
    return <Redirect href="/login" />;
  }

  return (
    <View>
      <ContactList />
      <AddContact />
    </View>
  );
}
