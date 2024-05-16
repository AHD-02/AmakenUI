import { useEffect } from "react";
import { useImageUploadMutation } from "../data/user";
import Toast from "react-native-toast-message";

const useUploadImage = () => {
  const [upload, res] = useImageUploadMutation();

  useEffect(() => {
    if (res.error)
      Toast.show({
        type: "error",
        text1: JSON.stringify((res.error as any)?.data),
      });

  }, [res]);

  return {
    images: res.data ?? [],
    isLoading: res.isLoading,
    upload,
  };
};
export default useUploadImage;
