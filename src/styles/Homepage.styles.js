import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  extraSpace: {
    height: 100,
  },
  input: {
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 40,
    marginBottom: -20,
    paddingLeft: 10,
    paddingVertical: 20,
    alignSelf: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 45,
    width: 100,
    backgroundColor: "#397af8",
    textAlign: "center",
    borderRadius: 25,
  },
  picker: {
    marginTop: -40,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    alignSelf: "center",
  },
  selectedDest: {
    alignSelf: "center",
    fontSize: 16,
  },
  mapPlaceholder: {
    width: "100%",
    height: 300,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
    zIndex: -1,
  },
});

export default styles;
