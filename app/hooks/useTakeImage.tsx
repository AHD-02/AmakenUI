import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';

const useTakeImage = async () => {

    try {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Toast.show({
                type: 'info',
                text1: 'Permission to access the camera is required!'
            });
            return { image: null }
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            return {image: result.assets[0]?.uri ?? null}
        }
    } catch (error) {
        console.error('Error picking image from gallery:', error);
    }

    return { image: null }
};

export default useTakeImage