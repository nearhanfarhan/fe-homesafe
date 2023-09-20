import { StyleSheet, View, SafeAreaView, Keyboard } from "react-native";
import { Input, Button } from '@rneui/base';
import { Formik } from 'formik';
import * as yup from 'yup'

const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Name is Required'),
    contactNumber: yup
      .string()
      .required('Contact Number is Required')
  })

const AddContact = ({contacts, setContacts}) => {
    const initialValues = {
        name: '',
        contactNumber: ''
    };
    const handleAddContact = (values, { resetForm }) => {
        // this is temporary before we integrate with firebase
        const id = Math.max(...contacts.map(contact => contact.id)) + 1;
        const newContact = {
            id: id,
            name: values.name,
            telNo: values.contactNumber
        };
        setContacts([
            newContact,
            ...contacts
        ]);
        resetForm();
        Keyboard.dismiss();
    }

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
                  placeholder='Name'
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  name="name"
                  errorStyle={errors.name && touched.name ? { color: 'red' } : {}}
                  errorMessage={errors.name && touched.name ? errors.name : ''}
                />
                <Input
                  placeholder="Contact Number"
                  value={values.contactNumber}
                  onChangeText={handleChange('contactNumber')}
                  onBlur={handleBlur('contactNumber')}
                  name="contactNumber"
                  errorStyle={errors.contactNumber && touched.contactNumber ? { color: 'red' } : {}}
                  errorMessage={errors.contactNumber && touched.contactNumber ? errors.contactNumber : ''}
                />

                <Button 
                  onPress={handleSubmit}
                  title="Add"
                  disabled={!isValid || values.contactNumber === ''}
                />
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 20,
        borderWidth: 1,
        borderRadius: 10
    }
});

export default AddContact;