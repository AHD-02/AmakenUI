import { IconButton } from "native-base";
import styles from "./style";

interface IProps {
  icon: JSX.Element;
  onPress: () => void;
}

const IconButtonComponent = ({ onPress, icon }: IProps) => {
  return (
    <IconButton
      onPress={onPress}
      icon={icon}
      position={"absolute"}
      style={styles.addIcon}
      color={"white"}
    />
  );
};
export default IconButtonComponent;
