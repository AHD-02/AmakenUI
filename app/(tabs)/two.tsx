import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { ButtonComponent, TextInput } from '@/components/sharedComponents';
import { VStack } from 'native-base';
import CustomCard from '@/components/homePageComponent/customCard';
import { EventImage } from '@/assets/images';

export default function TabTwoScreen() {
  return (
    <CustomCard
    title={"Burj Al Hamam"}
    city={"Dead Sea"}
    image={EventImage}
    onPress={() => {}}
    rate={"3.5"}
    description={"Crowne Plaza Dead Sea Resort & Spa.."}
  />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
    gap: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

