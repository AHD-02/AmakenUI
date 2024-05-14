import { View, Text } from 'react-native'
import React, { useState } from 'react'
import ProfileHeader from '@/components/profile/profileHeader'
import { ScrollView, VStack } from 'native-base'
import TabsPublicPlace from '@/components/editProfile/tabsPublicPlace'

const Profile = () => {
    const [tabValue, setTabValue] = useState<number>(0)
    // const X = () => {
    //     switch (tabValue) {
    //         case 0:
    //             return <EventComponent /> // return the component
    //         case 1:
    //             return <PublicPlace />
    //         default:
    //             <EventComponent />
    //     }
    // }
    return (
        <VStack space={2}>
            <ScrollView>
            <ProfileHeader />
            {/*<Tabs value={tabValue} setValue={(val: number) => setTabValue(val)} /> 
            {X} */}
            <TabsPublicPlace/>
            </ScrollView>
        </VStack>
    )
}

export default Profile