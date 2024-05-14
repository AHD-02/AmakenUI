import { Button, HStack } from "native-base";
import styles from "./styles";
import { Text } from "@/components/Themed";

interface IProps {
  title: string;
  onPress: () => void;
  isEdit?: boolean;
}

const ButtonComponent = ({ title, onPress, isEdit }: IProps) => {
  return (
    <HStack width="100%" justifyContent={"center"}>
      <Button
        onPress={onPress}
        style={[
          styles.button,
          styles.shadow,
          isEdit ? { backgroundColor: "green" } : { backgroundColor: "#A5583A" },
        ]}
      >
        <Text style={styles.label}>{title}</Text>
      </Button>
    </HStack>
  );
};
export default ButtonComponent;
