import React, { useState } from 'react'
import { Center, Image, Text, View } from 'native-base'
import { Camera } from '@/assets/images'

interface IProps {
    defaultImage?: any
}
const ProfileImageUploader = ({ defaultImage }: IProps) => {
    // const [image, setImage] = useState(defaultImage ?? Camera)

    return (
        <View>
            <Center>
                <Image source={defaultImage ?? Camera} height={120} width={120} my={"6"} borderRadius={'full'} />
            </Center>
            <View>
                <Text>TODO: add react native picker, add selection modal</Text>
            </View>
        </View>
    )
}


export default ProfileImageUploader