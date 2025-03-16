import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';

import { styles } from './styles';
import Colors from '../../../constants/Colors';
import { scale } from '../../../constants/Layout';
import { RootStackParamList } from '../../../navigation/interfaces';
import { RootState } from '../../../redux/store';
import { toggleViewMode } from '../../../redux/home/pokemonSlice';

const { white } = Colors;

const Header = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'FilterBottomSheetModal'>>();
  const viewMode = useSelector( ( state: RootState ) => state.pokemon.viewMode );
  const dispatch = useDispatch();

  const handleFilterButtonPress = () => {
    navigation.navigate( 'FilterBottomSheetModal' );
  };

  return (
    <View style={ styles.header }>
      <Text style={ styles.title }>Pokémon</Text>
      <View style={ styles.actions }>
        {/* Toggle between grid and list views */ }
        <TouchableOpacity
          style={ styles.iconButton }
          onPress={ () => dispatch( toggleViewMode() ) }
        >
          <Icon
            name={ viewMode === 'grid' ? 'format-list-bulleted' : 'view-grid-outline' }
            size={ scale( 24 ) }
            color={ white.light }
          />
        </TouchableOpacity>

        {/* Open filter bottom modal sheet */ }
        <TouchableOpacity
          style={ styles.iconButton }
          onPress={ handleFilterButtonPress }
        >
          <Icon name='tune' size={ scale( 24 ) } color={ white.light } />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;