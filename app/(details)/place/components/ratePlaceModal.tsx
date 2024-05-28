import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Center, Modal, VStack, Text } from 'native-base'
import StarRating from 'react-native-star-rating-widget'
import { useRatePlaceMutation } from '@/app/data/publicPlace'
import { ButtonComponent } from '@/components/sharedComponents'
import Toast from 'react-native-toast-message'

interface IProps {
    isOpen: boolean
    onClose: () => void
    id: string
}

const RatePlaceModal = ({ isOpen, onClose, id }: IProps) => {
    const [handleRate, { isLoading, error, data }] = useRatePlaceMutation()
    const [score, setScore] = useState<number>(0)

    useEffect(() => {
        if (error || data) {
            Toast.show({
                type: 'info',
                text1: data ? JSON.stringify(data ?? '') : JSON.stringify((error as any).data ?? '')
            })
            onClose()
        }
    }, [data, error])

    return (
        <View>
            <Modal isOpen={isOpen} onClose={onClose}>
                <Modal.Content width={'80%'}>
                    <Modal.Header>
                        <Center>
                            <Text fontSize={18} fontWeight={'500'}>Rate The Place</Text>
                        </Center>
                    </Modal.Header>
                    <Modal.Body>
                        <VStack alignItems={'center'} space={6}>
                            <StarRating
                                rating={score}
                                onChange={(score: number) => setScore(score)}
                                enableHalfStar={false}
                            />
                            <ButtonComponent
                                title='Submit'
                                onPress={() => {
                                    if (score >= 1)
                                        handleRate({ id, score })
                                    else
                                        Toast.show({ type: 'error', text1: 'Add Your Rate To Submit' })
                                }}
                                isLoading={isLoading}
                            />
                        </VStack>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </View>
    )
}

export default RatePlaceModal