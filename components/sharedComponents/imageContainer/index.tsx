import { RecycleIcon } from "@/assets/icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image, View } from "native-base";

interface IProps {
  imageUrl: string;
  onDelete?: () => void;
}

const ImageContainer = ({ imageUrl, onDelete }: IProps) => {
  return (
    <View marginRight={2}>
      <View>
        <Image
          src={imageUrl ?? ""}
          height={"142"}
          width={"165"}
          resizeMode="cover"
          borderRadius={10}
          alt={"Image"}
        />
      </View>
      
      {onDelete && (
        <View style={[styles.icon, { backgroundColor: "#C32B43" }]}>
          <TouchableOpacity onPress={onDelete}>
            <RecycleIcon />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    right: 10,
    top: 7,
    height: 30,
    width: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    flex: 1,
  },
});

export default ImageContainer;
