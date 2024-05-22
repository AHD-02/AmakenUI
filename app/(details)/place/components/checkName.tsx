import { useLazyCheckNameQuery } from "@/app/data/publicPlace";
import { primaryColor } from "@/app/types";
import { debounce } from "@/app/utils/globalUtils";
import { TextInput } from "@/components/sharedComponents";
import { Ionicons } from "@expo/vector-icons";
import { Spinner } from "native-base";
import { useEffect, useState, useCallback } from "react";

interface IProps {
  value: string;
  setValue: (value: string) => void;
  label: string;
  placeholder: string;
}

const CheckNameWithInput = ({
  label,
  placeholder,
  setValue,
  value,
}: IProps) => {
  const [checkName, res] = useLazyCheckNameQuery();
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedCheckName = useCallback(
    debounce((name: string) => {
      setIsLoading(true);
      checkName({ name }).finally(() => {
        setIsLoading(false);
      });
    }, 300),
    [checkName]
  );

  useEffect(() => {
    if (Boolean(debouncedValue)) {
      debouncedCheckName(debouncedValue);
    }
  }, [debouncedValue, debouncedCheckName]);

  useEffect(() => {
    setDebouncedValue(value);
  }, [value]);

  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      onChangeText={(value) => setValue(value)}
      value={value}
      rightIcon={
        res.isLoading || isLoading ? (
          <Spinner color={primaryColor} size={"sm"} />
        ) : Boolean(value) && res.data ? (
          <Ionicons
            name="checkmark-circle-outline"
            color={"#4BB543"}
            size={25}
          />
        ) : Boolean(value) && !res.data ? (
          <Ionicons name="close-circle-outline" color={"#FF0000"} size={25} />
        ) : (
          <></>
        )
      }
    />
  );
};

export default CheckNameWithInput;
