import { Button, View } from "native-base";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

interface IProps {
    handleEnhance: () => void;
    response: any;
    setValue: (value: any) => void;
}

const EnhanceByAi = ({ handleEnhance, response, setValue}: IProps) => {
  useEffect(() => {
    if (response?.data) {
      setValue(response?.data);
    }
    if(response.error && 'data' in response.error) {
      setValue(response?.error?.data);
    }
  }, [response]);

  
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
