import { SCREENS } from "@/components/screens";
import { Stack } from "expo-router";
const AuthLayout = () => {

  return (
      <Stack screenOptions={{}}>
        <Stack.Screen name={SCREENS.Login} options={{ headerShown: false, title: 'Login' }} />
        <Stack.Screen name={SCREENS.Signup} options={{ title: 'Create new account', headerBackTitleVisible: false }} />
        <Stack.Screen name={SCREENS.ForgotPassword} options={{ title: 'Forgot Password' }} />
      </Stack>
  );
}

export default AuthLayout