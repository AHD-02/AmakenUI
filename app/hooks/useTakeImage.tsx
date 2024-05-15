import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

const useTakeImage = async () => {
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Toast.show({
        type: "info",
        text1: "Permission to access the camera is required!",
      });
      return {
        base: "",
      };
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      return {
        base: result.assets[0]?.base64 ?? "",
      };
    }
  } catch (error) {
    console.error("Error picking image from gallery:", error);
  }

  return {
    base: "",
  };
};

export default useTakeImage;
