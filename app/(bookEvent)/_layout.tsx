import React from "react";
import { Stack, router } from "expo-router";
import { ArrowLeft, CloseIcon } from "@/assets/icons";
import { TouchableOpacity } from "react-native";

const BookEventLayout = () => {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerTitle: "Reserve an event",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 16, fontWeight: '600' },
          headerStyle: { backgroundColor: "white" },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ticket/[reservation]"
        options={{
          headerShown: true,
          headerTitle: "Ticket",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 16, fontWeight: '600' },
          headerStyle: { backgroundColor: "white" },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace('/(tabs)/')}>
              <CloseIcon />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default BookEventLayout;
