import React from "react";
import { Stack, router } from "expo-router";
import { ArrowLeft } from "@/assets/icons";
import { TouchableOpacity } from "react-native";

const NotificationsLayout = () => {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="events/[eventId]" options={{ headerShown: false }} />
      <Stack.Screen name="place/[placeId]" options={{ headerShown: false }} />
      <Stack.Screen name="privatePlace/[privatePlaceId]" options={{ headerShown: false }} />
      <Stack.Screen
        name="viewAll/viewAllEvents"
        options={{
          headerShown: true,
          headerBackTitle: "ArrowLeft",
          headerTitle: "View All Events ",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 16 },
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
        name="viewAll/viewAllPlaces"
        options={{
          headerShown: true,
          headerBackTitle: "ArrowLeft",
          headerTitle: "View All Public Place",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 16 },
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
        name="addPublicPlace"
        options={{
          headerShown: true,
          headerBackTitle: "ArrowLeft",
          headerTitle: "Create New Public Place",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 16 },
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
        name="addEvent"
        options={{
          headerShown: true,
          headerBackTitle: "ArrowLeft",
          headerTitle: "Create New Event",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 16 },
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
        name="addPrivatePlace"
        options={{
          headerShown: true,
          headerBackTitle: "ArrowLeft",
          headerTitle: "Create Private Place",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 16 },
          headerStyle: { backgroundColor: "white" },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default NotificationsLayout;
