import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { HStack, Modal, Text } from 'native-base'
import { CloseIcon } from '@/assets/icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera'
import { useCheckTicketMutation } from '@/app/data/events'
import Toast from 'react-native-toast-message'

interface IProps {
    isOpen: boolean
    onClose: () => void
    eventID: string
}

const ScanTicketModal = ({ isOpen, onClose, eventID }: IProps) => {
    const [permission, requestPermission] = useCameraPermissions();
    const [allowScan, setAllowScan] = useState<boolean>(true)
    const [checkTicket, { data, error }] = useCheckTicketMutation()

    const handleClose = () => {
        setAllowScan(true)
        onClose()
    }
    useEffect(() => {
        if (!permission)
            requestPermission()
    }, [])

    useEffect(() => {
        if (data)
            Toast.show({
                type: 'success',
                text1: 'Ticket is Valid',
            })
        else if (error)
            Toast.show({
                type: 'error',
                text1: 'Wrong Ticket',
            })
        if (data || error)
            setTimeout(() => setAllowScan(true), 2000)

    }, [data])

    return (
        <>
            <Modal isOpen={isOpen} onClose={handleClose}>
                <Modal.Content width={'80%'}>
                    <Modal.Header>
                        <HStack justifyContent={'space-between'}>
                            <Text fontSize={18} fontWeight={'500'}>Scan Ticket</Text>
                            <TouchableOpacity onPress={handleClose}>
                                <CloseIcon />
                            </TouchableOpacity>
                        </HStack>
                    </Modal.Header>
                    <Modal.Body>
                        <View style={{ flex: 1 }}>
                            <CameraView
                                style={{ height: 400, width: '100%' }}
                                barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                                onBarcodeScanned={(res: BarcodeScanningResult) => {
                                    if (allowScan) {
                                        setAllowScan(false)
                                        checkTicket({ eventID, reservationID: res.data })
                                    }
                                }}
                            />

                        </View>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default ScanTicketModal