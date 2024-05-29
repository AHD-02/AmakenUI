import React, { useState } from "react";
import { Tabs } from "expo-router";
import { TouchableOpacity, useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import { HomeIcon, ProfileIcon, SavedIcon, TicketsIcon } from "@/assets/icons";
import { useIsLoggedIn, useUserInfo } from "../state/user/hooks";
import { Avatar } from "native-base";
import { colors } from "../theme/Colors";
import { imageUrlResolver } from "../utils/imageUtils";
import { getFirstChars } from "../utils/globalUtils";
import ActionSheetScreen from "@/components/sharedComponents/guestUserSscreen/actionsheet";



export default function TabLayout() {
  const colorScheme = useColorScheme();
  const data = useUserInfo();
  const isLoggedIn = useIsLoggedIn();
  const [showAction, setShowAction] = useState(false);



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
          headerShown:true,
          headerShadowVisible:false ,
          tabBarIcon: ({ color, focused }) => isLoggedIn ?
          <SavedIcon borderColor={focused ? colors.primary : undefined} />
          :
          <TouchableOpacity onPress={() =>setShowAction(true)}>
          <ActionSheetScreen
          title='Sign In'
          description='Discover events, meet new people and make memories'
          isOpen={showAction}
          onClose={()=>setShowAction(false)}
          />
          <SavedIcon borderColor={focused ? colors.primary : undefined} />
          </TouchableOpacity>,
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
              uri: (Array.isArray(data?.images) && data?.images?.length > 0) ? imageUrlResolver(data?.images[0] ?? "") : undefined }}>
                {getFirstChars(data?.firstName ?? "", data?.lastName ?? "")}
            </Avatar>
            : <ProfileIcon borderColor={focused ? colors.primary : undefined} />,
          tabBarActiveTintColor: colors.primary
        }}
      />
    </Tabs>
  );
}
