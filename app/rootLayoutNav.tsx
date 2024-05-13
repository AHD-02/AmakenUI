import React from 'react'
import { Stack } from 'expo-router'
import { NativeBaseProvider, extendTheme } from 'native-base'
// import { Colors } from './theme'
// import { useColorScheme } from 'react-native'
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
 export const unstable_settings = {
    initialRouteName: "(tabs)/index",
};

const RootLayoutNav = () => {
    // const colorScheme = useColorScheme()
    // const nativeBaseTheme = extendTheme({ kib
    //     colors: Colors[colorScheme ?? 'light'],
    //     fonts: {
    //         urbanist: 'Urbanist-Regular',
    //     },
    //     config: {
    //         initialColorMode: colorScheme ?? 'light'
    //     }
    // });

    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    return (
        <NativeBaseProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(notifications)" options={{ headerShown: false }} />
                <Stack.Screen name="(details)" options={{ headerShown: false }} />
                <Stack.Screen name="(profile)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: "modal" }} />
            </Stack>
        </NativeBaseProvider>
    )
}

export default RootLayoutNav