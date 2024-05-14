import { View, Text, Pressable, LayoutChangeEvent,  } from "react-native";
import React, { useState } from "react";
import Animated,{ runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export type TabsButtonsType = {
  title: string;
};
type TabsButtonsProps = {
  buttons: TabsButtonsType[];
  selectedTab: number;
  setSelectedTab: (index: number) => void;
};

const TabsEvent = ({
  buttons,
  selectedTab,
  setSelectedTab,
}: TabsButtonsProps) => {
  const [dimensions, setDimensions] = useState({ height: 60, width: 350 });
  const buttonWidth = dimensions.width / buttons.length;

  const tabPositionX=useSharedValue(0);

  const onTabberLayout=(e:LayoutChangeEvent)=>{
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };
  const handlePress=(index:number)=>{
    setSelectedTab(index);
  }
  const onTabPress=(index:number)=>{
    tabPositionX.value=withTiming(buttonWidth *index,{},()=>{
      runOnJS(handlePress)(index)
    })
  }
  const animatedStyle =useAnimatedStyle(()=>{
    return{
      transform: [{translateX:tabPositionX.value}]
    }
  })
 
  

 
  return (
    <View
    accessibilityRole="tabbar"
      style={{
        margin:9,
        padding:8,
        backgroundColor: "#A5583A1A",
        borderRadius: 10,
        justifyContent: "center",
      }}
    >
      <Animated.View
        style={[{
          position: "absolute",
          backgroundColor: "#A5583A",
          borderRadius: 10,
          marginHorizontal: 5,
          height: dimensions.height - 5,
          width: buttonWidth -8,
        },
        animatedStyle,
      ]}
      ></Animated.View>

      <View onLayout={onTabberLayout} style={{ flexDirection: "row" }}>
        {buttons.map((button, index) => {
          const color = selectedTab === index ? "white" : "#8E8E93";
          return (
            <Pressable
              key={index}
              style={{ flex: 1, paddingVertical: 20 }}
              onPress={() => onTabPress(index)}
            >
              <Text
                style={{
                  color: color,
                  alignSelf: "center",
                  fontWeight: "500",
                  fontSize: 19,
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

export default TabsEvent;
