import { StyleSheet, View, SafeAreaView, Keyboard } from "react-native";
import { Input, Button } from "@rneui/base";
import { Formik } from "formik";
import * as yup from "yup";
import { useContext } from "react";
import { UserContext } from "../../services/userContext";
import { addContactToUser, returnUpdatedContactList } from "../../services/api";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  contactNumber: yup.string().required("Contact Number is Required"),
});

const AddContact = ({ contacts, setContacts }) => {
  const { currentUser } = useContext(UserContext);
  const initialValues = {
    name: "",
    contactNumber: "",
  };
  const handleAddContact = (values, { resetForm }) => {
    const newContact = {
      name: values.name,
      telNo: values.contactNumber,
    };
    return addContactToUser(currentUser, newContact)
      .then(() => {return returnUpdatedContactList(currentUser, setContacts)}).then(() =>{
        resetForm();
        Keyboard.dismiss();
      })
      .catch((error) => console.log("error occurred: ", error));
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleAddContact}
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
                  placeholder="Name"
                  value={values.name}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  name="name"
                  errorStyle={
                    errors.name && touched.name ? { color: "red" } : {}
                  }
                  errorMessage={errors.name && touched.name ? errors.name : ""}
                />
                <Input
                  placeholder="Contact Number"
                  value={values.contactNumber}
                  onChangeText={handleChange("contactNumber")}
                  onBlur={handleBlur("contactNumber")}
                  name="contactNumber"
                  errorStyle={
                    errors.contactNumber && touched.contactNumber
                      ? { color: "red" }
                      : {}
                  }
                  errorMessage={
                    errors.contactNumber && touched.contactNumber
                      ? errors.contactNumber
                      : ""
                  }
                />

                <Button
                  onPress={handleSubmit}
                  title="Add"
                  disabled={!isValid || values.contactNumber === ""}
                />
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default AddContact;
