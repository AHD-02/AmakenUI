import React from "react";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import { HomeIcon, ProfileIcon, SavedIcon, TicketsIcon } from "@/assets/icons";
import { useIsLoggedIn, useUserInfo } from "../state/user/hooks";
import { Avatar } from "native-base";
import { colors } from "../theme/Colors";
import { imageUrlResolver } from "../utils/imageUtils";


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const data = useUserInfo()
  const isLoggedIn = useIsLoggedIn()

  const getFirstChars = (s1: string, s2: string) => {
    return `${s1?.charAt(0) ?? "-"}${s2.charAt(0) ?? "-"}`
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => <HomeIcon borderColor={focused ? colors.primary : undefined} />,
          tabBarActiveTintColor: colors.primary
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ color, focused }) => <SavedIcon borderColor={focused ? colors.primary : undefined} />,
          tabBarActiveTintColor: colors.primary
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: "Booking",
          tabBarIcon: ({ color, focused }) => <TicketsIcon borderColor={focused ? colors.primary : undefined} />,
          tabBarActiveTintColor: colors.primary
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => isLoggedIn ?
            <Avatar width={25} height={25} source={{
              uri: (Array.isArray(data?.images) && data?.images?.length > 0) ? imageUrlResolver(data?.images[0] ?? "") : undefined
            }}>{getFirstChars(data?.firstName ?? "", data?.lastName ?? "")}
            </Avatar>
            : <ProfileIcon borderColor={focused ? colors.primary : undefined} />,
          tabBarActiveTintColor: colors.primary
        }}
      />
    </Tabs>
  );
}
