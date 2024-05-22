import { View, ScrollView } from 'react-native'
import React from 'react'
import { PublicPlaceResponse } from '@/app/types'
import { router } from 'expo-router'
import { VStack, HStack } from 'native-base'
import { useSearchPublicPlacesQuery } from '@/app/data/publicPlace'

import DynamicHeader from '@/components/header'
import PlaceCard from '@/components/homePageComponent/placeCard'
import { useIsLoggedIn } from '@/app/state/user/hooks'
const viewAllPlaces = () => {
  const { data } = useSearchPublicPlacesQuery();
  const isLoggedIn = useIsLoggedIn();

  
  return (
    <View style={{backgroundColor:"white",padding:10}}>
        
      <ScrollView>
                <VStack style={{ paddingHorizontal: 20 }} space={5}>
                    <ScrollView>
                        <HStack
                            justifyContent={"space-between"}
                            space={3}
                            flexWrap={"wrap"}
                        >
                            {data?.map((item: PublicPlaceResponse) => (
                                <PlaceCard
                                    key={`${item?.publicPlaceId}-${item.userEmail}`}
                                    title={item.name ?? ""}
                                    city={item.location ?? ""}
                                    image={item.images[0] ?? ''}
                                    description={item.description ?? ""}
                                    onCardPress={() =>
                                        router.push(`/(details)/place/${item.publicPlaceId}`)
                                    }
                                />
                            ))}
                        </HStack>
                    </ScrollView>
                </VStack>
            </ScrollView>  
          </View>
  )
}

export default viewAllPlaces