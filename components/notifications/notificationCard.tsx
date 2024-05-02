import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { HStack, Image, VStack } from 'native-base'
import { EventImage } from '@/assets/images'
import { Line } from 'react-native-svg'




const NotificationCard = () => {
    return (
        <Pressable>
        <HStack space={2} paddingTop={4} paddingLeft={4} paddingBottom={2}>
            <Image source={EventImage} width={'24%'} height={'24'} borderRadius={12} />
            <VStack mt={1}>
                <Text style={styles.title}>Publish your event</Text>
                <Text style={styles.description}>details details details details details {"\n"}</Text>
            </VStack>
            <Text style={styles.time}>6:14 AM</Text>
        </HStack>
        </Pressable>
    )
}

export default NotificationCard

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Cairo',
        fontSize: 16,
        fontWeight: '500',
        color: '#191E3A',
    },
    description: {
        fontFamily: 'Cairo',
        fontSize: 14,
        fontWeight: '500',
        color: '#8E8E93',
        paddingTop:7,
    },
    time:{
        fontFamily: 'Cairo',
        fontSize: 12,
        fontWeight: '500',
        color: '#C8C8C8',
    }
})