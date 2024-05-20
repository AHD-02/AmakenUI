import { View, Text, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { Center, Modal } from "native-base";
import { router } from "expo-router";
import ButtonComponent from "../buttonComponent";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  header?: string;
  children?: React.JSX.Element;
  style?: StyleProp<ViewStyle>;
}

const GuestModal = (props: IProps) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.Body justifyContent={"center"}>
          <Center>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 22,
                paddingTop: 15,
                paddingBottom: 45,
                textAlign: "center",
              }}
            >
              {props.header}
            </Text>
          </Center>
          <Center>
            <ButtonComponent
              title="Login or Signup"
              onPress={() => router.navigate("(auth)/")}
            />
          </Center>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default GuestModal;
