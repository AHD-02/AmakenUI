import { View } from '@/components/Themed';
import { HStack, ScrollView, VStack } from 'native-base';
import { EventImage } from '@/assets/images';
import DynamicHeader from '@/components/header';
import PlaceCard from '@/components/homePageComponent/placeCard';
import { useSearchSavedEventsQuery } from '../data/events';
import { SearchEventsResponse } from '../types';
import { router } from 'expo-router';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

const Saved = () => {
  const { data, error } = useSearchSavedEventsQuery()

  useEffect(() => {
    if (error)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: (error as any).status == '401' ? 'Please SignIn to see your saved' : JSON.stringify((error as any).data ?? '')
      })
  }, [error])
  return (
    <View style={{ flex: 1 }}>
      <DynamicHeader isBGHidden />

      <ScrollView pt={6} mx={4}>
        <HStack justifyContent={'space-between'} flexWrap={'wrap'} width={'100%'}>
          {data?.map((item: SearchEventsResponse) =>
            <View style={{ width: '48%', marginBottom: 10 }}>
              <PlaceCard
                title={item.name ?? ""}
                city={item.location ?? ''}
                image={item.images[0]}
                description={item.description ?? ''}
                onCardPress={() => router.push(`/(details)/events/${item.eventId ?? ''}`)}
              />
            </View>
          )}
        </HStack>
      </ScrollView>
    </View>
  );
}

export default Saved