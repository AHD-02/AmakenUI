


import { Archive } from "@/assets/icons";
import { EventImage } from "@/assets/images";
import { HStack, Image, Pressable, VStack, Text, View, Box } from "native-base";
import { ImageBackground ,StyleSheet} from "react-native";

interface IProps {
  title: string;
  city: string;
  onPress: () => void;
  image: any;
  description: string;
  rate: string;
}

const CustomCard = ({
  title,
  city,
  description,
  image,
  onPress,
  rate,
}: IProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Box style={styles.box}>
        
          <ImageBackground 
           resizeMode="cover"
            source={image}
            height={209}
            width={150}
            borderRadius={8}
          >
            <View style={styles.icon}>
            <Archive/>
            </View>

            
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
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
              >{description}</Text>
          </ImageBackground>
      </Box>
     
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
   
  },
  box:{
    width:165,
    height:209,
    borderRadius:8,
    margin:10
  },  
  icon: {
    alignItems: 'flex-end',
    paddingTop:10,
    paddingRight:10,
    backgroundColor:'#A5583A'
    

  },

});

export default CustomCard;

