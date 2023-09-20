import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
      },
      extraSpace: {
        height: 100
      },
      input: {
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
        paddingVertical: 20,
        alignSelf: 'center',
      },
      buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        height: 45,
        width: 100,
        backgroundColor: "#397af8",
        textAlign: "center",
        borderRadius: 5,
      },
      suggestion: {
        minWidth: 300,
        alignSelf: 'center',
        padding: 10,
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 7
      },
      dropdown: {
        maxHeight: 100,
      },
      buttonText: {
        color: 'white',
        fontSize: 30,
        alignSelf: 'center'
      },
      selectedDest: {
       alignSelf: "center",
       fontSize: 16
      },
      mapPlaceholder: {
        width: '100%',
        height: 450,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 16,
      },
});

export default styles;