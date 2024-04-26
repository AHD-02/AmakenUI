


import { colors } from "@/app/theme/Colors";
import { Archive } from "@/assets/icons";
import { EventImage } from "@/assets/images";
import { HStack, Image, Pressable, VStack, Text, View } from "native-base";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";

interface IProps {
  title: string;
  city: string;
  onPress: () => void;
  image: any;
  description: string;
}

const CustomCard = ({
  title,
  city,
  description,
  image,
  onPress,
}: IProps) => {
  return (
    <TouchableOpacity>
      <ImageBackground
        resizeMode="cover"
        source={image}
        borderRadius={8}
        imageStyle={styles.backgroundImage}
      >
        <VStack height={'48'} justifyContent={'space-between'}>

          <View alignItems={'flex-end'} margin={2}>
            <TouchableOpacity style={styles.icon} onPress={() => { }}>
              <Archive />
            </TouchableOpacity>
          </View>

          <View>
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
          </View>
        </VStack>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: 174
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

export default CustomCard;

