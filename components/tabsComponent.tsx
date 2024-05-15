import React from "react";
import { View, useWindowDimensions, } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";

type TabsButtonsProps = {
  index: number;
  setIndex: (index: number) => void;
  sceneMap: {
    [key: string]: React.ComponentType<unknown>;
  }
};  

const TabsComponent = ({ index, setIndex, sceneMap }: TabsButtonsProps) => {
  const layout = useWindowDimensions();
  const renderScene = SceneMap(sceneMap)
  const routes = Object.keys(sceneMap)?.map((item: string) => ({ key: item, title: item }))

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