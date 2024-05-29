import {  Center, ScrollView } from 'native-base';
import { Image, View } from "react-native";
import { useIsLoggedIn } from '../state/user/hooks';
import GuestScreen from '@/components/sharedComponents/guestUserSscreen/guestScreen';
import TabbssScreen from '@/components/editProfile/tabbssScreen';
import { SafeAreaView } from 'react-native';
import { LOGO } from '@/assets/images';
import DynamicHeader from '@/components/header';

const Saved = () => {
  const isLoggedIn = useIsLoggedIn();


  return (
    <SafeAreaView style={{ flex: 1 ,backgroundColor:'white'}}>
      {isLoggedIn? (

        <ScrollView pt={6} mx={2}>
         <TabbssScreen isSaved/>
        </ScrollView>
     
      ):(
        <GuestScreen
        title="Searching for your Bookinngs?"
        description="Login to find them all"
      />
      )}
    </SafeAreaView>
  );
}

export default Saved