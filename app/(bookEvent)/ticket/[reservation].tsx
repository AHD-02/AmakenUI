import { View, StyleSheet } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useGetBookedEventQuery, useGetEventQuery } from '../../data/events'
import { Image, VStack, Text, HStack } from 'native-base'
import { imageUrlResolver } from '../../utils/imageUtils'
import { BookCalenderIcon, LocationIcon } from '@/assets/icons'
import dayjs from 'dayjs'
import { ButtonComponent } from '@/components/sharedComponents'
import { colors } from '@/app/theme/Colors'
import { TicketLine } from '@/assets/images'
import QRCode from 'react-native-qrcode-svg'

const BookEvent = () => {
    const { reservation } = useLocalSearchParams()
    const res = useGetBookedEventQuery(reservation as any ?? '')
    const { data } = res

    return (
        <View style={styles.container}>
            <VStack justifyContent={'space-between'} height={'100%'}>
                <VStack space={2}>
                    <View style={{ elevation: 4 }}>
                        <Image source={TicketLine} alt='Image' width={'100%'} height={'2'} />
                    </View>
                    <VStack space={'12'} marginX={4}>
                        <VStack space={2}>
                            <VStack space={2}>
                                <Image style={{ height: 150, width: '100%' }} source={{ uri: imageUrlResolver(data?.eventImages[0] ?? '') }} alt='Image' />
                                <Text fontWeight={'600'} fontSize={16}>{data?.eventName ?? ''}</Text>
                            </VStack>
                            <VStack space={1}>
                                <HStack space={2} alignItems={'center'}>
                                    <BookCalenderIcon isPrimary />
                                    <Text fontWeight={'400'} fontSize={12} color={colors.primary}>
                                    {`${data?.eventStart ? dayjs(new Date(data?.eventStart ?? ''))?.format('DD MMMM h:mmA') : ''} - ${data?.eventEnd ? dayjs(new Date(data?.eventEnd ?? ''))?.format('DD MMMM h:mmA') : ''}`}
                                        </Text>
                                </HStack>
                                <HStack space={2} alignItems={'center'}>
                                    <LocationIcon isPrimary />
                                    <Text fontWeight={'400'} fontSize={12} color={colors.primary}>{data?.placeName ?? ''}</Text>
                                </HStack>
                            </VStack>
                        </VStack>
                        <View style={styles.line} />
                        <VStack justifyContent={'center'} alignItems={'center'}>
                            <QRCode value='hello' size={200} />
                        </VStack>
                    </VStack>
                </VStack>

                <ButtonComponent title='Close' onPress={() => router.replace('/(tabs)/')} />
            </VStack>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
    },
    line: {
        borderWidth: 1,
        borderColor: '#A5583A',
        borderStyle: 'dashed',
    }
})
export default BookEvent