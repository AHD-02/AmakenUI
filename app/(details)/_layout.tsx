import React from 'react'
import { Stack } from 'expo-router'

const NotificationsLayout = () => {
    return (
        <Stack screenOptions={{}}>
            <Stack.Screen name="events/[eventId]" options={{ headerShown: false }} />
            <Stack.Screen name="place/[placeId]" options={{ headerShown: false }} />
            <Stack.Screen name="addPublicPlace" options={{ headerShown: true, title: "Add Public Place"}} />
        </Stack>
    )
}

export default NotificationsLayout