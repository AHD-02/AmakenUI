import { Button, HStack } from "native-base";
import styles from "./styles";
import { Text } from "@/components/Themed";

interface IProps {
  title: string;
  onPress: () => void;
  isEdit?: boolean;
  isLogout?: boolean;

}

const ButtonComponent = ({ title, onPress, isEdit ,isLogout}: IProps) => {
  return (
    <HStack width="100%" justifyContent={"center"}>
      <Button
        onPress={onPress}
        style={[
          styles.button,
          styles.shadow,
          isEdit ? { backgroundColor: "green" } : { backgroundColor: "#A5583A" },
          isLogout ? { backgroundColor: "#C32B43" } : { backgroundColor: "#A5583A" },
        
        ]}
      >
        <Text style={styles.label}>{title}</Text>
      </Button>
    </HStack>
  );
};
export default ButtonComponent;
