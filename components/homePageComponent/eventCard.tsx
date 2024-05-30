import { colors } from "@/app/theme/Colors";
import { Archive, ArchiveGray, LocationIcon } from "@/assets/icons";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { HStack, Image, Pressable, Text, View } from "native-base";
import { useSaveEventMutation, useUnSaveEventMutation } from "@/app/data/events";
import { useEffect, useMemo, useState } from "react";
import { useUserInfo } from "@/app/state/user/hooks";
import RefreshUser from "@/app/hooks/refreshUser";
import ActionSheetScreen from "../sharedComponents/guestUserSscreen/actionsheet";
import { useDispatch } from "react-redux";
import { UserApi } from "@/app/data";

interface IProps {
  title: string;
  city: string;
  onPress: () => void;
  onCardPress?: () => void;
  onSavedPress?: () => void;
  image: string;
  description: string;
  rate: string;
  id?: string;
  isBookingComponent?: boolean;
}

const EventPage = ({
  title,
  city,
  description,
  image,
  onPress,
  onSavedPress,
  rate,
  id,
  isBookingComponent,
}: IProps) => {
  const [saveEvent, saveRes] = useSaveEventMutation();
  const [unSaveEvent, unSaveRes] = useUnSaveEventMutation();
  const { handle } = RefreshUser()
  const userInfo = useUserInfo()
  const [isAskToLogin, setIsAskToLogin] = useState<boolean>(false)
  const dispatch = useDispatch()

  const isEventSaved = useMemo(() =>
    userInfo?.savedEvents?.includes(id ?? '')
    , [userInfo])

  const toggleSaveEvent = async () => {
    if (userInfo.email) {
      isEventSaved ? await unSaveEvent(id ?? '') : await saveEvent(id ?? '')
    } else
      setIsAskToLogin(true)
  }

  useEffect(() => {
    if (Boolean(saveRes.isSuccess || unSaveRes.isSuccess || saveRes.error || unSaveRes.error)) {
      handle()
      dispatch(UserApi.util.invalidateTags(['refreshSaved']))
    }
  }, [saveRes, unSaveRes])

  return (
    <>
      <Pressable onPress={onPress} marginRight={isBookingComponent ? 1 : 4} style={[styles.shadow]}>
        <HStack width="100%">
          <Image
            source={{ uri: image }}
            height={160}
            width={isBookingComponent ? 'full' : 300}
            resizeMode="cover"
            borderTopLeftRadius={10}
            borderTopRightRadius={10}
            borderBottomLeftRadius={isBookingComponent ? 0 : 10}
            borderBottomRightRadius={isBookingComponent ? 0 : 10}
            alt="event image" 
          />
        </HStack>

        <HStack
          justifyContent="space-between"
          paddingTop={3}
          paddingX={1}
          paddingLeft={isBookingComponent ? 3 : 0}
          backgroundColor={isBookingComponent ? "white" : ""}
        >
          <Text fontWeight={700} fontFamily="Poppins" fontSize={14}>
            {`${title} - ${city}`}
          </Text>
          <HStack space={1}>
            <AntDesign
              name="star"
              color="#F7CB15"
              size={18}
              style={{ alignSelf: "center" }}
            />
            <Text fontWeight={700}>{rate}</Text>
          </HStack>
        </HStack>

        <View style={[styles.icon, isEventSaved ? { backgroundColor: colors.primary } : {}]}>
          <TouchableOpacity onPress={toggleSaveEvent}>
            {isEventSaved ? <Archive /> : <ArchiveGray />}
          </TouchableOpacity>
        </View>

        <HStack
          paddingTop={3}
          paddingBottom={2}
          paddingX={1}
          paddingLeft={isBookingComponent ? 3 : 0}
          marginBottom={isBookingComponent ? 3 : 0}
          backgroundColor={isBookingComponent ? "white" : ""}
          borderBottomLeftRadius={isBookingComponent ? 10 : 0}
          borderBottomRightRadius={isBookingComponent ? 10 : 0}
        >
          <LocationIcon />
          <Text
            color="#8E8E93"
            fontFamily="Poppins"
            fontSize={12}
            fontWeight={600}
            paddingLeft={3}
            maxWidth={290}
            noOfLines={1}
          >
            {description}
          </Text>
        </HStack>
      </Pressable>
      <ActionSheetScreen isOpen={isAskToLogin} onClose={() => setIsAskToLogin(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 5,
    top: 9,
    height: 30,
    width: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: "100%",
    flex: 1,
  },
    shadow: {
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
        
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
});

export default EventPage;
