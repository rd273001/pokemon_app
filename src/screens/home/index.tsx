import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { styles } from './styles';
import Header from '../../components/home/header';

const HomeScreen = () => {

  return (
    <SafeAreaView style={ styles.safeArea }>
      <View style={ styles.container }>
        <Header />

      </View>
    </SafeAreaView>
  )
};

export default HomeScreen;