import { View, Text } from 'react-native'
import React, { useState } from 'react'
import ProfileHeader from '@/components/profile/profileHeader'
import { VStack } from 'native-base'

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
            <ProfileHeader />
            {/*<Tabs value={tabValue} setValue={(val: number) => setTabValue(val)} /> 
            {X} */}
        </VStack>
    )
}

export default Profile