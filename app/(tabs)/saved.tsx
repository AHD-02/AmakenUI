import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { HStack, ScrollView, VStack } from 'native-base';
import { EventImage } from '@/assets/images';
import DynamicHeader from '@/components/header';
import PlaceCard from '@/components/homePageComponent/placeCard';

const Saved = () => {
  const data = [1, 2, 3, 4, 5, 5, 6, 6, 7, 7, 7]
  return (
    <View style={{ flex: 1 }}>
      <DynamicHeader isBGHidden/>

      <ScrollView pt={6} mx={4}>
        <HStack justifyContent={'space-between'} flexWrap={'wrap'} width={'100%'}>
          {data?.map((item: any) =>
            <View style={{ width: '48%', marginBottom: 10 }}>
              <PlaceCard
                title={item.name ?? ""}
                city={item.location ?? ''}
                image={EventImage} //TODO: item.images[0] 
                description={item.description ?? ''}
              />
            </View>
          )}
        </HStack>
      </ScrollView>
    </View>
  );
}

export default Saved