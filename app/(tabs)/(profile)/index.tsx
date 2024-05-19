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
import { ButtonComponent } from "@/components/sharedComponents";
import { router } from "expo-router";
import { useIsLoggedIn } from "@/app/state/user/hooks";
import { LOGO } from "@/assets/images";
import TabbssScreen from "@/components/editProfile/tabbssScreen";
import ProfileHeader from "@/components/profile/profileHeader";

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
          <VStack
            style={{ height: "100%", marginHorizontal: 36 }}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <Stack paddingTop={20} paddingBottom={20} >
              <Image source={LOGO} height={250} width={280} />
              </Stack>
              <Stack justifyContent={'center'} paddingBottom={10}>
                <Text style={{fontSize:24,fontWeight:'600',paddingBottom:30}}>Searching for your Bookinngs?</Text>
                <Text style={{alignSelf:'center',fontSize:18,fontWeight:500,color:"#8E8E93"}}>
                  Login to find them all.
                </Text>
              </Stack>
              <Stack>
            <ButtonComponent
              title="Login or Signup"
              onPress={() => router.navigate("(auth)/")}
            />
            </Stack>
          </VStack>
        )}
      </VStack>
    </View>
  );
};

export default Profile;
