import React from 'react'
import { Stack } from 'expo-router'
import { NativeBaseProvider, extendTheme } from 'native-base'

 export const unstable_settings = {
    initialRouteName: "(tabs)/index",
};

const RootLayoutNav = () => {
    return (
        <NativeBaseProvider >
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(notifications)" options={{ headerShown: false }} />
                <Stack.Screen name="(details)" options={{ headerShown: false }} />
                <Stack.Screen name="(profile)" options={{ headerShown: false }} />
                <Stack.Screen name="(bookEvent)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: "modal" }} />
            </Stack>
        </NativeBaseProvider>
    )
}

export default RootLayoutNav