import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  View,
  Text
} from "react-native";

import { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { router, Link } from "expo-router";
import { UserContext } from "../services/userContext";
import { Button, Input } from "@rneui/base";
import { Formik } from 'formik';
import * as yup from 'yup'

const LoginScreen = () => {

  const { currentUser, setCurrentUser } = useContext(UserContext);


const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email Address is Required'),
  password: yup
    .string()
    .required('Password is required'),
})

  const initialValues = {
    email: '',
    password: ''
  };


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.replace("/");
      }
    });
    return unsubscribe;
  }, []);


  const goToRegisterPage = () => {
    router.push("/register");
  }

  const handleLogin = (values) => {

     let user;
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then(async (userCredentials) => {
        // id token can be fetched like this

        user = userCredentials.user;
        const jwtToken = await userCredentials.user?.getIdToken().then(() => {
          setCurrentUser(user);
          setEmail("");
          setPassword("");
        });

      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
      <Formik
            validationSchema={loginValidationSchema}
            initialValues={initialValues}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
            }) => (
              <View>
                <Input
                  placeholder="Email Address"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  name="email"
                  errorStyle={errors.email && touched.email ? { color: 'red' } : {}}
                  errorMessage={errors.email && touched.email ? errors.email : ''}
                />
                <Input
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  name="password"
                  errorStyle={errors.password && touched.password ? { color: 'red' } : {}}
                  errorMessage={errors.password && touched.password ? errors.password : ''}
                  secureTextEntry
                />

                <Button
                  onPress={handleSubmit}
                  title="Login"
                  disabled={!isValid || values.email === ''}
                  containerStyle={styles.button}
                />

                <Button 
                  onPress={goToRegisterPage} 
                  title="Register"
                  containerStyle={styles.button}
                />
              </View>
            )}
          </Formik>
          
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    padding: 30
  },
  button: {
    margin: 10
  }
});
