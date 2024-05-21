import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { useTypedSelector } from './state/store'
import Spinner from 'react-native-loading-spinner-overlay'
import { colors } from './theme/Colors'
import RootLayoutNav from './rootLayoutNav'

const LoadingLayout = () => {
    const isLoading = useTypedSelector(state => state.app.isLoading)

    return (
        <>
            {isLoading && <Spinner visible={true} color={colors.primary} />}
            <StatusBar barStyle={'dark-content'} />
            <RootLayoutNav />
        </>
    )
}

export default LoadingLayout