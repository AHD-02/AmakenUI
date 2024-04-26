import { AntDesign } from "@expo/vector-icons";
import { HStack, Image, Pressable, VStack, Text, View } from "native-base";

interface IProps {
  title: string;
  city: string;
  onPress: () => void;
  image: any;
  description: string;
  rate: string;
}

const EventPage = ({
  title,
  city,
  description,
  image,
  onPress,
  rate,
}: IProps) => {
  return (
    <Pressable onPress={onPress} marginRight={4}>
      <VStack>
        <HStack width={"100%"}>
          <Image source={image} height={160} width={300} borderRadius={10} />
        </HStack>
        <HStack justifyContent={"space-between"} paddingTop={3} paddingX={1}>
          <Text fontWeight={700}>{`${title ?? ""} - ${city ?? ""}`}</Text>
          <HStack space={1}>
            <AntDesign name="star" color={'#F7CB15'} size={18} style={{alignSelf: 'center'}}/>
            <Text fontWeight={700}>{rate ?? ''}</Text>
          </HStack>
        </HStack>
        <HStack paddingTop={3} paddingX={1}>
          <Text>{description ?? ""}</Text>
        </HStack>
      </VStack>
    </Pressable>
  );
};
export default EventPage;
