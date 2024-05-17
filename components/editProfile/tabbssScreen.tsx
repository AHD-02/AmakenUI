import { View, Text } from "react-native";
import React, { useState } from "react";
import TabbssButton, { TabButtonType } from "./tabbssButton";
import Events from "../profile/events";
import PublicPlaces from "../profile/publicPlaces";

export enum CustomTab {
  tab1,
  tab2,
}
const TabbssScreen = () => {
  const [selectedTab, setSelectedTab] = useState<CustomTab>(CustomTab.tab1);
  const buttons: TabButtonType[] = [
    { title: "Public Place", component: <Events /> },
    { title: "Events", component: <PublicPlaces /> },
  ];

  return (
    <>
      <TabbssButton
        buttons={buttons}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <View style={{ marginTop: 20, alignItems: "center" }}>
        {/* {selectedTab === CustomTab.tab1 ? (
          <View>{buttons[selectedTab].component}</View>
        ) : (
          <View>{buttons[selectedTab].component}</View>
        )} */}
        <View>{buttons[selectedTab].component}</View>

      </View>
    </>
  );
};

export default TabbssScreen;
