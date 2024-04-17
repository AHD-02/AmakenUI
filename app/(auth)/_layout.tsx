import { SCREENS } from "@/components/screens";
import { Stack } from "expo-router";
const AuthLayout = () => {

  return (
      <Stack screenOptions={{}}>
        <Stack.Screen name={SCREENS.Login} options={{ headerShown: false, title: 'Login' }} />
        <Stack.Screen name={SCREENS.Signup} options={{ title: 'Create new account', headerBackTitleVisible: false }} />
        <Stack.Screen name={SCREENS.ForgotPassword} options={{ title: 'Forgot Password' }} />
        <Stack.Screen name={SCREENS.SetNewPassword} options={{ title: 'SetNewPssword' }} />
        <Stack.Screen name={SCREENS.OTP} options={{ title: 'OTP' }} />
      </Stack>
  );
}

export default AuthLayout