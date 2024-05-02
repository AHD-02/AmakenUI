import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import DetailsSection from './components/detailsSection';
import ImagesSection from './components/imagesSection';
import { useGetEventQuery } from '../data/events';
import Toast from 'react-native-toast-message';

const CustomShape = () => {
  const local = useLocalSearchParams();
  const { data, error } = useGetEventQuery(local.eventId as string ?? '')

  useEffect(() => {
    if (error)
      Toast.show({
        type: 'error',
        text1: JSON.stringify((error as any)?.data)
      })
  }, [error])

  return (
    <View style={styles.container}>
      <View style={styles.imagesContainer}>
        <ImagesSection data={data}/>
      </View>
      <View style={styles.detailsContainer}>
        <DetailsSection data={data}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imagesContainer: {
    width: '100%',
    height: '40%',
  },
  detailsContainer: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 10,
    width: '100%',
    height: '64%',
    backgroundColor: 'white',
    borderTopEndRadius: 34,
    borderTopStartRadius: 34,
  },
});

export default CustomShape;