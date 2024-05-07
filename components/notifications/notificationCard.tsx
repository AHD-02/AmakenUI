import { Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { HStack, Image, VStack } from 'native-base'
import { EventImage } from '@/assets/images'

interface IProps {
    title: string
    body: string
    img: string
    createdOn: string
}

const NotificationCard = ({ title, body, img, createdOn }: IProps) => {
    return (
        <Pressable>
            <HStack paddingTop={4} paddingX={4} paddingBottom={2} justifyContent={'space-between'}>
                <HStack space={2}>
                    <Image source={EventImage} width={'20'} height={'20'} borderRadius={12} />
                    <VStack mt={1}>
                        <Text style={styles.title}>{title ?? ''}</Text>
                        <Text style={styles.description}>{body ?? ''}</Text>
                    </VStack>
                </HStack>
                <Text style={styles.time}>{createdOn ?? ''}</Text>
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
        paddingTop: 7,
    },
    time: {
        fontFamily: 'Cairo',
        fontSize: 12,
        fontWeight: '500',
        color: '#C8C8C8',
    }
})