import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    borderColor: "grey",
    backgroundColor: "#fff",
    width: "100%",
    height: 44,
  },
  selectedOption: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: 10,
    borderRadius: 5,
    margin: 5,
    textAlign: "center",
  },
  selectedDest: {
    backgroundColor: "#007BFF",
    margin: 5,
    textAlign: "center",
    padding: 10,
    borderRadius: 5,
    maxWidth: "40%",
  },
  suggestion: {
    padding: 12,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    backgroundColor: "white",
  },
  dropdown: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 5,
  },
  inputWithIcon: {
    flexDirection: "row",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
});

export default styles;
