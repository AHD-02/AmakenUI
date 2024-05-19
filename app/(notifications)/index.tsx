import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import NotificationCard from '@/components/notifications/notificationCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSearchEventsQuery } from '../data/events'
import { useSearchPublicPlacesQuery } from '../data/publicPlace'
import { ArrowLeft } from '@/assets/icons'
import { router } from 'expo-router'
import { ScrollView, Stack, VStack,Image } from 'native-base'
import { useIsLoggedIn } from '../state/user/hooks'
import { LOGO } from '@/assets/images'
import { ButtonComponent } from '@/components/sharedComponents'

const Notifications = () => {
  const isLoggedIn = useIsLoggedIn();
  const dummy = [
    { title: 'publish your event', body: 'sjdkf skdf jskfjd ksdldf klsa', createdOn: '6:04 AM', img: '' },
    { title: 'publish your event', body: 'sjdkf skdf jskfjd ksdldf klsa', createdOn: '6:04 AM', img: '' },
    { title: 'publish your event', body: 'sjdkf skdf jskfjd ksdldf klsa', createdOn: '6:04 AM', img: '' },
    { title: 'publish your event', body: 'sjdkf skdf jskfjd ksdldf klsa', createdOn: '6:04 AM', img: '' },
  ]

  return (
    <View style={styles.screenContainer}>
      {isLoggedIn?(
        <ScrollView>
        {dummy.map((item, index) => <View>
          <NotificationCard title={item.title} body={item.body} createdOn={item.createdOn} img={item.img} />
          {dummy.length - 1 != index && <View style={{ borderBottomColor: '#C8C8C8', borderBottomWidth: StyleSheet.hairlineWidth }} />}
        </View>)}
      </ScrollView>
      ):(
        <VStack
            style={{ height: "100%", marginHorizontal: 36 }}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <Stack paddingTop={20} paddingBottom={20} >
              <Image source={LOGO} height={250} width={280} />
              </Stack>
              <Stack justifyContent={'center'} paddingBottom={10}>
                <Text style={{fontSize:24,fontWeight:'600',paddingBottom:30}}>Searching for your Bookinngs?</Text>
                <Text style={{alignSelf:'center',fontSize:18,fontWeight:500,color:"#8E8E93"}}>
                  Login to find them all.
                </Text>
              </Stack>
              <Stack>
            <ButtonComponent
              title="Login or Signup"
              onPress={() => router.navigate("(auth)/")}
            />
            </Stack>
          </VStack>

      )
      
      }
    </View>
  )
}
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white'
  },
  bottonContainer: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center'
  },

});


export default Notifications