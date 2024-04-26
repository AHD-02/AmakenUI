import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Animated, SafeAreaView, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { HeaderBG, LOGO } from '@/assets/images';
import { Image, Pressable } from 'native-base'
import { NotificationIcon } from '@/assets/icons';

const DynamicHeader = () => {
    const [searchVisible, setSearchVisible] = useState(true);
    const scrollY = useRef(new Animated.Value(0)).current;

    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
    };

    const headerBackgroundOpacity = scrollY.interpolate({
        inputRange: [0, 100],
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
                    source={HeaderBG}
                    style={styles.backgroundImage}
                    imageStyle={styles.backgroundImageStyle}
                    borderBottomRightRadius={20}
                    borderBottomLeftRadius={20}
                >
                    <View style={styles.overlay} />

                    <Animated.View style={[styles.header, { opacity: headerBackgroundOpacity }]}>
                        <Text style={styles.text} >Amaken</Text>
                        <Image source={LOGO} height={'32'} width={'56'} opacity={50} style={styles.logo} />
                        <TouchableOpacity onPress={() => { }}>
                            <NotificationIcon />
                        </TouchableOpacity>

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
        flex: 1,
        maxHeight: 200,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImageStyle: {
        height: 200,
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
        // opacity: '50%',
        resizeMode: "contain",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '100%',
        position: 'absolute',
        zIndex: 1,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    searchContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
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
