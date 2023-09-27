import { SafeAreaView, StyleSheet, View } from "react-native";
import { Input, Button } from "@rneui/base";
import React, { useContext, useEffect } from "react";
import { auth } from "../firebase";
import { router } from "expo-router";
import { Formik } from "formik";
import * as yup from "yup";
import { UserContext } from "../contexts/UserContext";
import { postUserOnRegistration } from "../services/api";
import RegisterHeader from "../Headers/registerHeader";

const registerValidationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is Required"),
  lastName: yup.string().required("Last Name is Required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const RegisterScreen = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.replace("/");
      }
    });
    return unsubscribe;
  }, []);

  const handleRegister = (values) => {
    let user;
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((userCredentials) => {
        user = userCredentials.user; 
          return user.updateProfile({
          displayName: `${values.firstName} ${values.lastName}`,
        });
      })
      .then(() => {
        setCurrentUser(user)
        return postUserOnRegistration(user);
      })
      .then(() => {
        console.log("User added successfully to database");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <View>
    <RegisterHeader />
      <SafeAreaView style={styles.container}>
        <View>
          <Formik
            validationSchema={registerValidationSchema}
            initialValues={initialValues}
            onSubmit={handleRegister}
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
                  placeholder="First Name"
                  value={values.firstName}
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  name="firstName"
                  errorStyle={
                    errors.firstName && touched.firstName
                      ? { color: "red" }
                      : {}
                  }
                  errorMessage={
                    errors.firstName && touched.firstName
                      ? errors.firstName
                      : ""
                  }
                />
                <Input
                  placeholder="Last Name"
                  value={values.lastName}
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  name="lastName"
                  errorStyle={
                    errors.lastName && touched.lastName ? { color: "red" } : {}
                  }
                  errorMessage={
                    errors.lastName && touched.lastName ? errors.lastName : ""
                  }
                />
                <Input
                  placeholder="Email Address"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  name="email"
                  errorStyle={
                    errors.email && touched.email ? { color: "red" } : {}
                  }
                  errorMessage={
                    errors.email && touched.email ? errors.email : ""
                  }
                />
                <Input
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  name="password"
                  errorStyle={
                    errors.password && touched.password ? { color: "red" } : {}
                  }
                  errorMessage={
                    errors.password && touched.password ? errors.password : ""
                  }
                  secureTextEntry
                />
                <Input
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  name="confirmPassword"
                  errorStyle={
                    errors.confirmPassword && touched.confirmPassword
                      ? { color: "red" }
                      : {}
                  }
                  errorMessage={
                    errors.confirmPassword && touched.confirmPassword
                      ? errors.confirmPassword
                      : ""
                  }
                  secureTextEntry
                />

                <Button
                  onPress={handleSubmit}
                  title="Register"
                  disabled={!isValid || values.email === ""}
                />
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});
