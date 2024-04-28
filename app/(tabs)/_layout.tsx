import React from "react";
import { Tabs } from "expo-router";
import { useColorScheme, View } from "react-native";
import Colors from "@/constants/Colors";
import { HomeIcon, ProfileIcon, SavedIcon, TicketsIcon } from "@/assets/icons";
import DynamicHeader from "@/components/header";


export default function TabLayout() {
  const colorScheme = useColorScheme();

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
          tabBarIcon: ({ color }) => <HomeIcon />,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ color }) => <SavedIcon />,
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: "Booking",
          tabBarIcon: ({ color }) => <TicketsIcon />,
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <ProfileIcon />,
        }}
      />
    </Tabs>
  );
}
