import { View, ScrollView } from "react-native";
import React from "react";
import { MyPrivatePlacesModel, PrivateModel } from "@/app/types";
import { router } from "expo-router";
import { VStack, HStack } from "native-base";
import PlaceCard from "../homePageComponent/placeCard";
import { useMyPrivatePlacesQuery } from "@/app/data/user";
import { imageUrlResolver } from "@/app/utils/imageUtils";

const PrivatePlaces = () => {
    const { data } = useMyPrivatePlacesQuery();

    return (
        <View>
            <ScrollView>
                <VStack style={{ paddingHorizontal: 15 }} space={3}>
                    <ScrollView>

                        <HStack
                            justifyContent={"space-between"}
                            space={2}
                            flexWrap={"wrap"}
                        >
                            {data?.map((item: PrivateModel) => (
                                <View style={{ width: '32%', marginBottom: 25 }}>
                                    <PlaceCard
                                        key={`${item?.place?.placeId}-${item.place?.userEmail}`}
                                        title={item.place?.placeName ?? ""}
                                        city={"City"}
                                        image={imageUrlResolver(item.place?.images[0] ?? "")}
                                        description={item.place?.description ?? ""}
                                        onCardPress={() =>{
                                            // router.push(`/(details)/privatePlace/${item.place?.placeId}`)
                                            
                                        }
                                        }
                                    />
                                </View>
                            ))}
                        </HStack>
                    </ScrollView>
                </VStack>
            </ScrollView>
        </View>
    );
};

export default PrivatePlaces;