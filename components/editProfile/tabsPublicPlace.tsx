import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import TabsEvent, { TabsButtonsType } from "./tabsEvent";
import { PublicPlaceResponse, SearchEventsResponse } from "@/app/types";
import EventCard from "../homePageComponent/eventCard";
import { useSearchEventsQuery } from "@/app/data/events";
import { useSearchPublicPlacesQuery } from "@/app/data/publicPlace";
import { VStack, HStack, Link } from "native-base";
import { router } from "expo-router";

export enum CustomTab {
  PublicPlace,
  Events,
}
const TabsPublicPlace = () => {
  const [selectedTab, setSelectedTab] = useState<CustomTab>(
    CustomTab.PublicPlace
  );
  const { data: events } = useSearchEventsQuery();
  const { data: publicPlaces } = useSearchPublicPlacesQuery();

  const buttons: TabsButtonsType[] = [
    { title: "Public Place" },
    { title: "Events" },
  ];

  return (
    <View>
      <TabsEvent
        buttons={buttons}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <View style={{ marginTop: 20, alignItems: "center" }}>
        {selectedTab === CustomTab.PublicPlace ? (
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
                        onPress={() => {}}
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
        ) : (
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
                        onPress={() => {}}
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
        )}
      </View>
    </View>
  );
};

export default TabsPublicPlace;
