import { Select, FormControl, Box, WarningOutlineIcon, Text } from "native-base";
import React from "react";
import { ArrowDownIcon } from "@/assets/icons";
import WarningMessage from "../warningMessage";
import styles from "./styles";
import { ViewStyle } from "react-native";

interface DropdownProps {
  placeHolder?: string;
  errorMsg?: string;
  setSelectedValue?: (arg: string) => void;
  selectedValue?: string;
  items?: { label: string; value: string }[];
  isMessage?: boolean;
  label: string;
  isReadOnly?: boolean
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  errorMsg,
  items = [],
  setSelectedValue,
  selectedValue,
  placeHolder,
  isReadOnly = true,
}: DropdownProps) => {
  return (
    <Box marginTop={2} paddingX={0}>
      {label && (
        <Text color="#191E3A" fontSize={14} fontWeight={500} fontFamily="Cairo">
          {label}
        </Text>
      )}
      <FormControl isRequired isInvalid={Boolean(errorMsg)} isReadOnly={isReadOnly}>
        <Select
          selectedValue={selectedValue}
          onValueChange={(itemValue: string) => setSelectedValue?.(itemValue)}
          width={"100%"}
          height={55}
          borderWidth={0}
          borderRadius={10}
          alignItems="center"
          backgroundColor="#F3F5F5"
          dropdownOpenIcon={<ArrowDownIcon />}
          dropdownCloseIcon={<ArrowDownIcon />}
          placeholder={placeHolder}
          style={styles.input as ViewStyle}
        >
          {items.map((item) => (
            <Select.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Select>
      </FormControl>
      {Boolean(errorMsg) && (
        <WarningMessage title={errorMsg ?? ""} stylingBox={{ marginTop: 2, marginBottom: 8 }} />
      )}
    </Box>
  );
};

export default Dropdown;

