import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "@/components/useColorScheme";
import { NativeBaseProvider, extendTheme } from "native-base";
import Toast, { BaseToastProps, ErrorToast } from "react-native-toast-message";
import Colors, { colors } from "./theme/Colors";
import { StyleSheet } from 'react-native';
import { Provider } from "react-redux";
import { store } from "./state/store";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(auth)/Login",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  const toastConfig = {
    error: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: colors.primary }}
        contentContainerStyle={styles.contentContainer}
        text1Style={styles.text}
      />
    )
  };

  const colorScheme = useColorScheme();
  const nativeBaseTheme = extendTheme({
    colors: Colors[colorScheme ?? 'light'],
    fonts: {
      urbanist: 'Urbanist-Regular',
    },
  });

  return (
    <NativeBaseProvider theme={nativeBaseTheme}>
      <RootLayoutNav />
      <Toast config={toastConfig} />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Urbanist-Regular',
  },
});

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </Provider>
    </ThemeProvider>
  );
}
