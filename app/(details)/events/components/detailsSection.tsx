import { View, Text, StyleSheet, Linking, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { SearchEventsResponse } from "@/app/types";
import { HStack, VStack } from "native-base";
import { LocationIcon } from "@/assets/icons";
import MapView, { Marker } from "react-native-maps";
import { ButtonComponent } from "@/components/sharedComponents";
import { router } from "expo-router";
import { useIsLoggedIn, useUserInfo } from "@/app/state/user/hooks";
import ActionSheetScreen from "@/components/sharedComponents/guestUserSscreen/actionsheet";
import useGetLocationInfo from "@/app/hooks/useGetLocationInfo";
import ScanTicketModal from "./scanTicketModal";

interface IProps {
  data?: SearchEventsResponse;
}

const DetailsSection = ({ data }: IProps) => {
  const isLoggedIn = useIsLoggedIn();
  const userInfo = useUserInfo();
  const [showAction, setShowAction] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState<boolean>(false);
  const { getLocation, locationInfo } = useGetLocationInfo();
  
  useEffect(() => {
    if (data?.longitude && data?.latitude) {
      getLocation(data?.latitude, data?.longitude);
    }
  }, [data?.longitude, data?.latitude]);

  const openGoogleMaps = (lat?: string, long?: string) => {
    const url =
      Platform.select({
        ios: `maps:0,0?q=${lat},${long}`,
        android: `geo:0,0?q=${lat},${long}`,
      }) ?? "";

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  return (
    <View style={styles.container}>
      <VStack space={6}>
        <Text style={styles.title}>
          {`${data?.name ?? ""} - ${locationInfo?.city?.long_name ?? ""}`}
        </Text>
        <HStack space={1}>
          <LocationIcon />
          <Text style={styles.location}>
            {`${data?.placeName ?? ""}` ?? ""}
          </Text>
        </HStack>
        <VStack space={3}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>{data?.description ?? ""}</Text>
          <View style={{ height: "auto" }}>
            <View>
              <MapView
                style={{ width: "100%", height: 250 }}
                {...(data?.longitude && data?.latitude
                  ? {
                    initialRegion: {
                      latitude: data?.latitude,
                      longitude: data?.longitude,
                      latitudeDelta: 0.005,
                      longitudeDelta: 0.005,
                    },
                  }
                  : {})}
                onMarkerDrag={(e) => console.log(e)}
              >
                {data?.longitude && data?.latitude && (
                  <Marker
                    coordinate={{
                      latitude: data?.latitude,
                      longitude: data?.longitude,
                    }}
                    onPress={() =>
                      openGoogleMaps(
                        data?.latitude?.toString() ?? "",
                        data?.longitude?.toString() ?? ""
                      )
                    }
                  />
                )}
              </MapView>
              <View style={styles.bookButton}>
                {data?.userEmail?.toLowerCase() == userInfo.email?.toLowerCase() ?
                  <ButtonComponent
                    title="Scan Ticket"
                    onPress={() => setIsScanModalOpen(true)}
                  />
                  : <ButtonComponent
                    title="Book Now"
                    onPress={() =>
                      isLoggedIn
                        ? router.push(`(bookEvent)/${data?.eventId}`)
                        : setShowAction(true)
                    }
                  />}
              </View>
            </View>

            {isScanModalOpen && (
              <ScanTicketModal
                isOpen={isScanModalOpen}
                onClose={() => setIsScanModalOpen(false)}
                eventID={data?.eventId ?? ''}
              />
            )}

            {showAction && (
              <ActionSheetScreen
                title="Sign In"
                description="Discover places, events, meet new people and make memories"
                isOpen={showAction}
                onClose={() => setShowAction(false)}
              />
            )}

          </View>
        </VStack>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: "500",
    fontSize: 24,
  },
  rate: {
    fontWeight: "500",
    fontSize: 14,
  },
  reviews: {
    fontWeight: "500",
    fontSize: 12,
    color: "#6B0AB9",
    alignSelf: "center",
  },
  location: {
    fontWeight: "500",
    fontSize: 12,
    color: "#8E8E93",
    alignSelf: "center",
  },
  descriptionTitle: {
    fontWeight: "600",
    fontSize: 14,
  },
  description: {
    fontWeight: "400",
    fontSize: 12,
    textAlign: "justify",
    color: "#8E8E93",
  },
  bookButton: {
    marginTop: 12,
    elevation: 4,
  },
});

export default DetailsSection;
