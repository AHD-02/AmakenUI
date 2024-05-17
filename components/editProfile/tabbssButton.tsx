import { View, Text, Pressable, LayoutChangeEvent, Easing } from "react-native";
import React, { useState } from "react";
import { HStack } from "native-base";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { transform } from "@babel/core";

export interface TabButtonType  {
  title: string;
  component: React.JSX.Element;

};


interface IProp  {
  buttons: TabButtonType[];
  selectedTab: number;
  setSelectedTab: (index: number) => void;
};
const TabbssButton = ({
  buttons,
  selectedTab,
  setSelectedTab,
}: IProp) => {
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });
  const buttonWidth = dimensions.width / buttons.length;

  const tabPositionX = useSharedValue(0);

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };
  const handlePress = (index: number) => {
    setSelectedTab(index);
  };
  const onTabPress = (index: number) => {
    tabPositionX.value = withTiming(buttonWidth * index, {}, () => {
      runOnJS(handlePress)(index);
    });
  };
  const animatedStyle=useAnimatedStyle(()=>{return{
    transform:[{translateX:tabPositionX.value}]
  }})

  return (
    <View
        // accessibilityRole="tabbar"
      style={{
        margin:8,
        backgroundColor: "#A5583A1A",
        borderRadius: 10,
        justifyContent: "center",
      }}
    >
        {/* Animated.view */}
      <Animated.View
        style={[animatedStyle,
            {
          position: "absolute",
          backgroundColor: "#A5583A",
          borderRadius: 10,
          marginHorizontal: 3,
          height: dimensions.height-10,
          width: buttonWidth-10,
        }]}
      />
      <View onLayout={onTabbarLayout} style={{ flexDirection: "row" }}>
        {buttons.map((button, index) => {
          const colorTab = selectedTab === index ? "#FFFFFF" : "#8E8E93";
          return (
            <Pressable
              key={index}
              style={{ flex: 1, paddingVertical: 20 }}
              onPress={() => onTabPress(index)}
            >
              <Text
                style={{
                  color: colorTab,
                  alignSelf: "center",
                  fontWeight: "500",
                  fontSize: 18,
                }}
              >
                {button.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default TabbssButton;
