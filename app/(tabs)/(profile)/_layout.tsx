import React from 'react'
import { Stack } from 'expo-router'
import { ArrowLeft } from '@/assets/icons'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'

export const unstable_settings = {
    initialRouteName: 'index',
};

const ProfileLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false, }}>
            <Stack.Screen name="index" options={{headerShown: false}}
            />
        </Stack>
    )
}

export default ProfileLayout