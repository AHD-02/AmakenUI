import { Toast } from 'native-base';
import React from 'react'
import { PermissionsAndroid } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker'; //TODO: remove
import useCameraPermission from './useCameraPermission';

const useTakeImage = async () => {
    try {
        const perm = useCameraPermission()
        console.log('need sex', Boolean(perm))
        // ImageCropPicker.openCamera({
        //     height: 400,
        //     width: 300,
        //     cropping: true,
        // }).then((image) => {
        //     console.log(image)
        // })
    } catch (e) {
        Toast.show({
            title: JSON.stringify(e),
            variant: 'error',
        })
    }
    return null;
}

export default useTakeImage