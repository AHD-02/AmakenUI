import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import {
  Actionsheet,
  Pressable,
  Box,
  HStack,
  Text,
  useDisclose,
} from "native-base";
import WarningMessage from "../warningMessage";

interface IProps {
  label: string;
  value: string;
  setValue: (arg: string) => void;
  errorMsg?: string;
  mode?: "date" | "time";
  placeholder?: string;
}

const DatePickerComponent = ({
  label,
  setValue,
  value,
  errorMsg,
  mode,
  placeholder,
}: IProps) => {
  const [show, setShow] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclose();

  const formatDate = (date: Date) => {
    if (mode == "time")
      return `${date?.getHours() ?? "00"}:${date?.getMinutes() ?? "00"} ${
        date?.getHours() >= 12 ? "PM" : "AM"
      }`;
    const day = date?.getDate() - 1;
    const month = date?.getMonth() + 1;
    const year = date?.getFullYear();
    return `${day ?? ""}/${month ?? ""}/${year ?? ""}`;
  };

  const onChange = (_: any, selectedDate: any) => {
    const currentDate = selectedDate || new Date();
    setShow(Platform.OS === "ios");
    setValue(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <Pressable onPress={onOpen}>
      <Box paddingX={0}>
        {label && (
          <HStack alignItems="center">
            <Text
              color={"#191E3A"}
              fontSize={14}
              fontWeight={500}
              fontFamily={"Cairo"}
            >
              {label}
            </Text>
          </HStack>
        )}
        <HStack
          paddingX={4}
          width="100%"
          height={55}
          marginTop={2}
          alignItems={"center"}
          marginBottom={2}
          borderRadius={10}
          justifyContent={"flex-start"}
          backgroundColor={"#F3F5F5"}
          onTouchStart={showDatePicker}
        >
          <Text
            style={
              !Boolean(value)
                ? { fontWeight: 400, fontSize: 16, color: "#C8C8C8" }
                : {}
            }
          >
            {Boolean(value)
              ? formatDate(new Date(value))
              : placeholder ?? "DD/MM/YYYY"}
          </Text>
        </HStack>

        {Platform.OS === "ios" && (
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
              <Box w="100%" h={250} px={5} justifyContent="flex-start">
                <DateTimePicker
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  value={!Boolean(value) ? new Date() : new Date(value)}
                  mode={mode ?? "date"}
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onChange}
                  style={customStyles}
                />
              </Box>
            </Actionsheet.Content>
          </Actionsheet>
        )}

        {Boolean(errorMsg) && (
          <WarningMessage
            title={errorMsg ?? ""}
            stylingBox={{ marginTop: 2, marginBottom: 8 }}
          />
        )}
      </Box>
    </Pressable>
  );
};
const customStyles = {
  backgroundColor: "white",
  color: "#FFF",
};
export default DatePickerComponent;
