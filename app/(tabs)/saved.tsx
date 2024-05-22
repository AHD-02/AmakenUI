import { View } from '@/components/Themed';
import { HStack, ScrollView, VStack } from 'native-base';
import DynamicHeader from '@/components/header';
import PlaceCard from '@/components/homePageComponent/placeCard';
import { useSearchSavedEventsQuery } from '../data/events';
import { SearchEventsResponse } from '../types';
import { router } from 'expo-router';
import { useIsLoggedIn } from '../state/user/hooks';
import GuestScreen from '@/components/sharedComponents/guestUserSscreen/guestScreen';
import { imageUrlResolver } from '../utils/imageUtils';

const Saved = () => {
  const { data } = useSearchSavedEventsQuery();
  const isLoggedIn = useIsLoggedIn();


  return (
    <View style={{ flex: 1 }}>
      <DynamicHeader isBGHidden />
      {isLoggedIn?(

      <ScrollView pt={6} mx={4}>
        <HStack justifyContent={'space-between'} flexWrap={'wrap'} width={'100%'}>
          {data?.map((item: SearchEventsResponse) =>
            <View style={{ width: '48%', marginBottom: 10 }}>
              <PlaceCard
                title={item.name ?? ""}
                city={item.city ?? '-'}
                image={imageUrlResolver(item.images[0] ?? "")}
                description={item.description ?? ''}
                onCardPress={() => router.push(`/(details)/events/${item.eventId ?? ''}`)}
              />
            </View>
          )}
        </HStack>
      </ScrollView>
      ):(
        <GuestScreen
        title="Searching for your Bookinngs?"
        description="Login to find them all"
        />
      )}
    </View>
  );
}

export default Saved