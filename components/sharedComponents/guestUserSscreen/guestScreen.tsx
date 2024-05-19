import { View, Text,Image } from 'react-native'
import React from 'react'
import { LOGO } from '@/assets/images'
import { router } from 'expo-router'
import { VStack, Stack } from 'native-base'
import ButtonComponent from '../buttonComponent'

interface Iprop{
    title?: string;
    description?: string;
}

const GuestScreen = (props:Iprop) => {
  return (
    <VStack
    style={{ height: "100%", width:'100%',backgroundColor:'white' }}
    justifyContent={"flex-start"}
    alignItems={"center"}
  >
    <Stack paddingTop={10} paddingBottom={20} >
      <Image source={LOGO} style={{height:250,width:280}}  />
      </Stack>

      <Stack justifyContent={'center'} paddingBottom={10}>
        <Text style={{fontSize:24,fontWeight:'600',paddingBottom:30,paddingTop:10}}>{props.title}</Text>
        <Text style={{alignSelf:'center',fontSize:18,fontWeight:500,color:"#8E8E93"}}>
          {props.description}
        </Text>
      </Stack>

      <Stack>
        <VStack style={{marginHorizontal:36}}>
    <ButtonComponent
      title="Login or Signup"
      onPress={() => router.navigate("(auth)/")}
    />
    </VStack>
    </Stack>
  </VStack>
  )
}

export default GuestScreen