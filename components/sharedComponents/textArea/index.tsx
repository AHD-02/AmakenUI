import React from "react";
import { KeyboardTypeOptions, StyleProp, TextStyle } from "react-native";
import { Box, HStack, Text, TextArea } from "native-base";
import { ResponsiveValue } from "native-base/lib/typescript/components/types";
import styles from "./styles";
import WarningMessage from "../warningMessage";

type VariantType = "outline" | "rounded" | "underlined" | "filled" | "unstyled";

interface IProps {
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
  backgroundColor?: string;
  paddingHorizontal?: number;
  InputLeftElement?: JSX.Element;
  InputRightElement?: JSX.Element;
  keyboardType?: KeyboardTypeOptions;
  inputStyles?: StyleProp<TextStyle>;
  alignItems?: ResponsiveValue<string>;
  justifyContent?: ResponsiveValue<string>;
  variant?: ResponsiveValue<VariantType>;
  onChangeText: (val: string) => void;
  errorMsg?: string;
  fontWeight?: any;
  onTouchStart?: () => void;
}

const TextAreaInput = ({
  onTouchStart,
  label,
  value,
  width,
  flex = 1,
  height = 150, // Adjusted height for TextArea
  placeholder,
  onChangeText,
  marginTop = 2,
  backgroundColor,
  editable = true,
  inputStyles = {},
  borderRadius = 10,
  marginBottom = 2,
  paddingX = 1,
  autoFocus = false,
  variant = "unstyled",
  alignItems = "flex-start",
  keyboardType = "default",
  paddingHorizontal = 0,
  justifyContent = "flex-start",
  fontWeight,
  errorMsg,
}: IProps) => {
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
        <TextArea
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
          autoCompleteType={"none"}
        />
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

export default TextAreaInput;
