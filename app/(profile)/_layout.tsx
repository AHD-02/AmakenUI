import React from 'react'
import { Stack } from 'expo-router'
import { ArrowLeft } from '@/assets/icons'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'


const ProfileLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false,}}>
            <Stack.Screen name="index" options={{
                headerShown: true,
                headerBackTitle: 'ArrowLeft',
                headerTitle: 'Notifications',
                headerTitleAlign: 'center',
                headerTitleStyle:{fontSize:16},
                headerStyle:{backgroundColor:'white'},
                headerShadowVisible:false   ,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft />
                    </TouchableOpacity>
                ),  
           
            }}
            />
        </Stack>
    )
}

export default ProfileLayout