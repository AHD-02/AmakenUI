import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { HStack, Image, VStack } from 'native-base'
import { EditProfileIcon, LogoutIcon } from '@/assets/icons'
import { colors } from '@/app/theme/Colors'
import { useUserInfo } from '@/app/state/user/hooks'

const ProfileHeader = () => {
  const userData = useUserInfo()

  return (
    <HStack justifyContent={'space-between'} marginX={4} marginY={'20'}>
      <TouchableOpacity style={styles.logoutButton}>
        <LogoutIcon />
      </TouchableOpacity>
      <VStack space={2}>
        <View style={styles.profileImage}>
          <Image
            source={{
              uri: userData?.images?.[0]
            }}
            alt='User Image'
            width={'full'}
            height={'full'}
            borderRadius={50}
          />
        </View>
        <Text style={styles.userName}>
            {`${userData?.firstName ?? ''} ${userData?.lastName ?? ''}`}
        </Text>
      </VStack>
      <TouchableOpacity style={styles.editButton}>
        <EditProfileIcon />
      </TouchableOpacity>
    </HStack>
  )
}

const styles = StyleSheet.create({
  logoutButton: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: '#C32B43',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6
  },
  editButton: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: '#27AE60',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6
  },
  profileImage: {
    height: 100,
    width: 100,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 50,
  },
  userName: {
    color: '#191E3A',
    fontWeight: '500',
    fontSize: 20,
  },
})
export default ProfileHeader