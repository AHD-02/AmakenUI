import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ProfileHeader from '@/components/profile/profileHeader'
import { HStack, ScrollView, VStack } from 'native-base'
import Events from '@/components/profile/events'
import PublicPlaces from '@/components/profile/publicPlaces'
import TabsComponent from '@/components/tabsComponent'
import { ButtonComponent } from '@/components/sharedComponents'
import { router } from 'expo-router'
import { useIsLoggedIn } from '@/app/state/user/hooks'

interface TabsType {
    title: string
    component: React.JSX.Element
}

const Profile = () => {
    const [tabValue, setTabValue] = useState<number>(0)
    const isLoggedIn = useIsLoggedIn()
    const sceneMap = {
        events: Events,
        publicPlaces: PublicPlaces,
    }
    const tabs: TabsType[] = [
        {title: 'events', component: <Events />},
        {title: 'place', component: <PublicPlaces />},
    ]

    return (
        <VStack space={2} backgroundColor={'white'} height={'100%'}>
            {isLoggedIn ?
            <ScrollView>
                <ProfileHeader />
                <HStack backgroundColor={'black'} height={'100%'}>
                    {tabs.map((item, index) => {
                        <TouchableOpacity onPress={() => setTabValue(index)} style={{backgroundColor: 'red', width: '40%'}}>
                            <Text style={{color: 'white'}}>{item.title}</Text>
                        </TouchableOpacity>
                    })}
                </HStack>
                <View>
                    {tabs[tabValue].component}
                </View>
            </ScrollView>
            : <VStack style={{height: '100%', marginHorizontal: 36}} justifyContent={'center'} alignItems={'center'}>
                <ButtonComponent 
                    title='Login or Signup'
                    onPress={() => router.navigate('(auth)/')}
                />
            </VStack>
            }
        </VStack>
    )
}

export default Profile