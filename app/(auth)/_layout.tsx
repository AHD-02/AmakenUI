import { ArrowLeft } from "@/assets/icons";
import { SCREENS } from "@/components/screens";
import { Stack, router } from "expo-router";
import { TouchableOpacity } from "react-native";
const AuthLayout = () => {

  return (
      <Stack screenOptions={{}}>
        <Stack.Screen name={SCREENS.Login} options={{ headerShown: false, title: 'Login' }} />
        <Stack.Screen name={SCREENS.Signup} options={{   headerShown: true,
                headerBackTitle: 'ArrowLeft',
                headerTitle: 'Create new account',
                headerTitleAlign: 'center',
                headerTitleStyle:{fontSize:16},
                headerStyle:{backgroundColor:'white'},
                headerShadowVisible:false   ,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft />
                    </TouchableOpacity>
                ),   }} />
        <Stack.Screen name={SCREENS.ForgotPassword} options={{   headerShown: true,
                headerBackTitle: 'ArrowLeft',
                headerTitle: 'Forgot Password',
                headerTitleAlign: 'center',
                headerTitleStyle:{fontSize:16},
                headerStyle:{backgroundColor:'white'},
                headerShadowVisible:false   ,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft />
                    </TouchableOpacity>
                ),   }} />
        <Stack.Screen name={SCREENS.SetNewPassword} options={{ title: 'SetNewPssword' }} />
        <Stack.Screen name={SCREENS.OTP} options={{ title: 'OTP' }} />
        <Stack.Screen name={SCREENS.Categories} options={{ title: 'Interestes' }} />
      </Stack>
  );
}

export default AuthLayout