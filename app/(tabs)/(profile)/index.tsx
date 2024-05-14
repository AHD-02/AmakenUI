import { View, Text } from 'react-native'
import React, { useState } from 'react'
import ProfileHeader from '@/components/profile/profileHeader'
import { ScrollView, VStack } from 'native-base'
import TabsPublicPlace from '@/components/editProfile/tabsPublicPlace'
import TabsComponent from '@/components/editProfile/tabsEvent'
import Events from '@/components/profile/events'
import PublicPlaces from '@/components/profile/publicPlaces'

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
                <TabsComponent
                    index={tabValue}
                    setIndex={setTabValue}
                    sceneMap={sceneMap}
                />
                <TabsPublicPlace />
            </ScrollView>
        </VStack>
    )
}

export default Profile