import React from 'react'
import { Stack } from 'expo-router'

const NotificationsLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="[eventId]" options={{ headerShown: false }} />
        </Stack>
    )
}

export default NotificationsLayout