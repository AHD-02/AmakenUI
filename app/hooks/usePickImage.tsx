import React from "react";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

const usePickImage = async () => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Toast.show({
        type: "info",
        text1: "Permission to access the gallery is required!",
      });
      return {
        base: "",
        fileExtention: "",
      };
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      return {
        base: result.assets[0]?.base64 ?? "",
        fileExtention: `.${result.assets[0]?.uri.split(".").pop()}` ?? "",
      };
    }
  } catch (error) {
    console.error("Error picking image from gallery:", error);
  }

  return {
    base: "",
    fileExtention: "",
  };
};

export default usePickImage;
