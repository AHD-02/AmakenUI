


import { colors } from "@/app/theme/Colors";
import { Archive } from "@/assets/icons";
import { VStack, Text, View } from "native-base";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";

interface IProps {
  title: string;
  city: string;
  onCardPress?: () => void;
  onSavedPress?: () => void;
  image: any;
  description: string;
}

const PlaceCard = ({
  title,
  city,
  description,
  image,
  onCardPress,
  onSavedPress,
}: IProps) => {
  return (
    <TouchableOpacity style={{flex: 1}} onPress={onCardPress}>
      <ImageBackground
        resizeMode="cover"
        source={{uri: image ?? undefined}}
        borderRadius={8}
        imageStyle={styles.backgroundImage}
        alt="image"
      >
        <VStack height={'56'} justifyContent={'space-between'}>

          <View alignItems={'flex-end'} margin={2}>
            <TouchableOpacity style={styles.icon} onPress={onSavedPress}>
              <Archive />
            </TouchableOpacity>
          </View>

          <VStack space={3} mx={2} mb={3}>
            <Text
              fontWeight={600}
              fontFamily={"Cairo"}
              fontSize={14}
              color={"white"}
            >{`${title ?? ""} - ${city ?? ""}`}</Text>

            <Text
              fontWeight={500}
              fontFamily={"Cairo"}
              fontSize={10}
              color={"#C8C8C8"}
            >
              {description}
            </Text>
          </VStack>
        </VStack>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    flex: 1,
  },
  icon: {
    borderRadius: 50,
    width: 30,
    height: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },

});

export default PlaceCard;

