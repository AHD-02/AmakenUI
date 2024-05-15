import React, { useState } from "react";
import { UploadPhotosIcon } from "@/assets/icons";
import { Box, HStack, Pressable, Text, View } from "native-base";

interface IProps {
  onPress: () => void;
}

const UploadPhotos = ({ onPress }: IProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <HStack alignItems="center">
        <Text
          color={"#191E3A"}
          fontSize={14}
          fontWeight={500}
          fontFamily={"Cairo"}
        >
          {"Photos"}
        </Text>
      </HStack>
      <HStack
        paddingX={4}
        width="100%"
        height={55}
        marginTop={2}
        alignItems={"center"}
        marginBottom={2}
        borderRadius={10}
        justifyContent={"space-between"}
        borderColor={isPressed ? "#7E4934" : "#A5583A"}
        borderWidth={1}
        backgroundColor={isPressed ? "#F4EDE8" : "transparent"}
      >
        <View>
          <Text color={"#A5583A"} fontSize={16} fontWeight={400}>
            Upload Photo
          </Text>
        </View>
        <View>
          <UploadPhotosIcon />
        </View>
      </HStack>
    </Pressable>
  );
};
export default UploadPhotos;
