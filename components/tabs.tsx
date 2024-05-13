import { View, Text } from 'react-native'
import React from 'react'

interface IProps {
    value: number
    setValue: (val: number) => void
}

const Tabs = ({value, setValue}: IProps) => {
  return (
    <View>
      {/* <Tab 
        setIndex={(value: number) => setValue(value)}
        value={value}
      > */}
    </View>
  )
}

export default Tabs