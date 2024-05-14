import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 12,
    height: 50,
  },
  label: {
    fontSize: 16,
    fontFamily: "Cairo",
    color: "white",
  },
  shadow: {
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
});

export default styles;
