import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Center, HStack, ScrollView, VStack ,Image, Stack} from "native-base";
import Events from "@/components/profile/events";
import PublicPlaces from "@/components/profile/publicPlaces";
import { useIsLoggedIn } from "@/app/state/user/hooks";
import TabbssScreen from "@/components/editProfile/tabbssScreen";
import ProfileHeader from "@/components/profile/profileHeader";
import GuestScreen from "@/components/sharedComponents/guestUserSscreen/guestScreen";

interface TabsType {
  title: string;
  component: React.JSX.Element;
}

const Profile = () => {
  const isLoggedIn = useIsLoggedIn();
  const sceneMap = {
    events: Events,
    publicPlaces: PublicPlaces,
  };
  const tabs: TabsType[] = [
    { title: "events", component: <Events /> },
    { title: "place", component: <PublicPlaces /> },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <VStack space={3} height={"100%"}>
        {isLoggedIn ? (
          <ScrollView>
              <ProfileHeader />
              <TabbssScreen/>
          </ScrollView>
          
        ) : (
          <View style={{flex:1,paddingTop:150}}>
          <GuestScreen
          title="Searching for your Bookinngs?"
          description="Login to find them all"
          />
          </View>
        )}
      </VStack>
    </View>
  );
};

export default Profile;
