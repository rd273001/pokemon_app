import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { RootStackParamList } from './interfaces';
import HomeScreen from '../screens/home';
import FilterBottomSheetModal from '../screens/filter-bottom-sheet-modal';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='HomeScreen'
          component={ HomeScreen }
          options={ { headerShown: false } }
        />
        <Stack.Screen
          name='FilterBottomSheetModal'
          component={ FilterBottomSheetModal }
          options={ {
            presentation: 'transparentModal',
            headerShown: false,
          } }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;