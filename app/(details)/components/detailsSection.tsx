import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SearchEventsResponse } from '@/app/types'
import { HStack, VStack } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import { LocationIcon } from '@/assets/icons'

interface IProps {
    data?: SearchEventsResponse
}

const DetailsSection = ({ data }: IProps) => {
    return (
        <View style={styles.container}>
            <VStack space={6}>
                <Text style={styles.title}>{data?.name ?? ''} - {data?.location ?? ''}</Text>
                <HStack space={1}>
                    <HStack>
                        <AntDesign name="star" color={'#F7CB15'} size={18} style={{ alignSelf: 'center' }} />
                        <Text style={styles.rate}>3.5 {/* TODO: add rate */}</Text>
                    </HStack>
                    <Text style={styles.reviews}>{`(4 Reviews)`}{/* TODO: ADD REVIEWS */}</Text>
                    <Text style={styles.rate}>-</Text>
                    <Text style={styles.rate}>Booking</Text>
                </HStack>
                <HStack space={1}>
                    <LocationIcon />
                    <Text style={styles.location}>Crowne Plaza Dead Sea Resort & Spa، Balqa'a, Jordan</Text>
                </HStack>
                <VStack space={3}>
                    <Text style={styles.descriptionTitle}>Description</Text>
                    <Text style={styles.description}>{data?.description ?? ''}</Text>
                </VStack>
            </VStack>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontWeight: '500',
        fontSize: 24,
    },
    rate: {
        fontWeight: '500',
        fontSize: 14,
    },
    reviews: {
        fontWeight: '500',
        fontSize: 12,
        color: '#6B0AB9',
        alignSelf: 'center'
    },
    location: {
        fontWeight: '500',
        fontSize: 12,
        color: '#8E8E93',
        alignSelf: 'center'
    },
    descriptionTitle: {
        fontWeight: '600',
        fontSize: 14,
    },
    description: {
        fontWeight: '400',
        fontSize: 12,
        textAlign: 'justify',
        color: '#8E8E93',
    }
})

export default DetailsSection