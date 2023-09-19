import { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { Input, Text } from '@rneui/base';


const AddContact = () => {
    const [newContact, setNewContact] = useState(null);

    return (
        <>
            <View style={styles.addContact}>
                <Text style={styles.heading}>Add a new contact</Text>
                <Input
                    placeholder='Name'
                    // errorStyle={{ color: 'red' }}
                    // errorMessage='ENTER A VALID ERROR HERE'
                />
                <Input placeholder='Contact Number' />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    addContact: {
        borderWidth: 1,
        borderRadius: 10,
        margin: 20,
        paddingLeft: 10,
        paddingVertical: 20
    },
    heading: {
        fontSize: 18,
        paddingBottom: 16
    }
});

export default AddContact;