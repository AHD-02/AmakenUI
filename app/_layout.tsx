import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import Toast, { BaseToastProps, ErrorToast, SuccessToast } from "react-native-toast-message";
import { colors } from "./theme/Colors";
import { StatusBar, StyleSheet } from 'react-native';
import { Provider } from "react-redux";
import { persistor, store } from "./state/store";
import RootLayoutNav from "./rootLayoutNav";
import { PersistGate } from "redux-persist/integration/react";
import Spinner from "react-native-loading-spinner-overlay";
import LoadingLayout from "./loadingLayout";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)/index",
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
        style={{ borderLeftColor: colors.errorRed }}
        contentContainerStyle={styles.contentContainer}
        text1Style={styles.text}
        text2Style={styles.text2}
      />
    ),
    success: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
      <SuccessToast
        {...props}
        style={{ borderLeftColor: colors.successGreen }}
        contentContainerStyle={styles.contentContainer}
        text1Style={styles.text}
        text2Style={styles.text2}
        text1={props.text1}
      />
    ),
  };


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LoadingLayout />
          <Toast config={toastConfig} />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Urbanist-Regular',
  },
  text2: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Urbanist-Regular',
  },
});