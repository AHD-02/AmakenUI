import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { HStack, Image, VStack } from 'native-base'
import { EventImage } from '@/assets/images'

const NotificationCard = () => {
    return (
        <HStack space={4}>
            <Image source={EventImage} width={'20%'} height={'24'} />
            <VStack mt={1}>
                <Text style={styles.title}>Title</Text>
                <Text style={styles.description}>Description</Text>
            </VStack>
            <Text>TODO COMPLETE</Text>
        </HStack>
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
    }
})