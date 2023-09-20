import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { router, Link } from "expo-router";

import { getUserById } from "../services/api";
import { UserContext } from "../services/userContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.replace("/");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        setUser(userCredential);
        // id token can be fetched like this
        const jwtToken = await userCredential.user?.getIdToken();
        // console.log(jwtToken);
        // console.log("Logged in as", userCredential.user.uid);
        return getUserById(userCredential);
      })
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log("in snapshot", snapshot.val().email);
        } else {
          console.log("no data available");
        }
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.buttonText}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Link style={styles.buttonContainer} href="/register" asChild>
          <Pressable>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
