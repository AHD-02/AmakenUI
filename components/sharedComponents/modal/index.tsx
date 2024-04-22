import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { Modal } from 'native-base'

interface IProps {
    isOpen: boolean
    onClose: () => void
    header?: string
    children: React.JSX.Element
    style?: StyleProp<ViewStyle>
}
const ModalComponent = (props: IProps) => {
    return (
        <View>
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <Modal.Content style={props.style}>
                    <Modal.CloseButton />
                    {props.header && <Modal.Header>{props.header}</Modal.Header>}
                    <Modal.Body>
                        {props.children}
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </View>
    )
}

export default ModalComponent