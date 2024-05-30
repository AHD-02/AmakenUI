import { Button, View } from "native-base";
import { StyleSheet } from "react-native";

interface IProps {
    handleEnhance: () => void;
    response: any;
}

const EnhanceByAi = ({ handleEnhance, response }: IProps) => {
  return (
    <View style={styles.buttonContainer}>
      <Button style={styles.button} onPress={handleEnhance}>
        Enhance By AI
      </Button>
    </View>
  );
};
export default EnhanceByAi;


const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#74AA9C",
    alignSelf: "flex-end",
  },
});
