import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useSearchEventsCategoriesQuery } from '../data/events'
import { useSearchPublicPlacesCategoriesQuery } from '../data/publicPlace'
import { LookUpModel } from '../types'
import { Badge, HStack } from 'native-base'
import { colors } from '../theme/Colors'
import { ButtonComponent } from '@/components/sharedComponents'
import { useUpdateUserMutation } from '../data/user'
import { useUserInfo } from '../state/user/hooks'
import { SignupModel } from '../types/user/signup'
import { router } from 'expo-router'
import { SCREENS } from '@/components/screens'

const Categories = () => {
  const { data: publicPlaceCategories } = useSearchPublicPlacesCategoriesQuery()
  const { data: eventsCategories } = useSearchEventsCategoriesQuery()
  const [updateUser, {isSuccess}] = useUpdateUserMutation()
  const [selected, setSelected] = useState<Array<string>>([])

  const categories = useMemo(() => eventsCategories ? publicPlaceCategories?.concat(eventsCategories) : []
    , [publicPlaceCategories, eventsCategories])
    const userInfo = useUserInfo()

    useEffect(() => {
      if(isSuccess)
        router.replace(`/${SCREENS.Main}/`);
    },[isSuccess])
  
  return (
    <View style={{backgroundColor: 'white', flex: 1, padding: 16}}>
      <StatusBar barStyle={'dark-content'}/>
      <HStack space={{
        base: 2,
        sm: 4
      }} mx={{
        base: "auto",
        md: 0
      }}
        flexWrap={'wrap'}
      >
        {categories?.map((item: LookUpModel) => {
          const isSelected = selected?.some(id => id == item.value)
          return (
            <TouchableOpacity onPress={async () => {
              if (isSelected)
                setSelected(prev => (prev?.filter(id => item.value != id)))
              else
                setSelected(prev => ([...prev, item.value]))
            }} style={{marginTop: 6}}>
              <Badge variant={isSelected ? 'solid' : 'subtle'} 
              {...(isSelected) ? {backgroundColor: colors.primary} : {}}
              >
                {item.label}
              </Badge>
            </TouchableOpacity>
          )
        })}
      </HStack>
      <ButtonComponent title='Submit' onPress={() => userInfo && updateUser({ ...userInfo, intrests: selected ?? [] } as any)}/>
    </View>
  )
}

export default Categories