import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image, Text } from 'native-base'
import { EventImage } from '@/assets/images'
import { Archive, ArchiveGray, ArrowLeft } from '@/assets/icons'
import { router } from 'expo-router'
import { SearchEventsResponse } from '@/app/types'
import { useIsEventSaved, useUserInfo } from '@/app/state/user/hooks'
import { colors } from '@/app/theme/Colors'

interface IProps {
    data?: SearchEventsResponse
}

const ImagesSection = ({ data }: IProps) => {
    const isSaved: boolean = useIsEventSaved(data?.eventId ?? '')

    return (
        <View style={styles.container}> 
            <View style={styles.header}>
                <View style={styles.bottonContainer}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft />
                    </TouchableOpacity>
                </View>
                <View style={[styles.bottonContainer, isSaved ? {backgroundColor: colors.primary} : {}]}>
                    <TouchableOpacity onPress={() => {}}>
                        {isSaved ? <Archive/> : <ArchiveGray />}
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Image source={EventImage} width={'full'} height={'full'} alt={'image'} resizeMode='cover' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 65,
        paddingHorizontal: 20,
        zIndex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bottonContainer: {
        backgroundColor: 'white',
        borderRadius: 50,
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ImagesSection