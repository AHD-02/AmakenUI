import React from 'react'
import { Stack } from 'expo-router'
import { NativeBaseProvider, extendTheme } from 'native-base'
import { Colors } from './theme'
import { useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'

const RootLayoutNav = () => {
    const colorScheme = useColorScheme()
    const nativeBaseTheme = extendTheme({
        colors: Colors[colorScheme ?? 'light'],
        fonts: {
            urbanist: 'Urbanist-Regular',
        },
        config: {
            initialColorMode: colorScheme ?? 'light'
        }
    });

    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <NativeBaseProvider theme={nativeBaseTheme}>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="modal" options={{ presentation: "modal" }} />
                </Stack>
            </NativeBaseProvider>
        </ThemeProvider>
    )
}

export default RootLayoutNav