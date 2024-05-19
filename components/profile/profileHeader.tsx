import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import {
  Modal,
  Avatar,
  Center,
  HStack,
  Image,
  VStack,
} from "native-base";
import { EditProfileIcon, LogoutIcon, ModalIconLogout } from "@/assets/icons";
import { colors } from "@/app/theme/Colors";
import { useIsLoggedIn, useUserInfo } from "@/app/state/user/hooks";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { setTokens, setUser } from "@/app/state/user/slice";
import { UserInitialValues } from "@/app/types";
import { reloadAsync } from "expo-updates";
import { FontAwesome } from "@expo/vector-icons";
import { ButtonComponent } from "../sharedComponents";
import { imageUrlResolver } from "@/app/utils/imageUtils";

const ProfileHeader = () => {
  const isLoggedIn = useIsLoggedIn();
  const userData = useUserInfo();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    dispatch(
      setTokens({
        accessToken: "",
      })
    );
    router.push("/(auth)");
    setShowModal(false);
    reloadAsync();
  };
  return (
    <HStack justifyContent={"space-between"} marginX={4} marginY={"20"}>
      <TouchableOpacity style={styles.logoutButton} onPress={() => setShowModal(true)}>

        <Center>
        <LogoutIcon />
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">
              <Modal.Body justifyContent={'center'}>
                <Center> 
                <TouchableOpacity  onPress={handleLogout}>
                <ModalIconLogout/>
                </TouchableOpacity>
                </Center>
                <Center>
                  <Text style={{fontWeight:'500',fontSize:20,paddingTop:15,paddingBottom:10}}>Already Leaving</Text>
                </Center>
                <Center>
                  <ButtonComponent  title="Yes, Logout" onPress={handleLogout} isLogout />
                </Center>
                <Center>
                  <TouchableOpacity onPress={()=> setShowModal(false)}>
                  <Text style={{fontSize:18,fontWeight:'500',color:'#8E8E93',paddingTop:20}}>
                  No, I am stying
                  </Text>
                  </TouchableOpacity>
                </Center>

              </Modal.Body>
              
            </Modal.Content>
          </Modal>
        </Center>
      </TouchableOpacity>
      <VStack space={2}>
          <VStack>
            <View style={styles.profileImage}>
              <Image
                src={imageUrlResolver(userData?.images?.[0] ?? "")}
                alt="User Image"
                width={"full"}
                height={"full"}
                borderRadius={50}
              />
            </View>
            <Text style={styles.userName}>
              {`${userData?.firstName ?? ""} ${userData?.lastName ?? ""}`}
            </Text>
          </VStack>
      
      </VStack>
      <TouchableOpacity
        onPress={() => router.push("/(profile)/editProfile")}
        style={styles.editButton}
      >
        <EditProfileIcon />
      </TouchableOpacity>
    </HStack>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: "#C32B43",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },
  editButton: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: "#27AE60",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },
  profileImage: {
    height: 100,
    width: 100,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 50,
  },
  userName: {
    color: "#191E3A",
    fontWeight: "500",
    fontSize: 20,
  },
});
export default ProfileHeader;
