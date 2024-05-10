import React from "react";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import { HomeIcon, ProfileIcon, SavedIcon, TicketsIcon } from "@/assets/icons";
import { useIsLoggedIn, useUserInfo } from "../state/user/hooks";
import { Avatar } from "native-base";
import { colors } from "../theme/Colors";


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const data = useUserInfo()
  const isLoggedIn = useIsLoggedIn()

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
          tabBarIcon: ({ color, focused }) => <HomeIcon borderColor={focused ? colors.primary : undefined}/>,
          tabBarActiveTintColor: colors.primary
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ color, focused }) => <SavedIcon borderColor={focused ? colors.primary : undefined}/>,
          tabBarActiveTintColor: colors.primary
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: "Booking",
          tabBarIcon: ({ color, focused }) => <TicketsIcon borderColor={focused ? colors.primary : undefined}/>,
          tabBarActiveTintColor: colors.primary
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => isLoggedIn ? <Avatar size={"xs"} source={{
            uri: (Array.isArray(data?.images) && data?.images[0]) ? data?.images[0] : undefined
          }}>{`${data?.firstName?.charAt(0)}${data?.lastName?.charAt(0)}`}</Avatar> : <ProfileIcon borderColor={focused ? colors.primary : ''}/>,
          tabBarActiveTintColor: colors.primary
        }}
      />
    </Tabs>
  );
}
