import {
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";
import React, { useMemo } from "react";
import { useSearchEventsCategoriesQuery } from "../data/events";
import { useSearchPublicPlacesCategoriesQuery } from "../data/publicPlace";
import { LookUpModel } from "../types";
import { Badge, Center, HStack, Image, ScrollView, VStack } from "native-base";
import { colors } from "../theme/Colors";
import { ButtonComponent } from "@/components/sharedComponents";
import { LOGO } from "@/assets/images";
import useSignUp from "../hooks/useSignUp";

const Categories = () => {
  const { data: publicPlaceCategories } =
    useSearchPublicPlacesCategoriesQuery();
  const { data: eventsCategories } = useSearchEventsCategoriesQuery();
  const { submitForm, values, setFieldValue } = useSignUp()

  const categories = useMemo(
    () =>
      eventsCategories ? publicPlaceCategories?.concat(eventsCategories) : [],
    [publicPlaceCategories, eventsCategories]
  );

  return (
    <VStack style={styles.container}>
      <ScrollView>
        <VStack>
          <Center paddingBottom={7}>
            <Image source={LOGO} height={100} width={110} />
          </Center>
          <Text style={styles.title}>Add Your Interests</Text>

          <StatusBar barStyle={"dark-content"} />
          <HStack
            space={{
              base: 3,
              sm: 4,
            }}
            mx={{
              base: "auto",
              md: 0,
            }}
            flexWrap={"wrap"}
          >
            {categories?.map((item: LookUpModel) => {
              const isSelected = values.intrests?.some((id) => id == item.value);
              return (
                <TouchableOpacity
                  onPress={async () => {
                    if (isSelected)
                      setFieldValue('intrests', values.intrests?.filter((id) => item.value != id));
                    else setFieldValue('intrests', [...(values.intrests ?? []), item.value]);
                  }}
                  style={{ marginTop: 10, paddingBottom: 6 }}
                >
                  <Badge
                    style={{ borderRadius: 10, }}
                    _text={{ fontSize: 18, fontWeight: 400, padding: 1, color: isSelected ? 'white' : "#8E8E93" }}
                    variant={isSelected ? "solid" : "subtle"}
                    {...(isSelected ? { backgroundColor: colors.primary, } : {})}
                  >
                    {item.label}
                  </Badge>
                </TouchableOpacity>
              );
            })}
          </HStack>
        </VStack>
        <VStack style={{ paddingTop: 80, paddingHorizontal: 10, paddingBottom: 10,}}>
          <ButtonComponent
            title="Finish"
            onPress={async() => {
              await submitForm()
            }}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    paddingBottom: 40
  },
});

export default Categories;
