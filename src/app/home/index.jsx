import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Redirect, router } from "expo-router";
import { auth } from "../../firebase";
import { useContext } from "react";
import { UserContext } from "../../services/userContext";
import { addContact } from "../../services/api";

export default function HomePage() {

  const {user} = useContext(UserContext)
  console.log(user?.user.email)

  if (!auth.currentUser) {
    return <Redirect href="/login" />;
  }

  const handleLogOut = () => {
    auth
      .signOut()
      .then(() => {
        router.replace("/login");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleAddContact = () => {
    addContact(user).then(() => console.log("contact added successfully")).catch((err) => console.log("error occurred adding contact", err))
  }

  return (
    <View style={styles.container}>
      {
        auth.currentUser ? (
          <View>
            <Text>Logged in as: {auth.currentUser?.email}</Text>
            <Text>Current context: {user?.user.email}</Text>
            <TouchableOpacity onPress={handleAddContact} style={styles.button}>
            <Text style={styles.buttonText}> Click to add contact to db</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogOut} style={styles.button}>
              <Text style={styles.buttonText}> Sign Out</Text>
            </TouchableOpacity>
          </View>
        ) : ( <></> )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "blue",
    width: "100%",
    padding: 15,
  },
  // buttonOutline: {
  //   backgroundColor: "white",
  //   marginTop: 5,
  //   borderColor: "blue",
  //   borderWidth: 2,
  // },
  // buttonText: {
  //   color: "white",
  //   fontWeight: 700,
  //   fontSize: 16,
  // },
  // buttonOutlineText: {
  //   color: "blue",
  //   fontWeight: 700,
  //   fontSize: 16,
  // },
});
