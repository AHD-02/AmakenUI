import { Button, HStack } from "native-base";
import styles from "./styles";
import { Text } from "@/components/Themed";

interface IProps {
  title: string;
  onPress: () => void;
}

const ButtonComponent = ({ title, onPress }: IProps) => {
  return (
    <HStack width="100%" justifyContent={"center"}>
      <Button onPress={onPress} bgColor={"#A5583A"} style={styles.button}>
        <Text style={styles.label}>{title}</Text>
      </Button>
    </HStack>
  );
};
export default ButtonComponent;
