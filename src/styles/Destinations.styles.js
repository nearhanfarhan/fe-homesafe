import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginLeft: 20,
    padding: 5,
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },
  listContainer: {
    zIndex: 1,
    elevation: 0,
  },
  avatar: {
    height: 64,
    width: 64,
  },
  detailsContainer: {
    flexDirection: "row",
    marginTop: 9,
  },
  label: {
    fontSize: 15,
  },
  location: {
    fontSize: 15,
  },
  address: {
    marginLeft: 9,
  },
  remove: {
    marginLeft: 70,
  },
  removeText: {
    color: "white",
    fontSize: 18,
  },
  noDests: {
    fontSize: 17,
    margin: 20,
  },
  heading: {
    fontSize: 18,
    paddingBottom: 16,
  },
  addAddress: {
    Width: 200,
    borderWidth: 1,
    borderRadius: 10,
    margin: 20,
    paddingLeft: 10,
    paddingVertical: 20,
  },
});

export default styles;
