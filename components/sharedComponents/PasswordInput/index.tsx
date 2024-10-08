import React, { useState } from "react";
import { KeyboardTypeOptions, StyleProp, TextStyle } from "react-native";
import { Box, HStack, Icon, Input, Text, useTheme } from "native-base";
import { ResponsiveValue } from "native-base/lib/typescript/components/types";
import styles from "./styles";
import WarningMessage from "../warningMessage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ArrowDownIcon } from "@/assets/icons";


type VariantType = "outline" | "rounded" | "underlined" | "filled" | "unstyled";

interface IProps {
  error?: boolean;
  value: string;
  flex?: number;
  label?: string;
  height?: number;
  editable?: boolean;
  marginTop?: number;
  textAlign?: string;
  paddingX?: number;
  autoFocus?: boolean;
  placeholder?: string;
  borderRadius?: number;
  marginBottom?: number;
  width?: number | string;
  currencyLabel?: boolean;
  backgroundColor?: string;
  paddingHorizontal?: number;
  keyboardType?: KeyboardTypeOptions;
  inputStyles?: StyleProp<TextStyle>;
  alignItems?: ResponsiveValue<string>;
  justifyContent?: ResponsiveValue<string>;
  variant?: ResponsiveValue<VariantType>;
  onChangeText: (val: string) => void;
  errorMsg?: string;
  fontWeight?: any;
  onTouchStart?: () => void;
  secureTextEntry?:boolean;
}

const PasswordInput = ({
  onTouchStart,
  label,
  value,
  width,
  flex = 1,
  height = 55,
  placeholder,
  onChangeText,
  marginTop = 2,
  currencyLabel,
  backgroundColor,
  editable = true,
  inputStyles = {},
  borderRadius = 10,
  marginBottom = 2,
  paddingX = 1,
  autoFocus = false,
  variant = "unstyled",
  alignItems = "center",
  keyboardType = "default",
  paddingHorizontal = 0,
  justifyContent = "flex-start",
  fontWeight,
  errorMsg,
  
}: IProps) => {
    const [Showpassword,SetShowPassword] = useState<boolean>(false)

  return (
    <Box onTouchStart={onTouchStart} paddingX={paddingHorizontal}>
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
        paddingX={paddingX}
        width="100%"
        height={height}
        marginTop={marginTop}
        alignItems={alignItems}
        marginBottom={marginBottom}
        borderRadius={borderRadius}
        justifyContent={justifyContent}
        backgroundColor={backgroundColor ?? "#F3F5F5"}
      >
        <Input
          color={"#191E3A"}
          flex={flex}
          width={width}
          value={value}
          variant={variant}
          editable={editable}
          autoFocus={autoFocus}
          placeholder={placeholder}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          fontWeight={fontWeight}
          style={[styles.input, inputStyles]}
          InputRightElement={<Ionicons name={Showpassword ? "eye-outline":"eye-off-outline"} size={25} onPress={() => SetShowPassword(!Showpassword)}/>}
          secureTextEntry={!Showpassword}
        />
        {currencyLabel && (
          <Text
            width={"45%"}
            fontSize={48}
            fontWeight={700}
            fontFamily="Urbanist-Regular"
            color={"#A5583A"}
          >
            SR
          </Text>
        )}
      </HStack>
      {Boolean(errorMsg) && (
        <WarningMessage
          title={errorMsg ?? ""}
          stylingBox={{ marginTop: 2, marginBottom: 8 }}
        />
      )}
    </Box>
  );
};

export default PasswordInput;
