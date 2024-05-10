import * as ImagePicker from 'expo-image-picker';
import React from 'react'
import Toast from 'react-native-toast-message';

const usePickImage = async () => {

    try {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Toast.show({
                type: 'info',
                text1: 'Permission to access the gallery is required!'
            });
            return { image: null }
        }
        let result = await ImagePicker.launchImageLibraryAsync({
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

export default usePickImage