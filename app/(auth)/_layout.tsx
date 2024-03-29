import { SCREENS } from "@/components/screens";
import { Stack } from "expo-router";

const AuthLayout = () => {

  return (
      <Stack>
        <Stack.Screen name={SCREENS.Login} options={{ headerShown: false }} />
      </Stack>
  );
}

export default AuthLayout