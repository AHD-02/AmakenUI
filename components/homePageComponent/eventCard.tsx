import { useIsEventSaved } from "@/app/state/user/hooks";
import { colors } from "@/app/theme/Colors";
import { Archive, ArchiveGray, LocationIcon } from "@/assets/icons";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { HStack, Image, Pressable, Text, View } from "native-base";

interface IProps {
  title: string;
  city: string;
  onPress: () => void;
  onCardPress?: () => void;
  onSavedPress?: () => void;
  image: string;
  description: string;
  rate: string;
  id?: string
  isBookingComponent?: boolean;
}

const EventPage = ({
  title,
  city,
  description,
  image,
  onPress,
  onCardPress,
  onSavedPress,
  rate,
  id,
  isBookingComponent,
}: IProps) => {

  const isSaved = useIsEventSaved(id ?? '')


  return (
    <Pressable onPress={onPress} marginRight={`${isBookingComponent ? 1 : 4}`}>

        <HStack width={"100%"} >
          <Image
            src={image ?? ""}
            height={160}
            width={isBookingComponent ? 'full' : '300'}
            resizeMode="cover"
            borderTopLeftRadius={10}
            borderTopRightRadius={10}
            borderBottomLeftRadius={isBookingComponent ? 0 : 10}
            borderBottomRightRadius={isBookingComponent ? 0 : 10} 
            alt={'image'}
          />
        </HStack>

      <HStack
        justifyContent={"space-between"}
        paddingTop={3}
        paddingX={1}
        paddingLeft={`${isBookingComponent ? 3 : 0}`}
        backgroundColor={`${isBookingComponent ? "white" : ""}`}
      >
        <Text fontWeight={700} fontFamily={"Poppins"} fontSize={14}>{`${title ?? ""
          } - ${city ?? ""}`}</Text>
        <HStack space={1}>
          <AntDesign
            name="star"
            color={"#F7CB15"}
            size={18}
            style={{ alignSelf: "center" }}
          />
          <Text fontWeight={700}>{rate ?? ""}</Text>
        </HStack>
      </HStack>
      <View style={[styles.icon, isSaved ? {backgroundColor: colors.primary} : {}]}>
        <TouchableOpacity onPress={() => { }}>
          {isSaved ? <Archive /> : <ArchiveGray />}
        </TouchableOpacity>
      </View>
      <HStack
        paddingTop={3}
        paddingBottom={2}
        paddingX={1}
        paddingLeft={`${isBookingComponent ? 3 : 0}`}
        marginBottom={`${isBookingComponent ? 3 : 0}`}
        backgroundColor={`${isBookingComponent ? "white" : ""}`}
        borderBottomLeftRadius={`${isBookingComponent ? 10 : 0}`}
        borderBottomRightRadius={`${isBookingComponent ? 10 : 0}`}
      >
        <LocationIcon />
        <Text
          color={"#8E8E93"}
          fontFamily={"Poppins"}
          fontSize={12}
          fontWeight={600}
          paddingLeft={3}
        >
          {description ?? ""}
        </Text>
      </HStack>

    </Pressable >
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 5,
    top: 9,
    height: 30,
    width: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    width: "100%",
    flex: 1,
  },
})

export default EventPage;