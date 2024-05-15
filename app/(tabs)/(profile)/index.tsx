import { View, Text } from 'react-native'
import React, { useState } from 'react'
import ProfileHeader from '@/components/profile/profileHeader'
import { ScrollView, VStack } from 'native-base'
import Events from '@/components/profile/events'
import PublicPlaces from '@/components/profile/publicPlaces'
import TabsComponent from '@/components/tabsComponent'
import { ButtonComponent } from '@/components/sharedComponents'
import { router } from 'expo-router'

const Profile = () => {
    const [tabValue, setTabValue] = useState<number>(0)

    const sceneMap = {
        Events: Events,
        PublicPlaces: PublicPlaces,
    }
    return (
        <VStack space={2}>
            <ScrollView>
                <ProfileHeader />
                <ButtonComponent 
                    title='login'
                    onPress={() => router.replace('(auth)/')}
                />
                {/* <TabsComponent
                    index={tabValue}
                    setIndex={setTabValue}
                    sceneMap={sceneMap}
                /> */}
            </ScrollView>
        </VStack>
    )
}

export default Profile