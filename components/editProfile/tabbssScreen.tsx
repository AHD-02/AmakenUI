import { View } from "react-native";
import React, { useState } from "react";
import TabbssButton, { TabButtonType } from "./tabbssButton";
import Events from "../profile/events";
import PublicPlaces from "../profile/publicPlaces";
import PrivatePlaces from "../profile/privatePlaces";

export enum CustomTab {
  tab1,
  tab2,
}
interface Iprops {
  isSaved?: boolean;
}
const TabbssScreen = ({ isSaved }: Iprops) => {
  const [selectedTab, setSelectedTab] = useState<CustomTab>(CustomTab.tab1);
  const buttons: TabButtonType[] = [
    { title: "Public Place", component: <PublicPlaces isSaved={isSaved} /> },
    { title: "Private Place", component: <PrivatePlaces /> },
    { title: "Events", component: <Events isSaved={isSaved} /> },
  ];

  return (
    <>
      <View>
        <TabbssButton
          buttons={buttons}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />

        <View style={{ marginTop: 20, alignItems: "center" }}>
          <View>{buttons[selectedTab].component}</View>
        </View>
      </View>
    </>
  );
};

export default TabbssScreen;
