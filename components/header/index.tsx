import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { HeaderBG, LOGO } from '@/assets/images';
import { Image } from 'native-base'
import { NotificationIcon } from '@/assets/icons';
import { router } from 'expo-router';
import { useIsLoggedIn } from '@/app/state/user/hooks';
import ActionSheetScreen from '../sharedComponents/guestUserSscreen/actionsheet';

interface IProps {
    isBGHidden?: boolean
}

const DynamicHeader = ({ isBGHidden }: IProps) => {
    const [searchVisible, setSearchVisible] = useState(true);
    const [showAction, setShowAction] = useState(false);
    const scrollY = useRef(new Animated.Value(0)).current;
    const isLoggedIn = useIsLoggedIn();


    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
    };

    const headerBackgroundOpacity = scrollY.interpolate({
        inputRange: [0, 180],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>
            {/* <ScrollView TODO:
                style={{ flex: 1 }}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
            > */}
            <ImageBackground
                source={HeaderBG ?? ''}
                alt='bg'
                style={styles.backgroundImage}
                imageStyle={[styles.backgroundImageStyle, {...(isBGHidden ? {display: 'none'} : {})}]}
                borderBottomRightRadius={20}
                borderBottomLeftRadius={20}
            >
                <View style={[styles.overlay, 
                    {backgroundColor: `rgba(165, 88, 58, ${isBGHidden ? 1 : 0.6})`}
                ]} />

                <Animated.View style={[styles.header, { opacity: headerBackgroundOpacity }]}>
                    <View style={styles.header}>
                        <Text style={styles.text} >Amaken</Text>
                        <Image source={LOGO} height={'24'} width={'56'} opacity={50} style={styles.logo} alt='Amaken' />
                        
                      {isLoggedIn ?(

                      <TouchableOpacity onPress={() => router.push('/(notifications)')}>
                            <NotificationIcon />
                        </TouchableOpacity>
                      ):(
                        <TouchableOpacity onPress={() =>setShowAction(true)}>
                        <ActionSheetScreen
                        title='Sign In'
                        description='Discover events, meet new people and make memories'
                        isOpen={showAction}
                        onOpen={()=>setShowAction(true)}
                        onClose={()=>setShowAction(false)}
                        />
                        <NotificationIcon/>
                    </TouchableOpacity>
                      )}  

                    </View>
                </Animated.View>

                {/* Search input */}
                {searchVisible && (
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search..."
                            placeholderTextColor="#888"
                        />
                    </View>
                )}
            </ImageBackground>
            {/* </ScrollView> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 180,
        position: 'relative',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImageStyle: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(165, 88, 58, 0.6)',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    logo: {
        resizeMode: "contain",
        right: 14
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        width: '100%',
        zIndex: 1,
        marginBottom: 8
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    searchContainer: {
        position: 'absolute',
        bottom: 6,
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 10,
        zIndex: 1,
        backgroundColor: 'transparent',
    },
    searchInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
    },
});

export default DynamicHeader;
