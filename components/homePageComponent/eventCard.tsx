import { useIsEventSaved } from "@/app/state/user/hooks";
import { colors } from "@/app/theme/Colors";
import { Archive, ArchiveGray } from "@/assets/icons";
import { AntDesign } from "@expo/vector-icons";
import { HStack, Image, Pressable, VStack, Text, View } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";

interface IProps {
  title: string;
  city: string;
  onPress: () => void;
  image: any;
  description: string;
  rate: string;
  id?: string
}

const EventPage = ({
  title,
  city,
  description,
  image,
  onPress,
  rate,
  id,
}: IProps) => {

  const isSaved = useIsEventSaved(id ?? '')
console.log(isSaved, id)
  return (
    <Pressable onPress={onPress} marginRight={4}>
      <VStack>
        <HStack width={"100%"}>
          <Image source={image} height={160} width={300} borderRadius={10} />
        </HStack>
        <View style={[styles.icon, isSaved ? {backgroundColor: colors.primary} : {}]}>
        <TouchableOpacity onPress={() => { }}>
          {isSaved ? <Archive /> : <ArchiveGray />}
        </TouchableOpacity>
      </View>
      <HStack justifyContent={"space-between"} paddingTop={3} paddingX={1}>
        <Text fontWeight={700}>{`${title ?? ""} - ${city ?? ""}`}</Text>
        <HStack space={1}>
          <AntDesign name="star" color={'#F7CB15'} size={18} style={{ alignSelf: 'center' }} />
          <Text fontWeight={700}>{rate ?? ''}</Text>
        </HStack>
      </HStack>
      <HStack paddingTop={3} paddingX={1}>
        <Text>{description ?? ""}</Text>
      </HStack>
    </VStack>
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
})

export default EventPage;