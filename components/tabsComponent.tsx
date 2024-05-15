import React from "react";
import { View, useWindowDimensions, } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import Events from "./profile/events";
import PublicPlaces from "./profile/publicPlaces";

type TabsButtonsProps = {
  index: number;
  setIndex: (index: number) => void;
  sceneMap: {
    [key: string]: React.ComponentType<unknown>;
  }
};  

const TabsComponent = ({ index, setIndex }: TabsButtonsProps) => {
  const layout = useWindowDimensions();
  const sceneMaps = {
    events: Events,
    publicPlaces: PublicPlaces,
  }
  const routes = Object.keys(sceneMaps)?.map((item: string) => ({ key: item, title: item }))
  const renderScene = SceneMap(sceneMaps)
  return (
    <View
      style={{
        margin: 9,
        padding: 8,
        backgroundColor: "#A5583A1A",
        borderRadius: 10,
        justifyContent: "center",
      }}
    >
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
};

export default TabsComponent;