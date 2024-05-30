import { View } from 'react-native'
import React from 'react'
import { HStack, Image, Modal, Text, VStack } from 'native-base'
import { ButtonComponent } from '@/components/sharedComponents'
import { imageUrlResolver } from '@/app/utils/imageUtils'

interface IProps {
    isOpen: boolean
    onClose: () => void
    onSave: () => void
    img: string
}

const ImageModal = ({ isOpen, onClose, onSave, img }: IProps) => {

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <Modal.Content width={'80%'} borderRadius={10}>
                    <Modal.Body>
                        <VStack space={6} marginX={4} marginY={4}>
                            <Image source={{ uri: (img as any)?.value }} alt='ERROR' height={'300'} width={'100%'} resizeMode='cover' />
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <HStack justifyContent={'space-between'} space={6}>
                            <View style={{ width: '40%' }}>
                                <ButtonComponent title='Close' onPress={onClose} isLogout />
                            </View>
                            <View style={{ width: '40%' }}>
                                <ButtonComponent title='Save' onPress={onSave} isEdit />
                            </View>
                        </HStack>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default ImageModal