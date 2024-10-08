import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image, Text } from 'native-base'
import { EventImage } from '@/assets/images'
import { Archive, ArchiveGray, ArrowLeft } from '@/assets/icons'
import { router } from 'expo-router'
import { IPrivatePlaceResponse } from '@/app/types'
import { imageUrlResolver } from '@/app/utils/imageUtils'

interface IProps {
    data?: IPrivatePlaceResponse
}

const PrivateImagesSection = ({ data }: IProps) => {
    
    return (
        <View style={styles.container}> 
            <View style={styles.header}>
                <View style={styles.bottonContainer}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Image src={imageUrlResolver(data?.images?.[0] ?? "")} width={'full'} height={'full'} alt={'image'} resizeMode='cover' />
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

export default PrivateImagesSection