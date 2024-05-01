import { View } from '@/components/Themed';
import { HStack, ScrollView, VStack } from 'native-base';
import { EventImage } from '@/assets/images';
import DynamicHeader from '@/components/header';
import PlaceCard from '@/components/homePageComponent/placeCard';
import { useSearchSavedEventsQuery } from '../data/events';
import { SearchEventsResponse } from '../types';

const Saved = () => {
  const {data} = useSearchSavedEventsQuery()
  
  return (
    <View style={{ flex: 1 }}>
      <DynamicHeader isBGHidden/>

      <ScrollView pt={6} mx={4}>
        <HStack justifyContent={'space-between'} flexWrap={'wrap'} width={'100%'}>
          {data?.map((item: SearchEventsResponse) =>
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