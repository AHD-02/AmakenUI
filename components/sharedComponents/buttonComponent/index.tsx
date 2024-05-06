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
      <Button onPress={onPress} style={[styles.button, styles.shadow]}>
        <Text style={styles.label}>{title}</Text>
      </Button>
    </HStack>
  );
};
export default ButtonComponent;
