import React, { useState } from "react";
import { ScrollView, View, Text, Modal, Button, Center } from "native-base";
import { useIsLoggedIn } from "@/app/state/user/hooks";
import TabbssScreen from "@/components/editProfile/tabbssScreen";
import ProfileHeader from "@/components/profile/profileHeader";
import GuestScreen from "@/components/sharedComponents/guestUserSscreen/guestScreen";
import { router } from "expo-router";
import { ButtonComponent } from "@/components/sharedComponents";

const Profile = () => {
  const isLoggedIn = useIsLoggedIn();
  const [ShowOwner, setShowOwner] = useState<boolean>(false);

  return (
    <View style={{ flex: 1 }}>
      {isLoggedIn ? (
        <View style={{ backgroundColor: "white", height: "105%" }}>
          <ScrollView>
            <ProfileHeader />
            <TabbssScreen />
          </ScrollView>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Button
              onPress={() => setShowOwner(true)}
              size="md"
              style={{
                backgroundColor: "#d3af37",
                alignSelf: "flex-end",
                bottom: 50,
                right: 20,
              }}
            >
              Become an Owner
            </Button>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1, paddingTop: 150 }}>
          <GuestScreen
            title="Searching for your Bookings?"
            description="Login to find them all"
          />
        </View>
      )}

      <Modal isOpen={ShowOwner} onClose={() => setShowOwner(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.Body justifyContent={"center"} padding={3}>
            <Center>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 20,
                  paddingTop: 15,
                  paddingBottom: 10,
                }}
              >
                Do you have a unique private place that fits one of our
                categories? Share it with the world and let people discover its
                charm!
              </Text>
            </Center>
            <Center>
              <ButtonComponent
                title="Become an Owner"
                onPress={() => {
                  router.push("/(details)/addPrivatePlace");
                  setShowOwner(false);
                }}
              />
            </Center>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default Profile;
