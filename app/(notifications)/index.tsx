import { View, Text ,StyleSheet, Platform } from 'react-native'
import React from 'react'
import NotificationCard from '@/components/notifications/notificationCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSearchEventsQuery } from '../data/events'
import { useSearchPublicPlacesQuery } from '../data/publicPlace'

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
 
});


export default Notifications