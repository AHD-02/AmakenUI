import React from 'react'
import { Linking, PermissionsAndroid, Platform } from 'react-native';
import Toast from 'react-native-toast-message';

const useCameraPermission = async () => {
    try {
        if (Platform.OS === 'ios') {
            return true;
        }
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA, {
            title: 'Camera Permission',
            message: 'Amaken needs access to your camera.',
            buttonNegative: 'Cancel',
            buttonPositive: 'Ok',
        }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        } else {
            Linking.openSettings();
        }
    } catch (err) {
        Toast.show({
            type: 'error',
            text1: 'Permission Error',
            text2: JSON.stringify(err),
        })
    }
    return false;
}

export default useCameraPermission