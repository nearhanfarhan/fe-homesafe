import { Text } from "react-native";
import { Redirect } from "expo-router";
import { auth } from "../../firebase";

export default function ContactsPage() {
  if (!auth.currentUser) {
    return <Redirect href="/login" />;
  }

  return <Text>Contacts Page</Text>;
}
