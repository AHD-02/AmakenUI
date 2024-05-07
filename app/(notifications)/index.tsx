import { View, Text ,StyleSheet, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import NotificationCard from '@/components/notifications/notificationCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSearchEventsQuery } from '../data/events'
import { useSearchPublicPlacesQuery } from '../data/publicPlace'
import { ArrowLeft } from '@/assets/icons'
import { router } from 'expo-router'

const Notifications = () => {
  const { data: events } = useSearchEventsQuery()
  const { data: publicPlaces } = useSearchPublicPlacesQuery()
  
  return (
  
    <View style={styles.screenContainer} >
      <NotificationCard />
      <View style={{borderBottomColor:'#C8C8C8',borderBottomWidth:StyleSheet.hairlineWidth }}/>
      <NotificationCard />
      <View style={{borderBottomColor:'#C8C8C8',borderBottomWidth:StyleSheet.hairlineWidth }}/>
      <NotificationCard />

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