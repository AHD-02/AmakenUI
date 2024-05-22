import { View, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useBookEventMutation, useGetEventQuery } from '../data/events'
import { Image, VStack, Text, HStack } from 'native-base'
import { imageUrlResolver } from '../utils/imageUtils'
import { BookCalenderIcon, LocationIcon } from '@/assets/icons'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import { ButtonComponent, TextInput } from '@/components/sharedComponents'
import { number, object } from 'yup'

const BookEvent = () => {
    const { id } = useLocalSearchParams()
    const { data } = useGetEventQuery(id as string ?? '')
    const [book, {data: resData}] = useBookEventMutation()
    const { values, setFieldValue, errors, submitForm } = useFormik({
        initialValues: {
            person: 1,
            promoCode: '',
        },
        validationSchema: object({
            person: number().nullable('invalid data type').min(1, 'At least 1 person').required('Please complete this field')
        }),
        validateOnChange: true,
        onSubmit: () => {
            book(id as string ?? '')
        }
    })
    
    useEffect(() => {
        if(resData)
            router.replace(`(bookEvent)/ticket/${resData ?? ''}`)
    },[resData])

    return (
        <View style={styles.container}>
            <VStack justifyContent={'space-between'} height={'100%'}>
                <VStack space={2}>
                    <VStack space={2}>
                        <Image style={{ height: 150, width: '100%' }} source={{ uri: imageUrlResolver(data?.images[0] ?? '') }} alt='Image' />
                        <Text fontWeight={'600'} fontSize={16}>{data?.name ?? ''}</Text>
                    </VStack>
                    <VStack space={1}>
                        <HStack space={2} alignItems={'center'}>
                            <BookCalenderIcon />
                            <Text fontWeight={'400'} fontSize={12} color={'#8E8E93'}>
                                {`${data?.eventStart ? dayjs(new Date(data?.eventStart ?? ''))?.format('DD MMMM h:mmA') : ''} - ${data?.eventEnd ? dayjs(new Date(data?.eventEnd ?? ''))?.format('DD MMMM h:mmA') : ''}`}
                                </Text>
                        </HStack>
                        <HStack space={2} alignItems={'center'}>
                            <LocationIcon />
                            <Text fontWeight={'400'} fontSize={12} color={'#8E8E93'}>{data?.placeName ?? ''}</Text>
                        </HStack>
                    </VStack>
                </VStack>
                <VStack mt={5}>
                    <TextInput
                        onChangeText={(val: string) => setFieldValue("person", +val ?? 1)}
                        value={values.person?.toString() ?? 0}
                        label="Person"
                        placeholder="1"
                        keyboardType="numeric"
                        errorMsg={errors.person}
                        editable={false}
                    />
                    <TextInput
                        onChangeText={(val: string) => setFieldValue("promoCode", val)}
                        value={values.promoCode ?? ''}
                        label="Promo Code"
                        placeholder="promocode"
                        errorMsg={errors.promoCode}
                        editable={false}
                    />
                </VStack>
                <VStack mt={'3'} space={3}>
                    <HStack justifyContent={'space-between'}>
                        <Text fontWeight={'500'} fontSize={16} color={'#747688'}>Subtotal</Text>
                        <Text fontWeight={'500'} fontSize={16} color={'#747688'}>{data?.fees ?? 0}</Text>
                    </HStack>
                    <HStack justifyContent={'space-between'}>
                        <Text fontWeight={'500'} fontSize={16} color={'#747688'}>Fees</Text>
                        <Text fontWeight={'500'} fontSize={16} color={'#747688'}>0000</Text>
                    </HStack>
                    <HStack justifyContent={'space-between'}>
                        <Text fontWeight={'500'} fontSize={16} color={'#747688'}>Discount</Text>
                        <Text fontWeight={'500'} fontSize={16} color={'#747688'}>0000</Text>
                    </HStack>
                    <HStack mt={4} justifyContent={'space-between'}>
                        <Text fontWeight={'600'} fontSize={20}>Total</Text>
                        <Text fontWeight={'600'} fontSize={20}>{data?.fees ?? 0}</Text>
                    </HStack>
                </VStack>
                <ButtonComponent title='Confirm' onPress={submitForm} />
            </VStack>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
    }
})
export default BookEvent