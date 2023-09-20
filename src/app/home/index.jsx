import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Redirect, router } from "expo-router";
import { auth } from "../../firebase";

export default function HomePage() {
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

  return (
    <View style={styles.container}>
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
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "blue",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "blue",
    fontSize: 16,
  },
});
