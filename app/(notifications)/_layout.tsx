import React from 'react'
import { Stack } from 'expo-router'

const NotificationsLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{
                headerShown: true,
                headerBackTitle: '',
                title: 'Notifications',
                headerTitle: 'Notifications',
                headerTitleAlign: 'center'
            }}
            />
        </Stack>
    )
}

export default NotificationsLayout