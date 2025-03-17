import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
import Colors from '../../../constants/Colors';
import { scale } from '../../../constants/Layout';
import { RootState } from '../../../redux/store';
import { setSearchQuery } from '../../../redux/home/pokemonSlice';

const SearchBar = () => {
  const dispatch = useDispatch();

  // Get current search query from Redux state
  const searchQuery = useSelector( ( state: RootState ) => state.pokemon.searchQuery );

  // Handle search input change
  const handleSearch = ( text: string ) => {
    dispatch( setSearchQuery( text ) );
  };

  // Clear search query
  const clearSearch = () => {
    dispatch( setSearchQuery( '' ) );
  };

  return (
    <View style={ styles.container }>
      <View style={ styles.searchContainer }>
        <Icon name='search' size={ scale( 20 ) } color={ Colors.gray.medium } style={ styles.icon } />
        <TextInput
          style={ styles.input }
          placeholder='Search Pokémon...'
          value={ searchQuery }
          onChangeText={ handleSearch }
          autoCapitalize='none'
        />
        { searchQuery ? (
          <TouchableOpacity onPress={ clearSearch }>
            <Icon name='close' size={ scale( 20 ) } color={ Colors.gray.medium } />
          </TouchableOpacity>
        ) : null }
      </View>
    </View>
  );
};

export default SearchBar;