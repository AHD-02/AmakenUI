import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Platform,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useSearchEventsCategoriesQuery } from "../data/events";
import { useSearchPublicPlacesCategoriesQuery } from "../data/publicPlace";
import { LookUpModel } from "../types";
import { Badge, Center, HStack, Image, VStack } from "native-base";
import { colors } from "../theme/Colors";
import { ButtonComponent } from "@/components/sharedComponents";
import { useUpdateUserMutation } from "../data/user";
import { useUserInfo } from "../state/user/hooks";
import { SignupModel } from "../types/user/signup";
import { router } from "expo-router";
import { SCREENS } from "@/components/screens";
import { LOGO } from "@/assets/images";

const Categories = () => {
  const { data: publicPlaceCategories } =
    useSearchPublicPlacesCategoriesQuery();
  const { data: eventsCategories } = useSearchEventsCategoriesQuery();
  const [updateUser, { isSuccess }] = useUpdateUserMutation();
  const [selected, setSelected] = useState<Array<string>>([]);

  const categories = useMemo(
    () =>
      eventsCategories ? publicPlaceCategories?.concat(eventsCategories) : [],
    [publicPlaceCategories, eventsCategories]
  );
  const userInfo = useUserInfo();

  useEffect(() => {
    if (isSuccess) router.replace(`/${SCREENS.Main}/`);
  }, [isSuccess]);

  return (
    <VStack style={styles.container}>
    {/* <View style={{ backgroundColor: "white", padding: 16 }}> */}
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
          const isSelected = selected?.some((id) => id == item.value);
          return (
            <TouchableOpacity
              onPress={async () => {
                if (isSelected)
                  setSelected((prev) => prev?.filter((id) => item.value != id));
                else setSelected((prev) => [...prev, item.value]);
              }}
              style={{ marginTop: 10,paddingBottom:6  }}
            >
              <Badge
                style={{borderRadius:10,}}
                _text={{fontSize:18,fontWeight:400,padding:1,color: isSelected ? 'white' : "#8E8E93"}}
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
      <VStack style={{paddingTop:80 ,paddingHorizontal:10,marginBottom:10,justifyContent:'space-between'}}>
      <ButtonComponent
        title="Finish"
        onPress={() =>
          userInfo &&
          updateUser({ ...userInfo, intrests: selected ?? [] } as any)
        }
      />
      </VStack>
    {/* </View> */}
    </VStack>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    justifyContent:'space-between',
    padding:16,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    paddingBottom:40
  },
});

export default Categories;
