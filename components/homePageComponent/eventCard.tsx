import { EventImage } from "@/assets/images";
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
    <Pressable onPress={onPress}>
      <VStack paddingBottom={5}>
        <HStack width={"100%"} >
          <Image source={image} height={160} width={300} borderRadius={10} />
        </HStack>
        <HStack justifyContent={"spa+ce-between"} paddingTop={3} paddingX={1}>
          <Text fontWeight={700}>{`${title ?? ""} - ${city ?? ""}`}</Text>
          <View>
            <Text>{`${rate ?? ""} (${4})`}</Text>
          </View>
        </HStack>
        <HStack paddingTop={3} paddingX={1}>
          <Text>{description ?? ""}</Text>
        </HStack>
      </VStack>
    </Pressable>
  );
};
export default EventPage;
