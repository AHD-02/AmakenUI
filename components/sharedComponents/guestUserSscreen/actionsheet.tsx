import { Text } from "react-native";
import React from "react";
import { Actionsheet, Box, Center } from "native-base";
import ButtonComponent from "../buttonComponent";
import { router } from "expo-router";

interface IProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  isEvent?: boolean;
  onClose: () => void;
}

const ActionSheetScreen = (props: IProps) => {
  return (
    <Center>
      <Actionsheet isOpen={props.isOpen} onClose={props.onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={250} px={5} justifyContent="flex-start">
            <Text
              style={{
                fontWeight: "800",
                fontSize: 30,
                paddingTop: 5,
                paddingBottom: 50,
                textAlign: "center",
              }}
            >
              {props.title}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: 500,
                color: "#8E8E93",
                paddingBottom: 50,
              }}
            >
              {props.description}
            </Text>
            <ButtonComponent
              title="Login or Signup"
              onPress={() => router.navigate("(auth)/")}
            />
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
};

export default ActionSheetScreen;
