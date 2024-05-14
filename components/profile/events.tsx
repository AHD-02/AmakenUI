import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SearchEventsResponse } from '@/app/types'
import { router } from 'expo-router'
import { VStack, HStack } from 'native-base'
import EventCard from '../homePageComponent/eventCard'
import { useSearchEventsQuery } from '@/app/data/events'

const Events = () => {
  const { data: events } = useSearchEventsQuery();

    return (
        <View>
            <ScrollView>
                <VStack style={{ paddingHorizontal: 20 }} space={5}>
                    <HStack space={2} mt={4}>
                        <ScrollView>
                            {events?.map((item: SearchEventsResponse) => (
                                <EventCard
                                    key={`${item?.userEmail}-${item.eventId}`}
                                    isBookingComponent
                                    title={item.name ?? ""}
                                    city={item.location ?? ""} //TODO: ADD CITY
                                    image={item.images[0] ?? ""}
                                    onPress={() => { }}
                                    rate={"5.5"}
                                    onCardPress={() =>
                                        router.push(`/(details)/event/${item.eventId ?? ""}`)
                                    }
                                    description={item.description ?? ""} //TODO: add location description
                                />
                            ))}
                        </ScrollView>
                    </HStack>
                </VStack>
            </ScrollView>

        </View>
    )
}

export default Events