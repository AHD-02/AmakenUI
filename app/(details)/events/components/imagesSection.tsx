import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Image } from "native-base";
import { Archive, ArchiveGray, ArrowLeft } from "@/assets/icons";
import { router } from "expo-router";
import { SearchEventsResponse } from "@/app/types";
import { useUserInfo } from "@/app/state/user/hooks";
import { colors } from "@/app/theme/Colors";
import { imageUrlResolver } from "@/app/utils/imageUtils";
import { useSaveEventMutation, useUnSaveEventMutation } from "@/app/data/events";
import RefreshUser from "@/app/hooks/refreshUser";
import ActionSheetScreen from "@/components/sharedComponents/guestUserSscreen/actionsheet";

interface IProps {
  data?: SearchEventsResponse;
}

const ImagesSection = ({ data }: IProps) => {
  const [saveEvent, saveRes] = useSaveEventMutation();
  const [unSaveEvent, unSaveRes] = useUnSaveEventMutation();
  const { handle } = RefreshUser()
  const userInfo = useUserInfo()
  const [isAskToLogin, setIsAskToLogin] = useState<boolean>(false)

  const isSaved = useMemo(() =>
    userInfo?.savedEvents?.includes(data?.eventId ?? '')
    , [userInfo])

  const toggleSaveEvent = async () => {
    if (userInfo.email) {
      isSaved ? await unSaveEvent(data?.eventId ?? '') : await saveEvent(data?.eventId ?? '')
    } else
      setIsAskToLogin(true)
  }

  useEffect(() => {
    if (Boolean(saveRes.isSuccess || unSaveRes.isSuccess || saveRes.error || unSaveRes.error))
      handle()
  }, [saveRes, unSaveRes])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.bottonContainer}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.bottonContainer,
            isSaved ? { backgroundColor: colors.primary } : {},
          ]}
        >
          <TouchableOpacity onPress={toggleSaveEvent}>
            {isSaved ? <Archive /> : <ArchiveGray />}
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Image
          src={imageUrlResolver(data?.images?.[0] ?? "")}
          width={"full"}
          height={"full"}
          alt={"image"}
          resizeMode="cover"
        />
      </View>
      <ActionSheetScreen isOpen={isAskToLogin} onClose={() => setIsAskToLogin(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 65,
    paddingHorizontal: 20,
    zIndex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottonContainer: {
    backgroundColor: "white",
    borderRadius: 50,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ImagesSection;
