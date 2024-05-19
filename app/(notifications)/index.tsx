import { View, Text, StyleSheet, } from 'react-native'
import React from 'react'
import NotificationCard from '@/components/notifications/notificationCard'
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
  
        <ScrollView>
        {dummy.map((item, index) => <View>
          <NotificationCard title={item.title} body={item.body} createdOn={item.createdOn} img={item.img} />
          {dummy.length - 1 != index && <View style={{ borderBottomColor: '#C8C8C8', borderBottomWidth: StyleSheet.hairlineWidth }} />}
        </View>)}
      </ScrollView>
  
      
  
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