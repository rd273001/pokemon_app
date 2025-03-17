import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { styles } from './styles';
import Colors from '../../constants/Colors';
import { scale } from '../../constants/Layout';
import { AppDispatch, RootState } from '../../redux/store';
import { setSelectedType, clearPokemonData } from '../../redux/home/pokemonSlice';
import { fetchPokemonByType, fetchPokemonList, fetchPokemonTypes } from '../../redux/home/asyncThunks';
import Spinner from '../../components/common/spinner/Spinner';

const { accent, gray, black } = Colors;

const FilterBottomSheetModal = () => {

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  // Get Pokemon types and selected type from Redux state
  const { pokemonTypes, selectedType, loading, error } = useSelector( ( state: RootState ) => state.pokemon );

  // Fetch Pokemon types when component mounts
  useEffect( () => {
    dispatch( fetchPokemonTypes() );
  }, [dispatch] );

  // Handle type selection
  const handleTypeSelect = ( type: string ) => {
    dispatch( clearPokemonData() );
    dispatch( setSelectedType( type ) );

    // Fetch Pokemon based on selected type
    if ( type === 'all' ) {
      dispatch( fetchPokemonList( { limit: 20, offset: 0 } ) );
    } else {
      dispatch( fetchPokemonByType( type ) );
    }

    // Navigate back to home screen after selection
    navigation.goBack();
  };

  const renderHeaderComponent = () => (
    <TouchableOpacity
      style={ styles.typeItem }
      onPress={ () => handleTypeSelect( 'all' ) }
    >
      <TouchableOpacity onPress={ () => handleTypeSelect( 'all' ) }>
        <Icon
          name={ selectedType === 'all' ? 'checkbox-marked' : 'checkbox-blank-outline' }
          size={ scale( 22 ) }
          color={ selectedType === 'all' ? accent.dark : gray.medium }
        />
      </TouchableOpacity>
      <Text style={ styles.typeName }>All</Text>
    </TouchableOpacity>
  );

  const refreshControl = () => (
    <RefreshControl
      refreshing={ loading && !!pokemonTypes?.length }
      onRefresh={ () => dispatch( fetchPokemonTypes() ) }
      colors={ [accent.dark] }
      progressBackgroundColor={ accent.light }
    />
  );

  // Render the type item with checkbox
  const renderTypeItem = ( { item }: { item: { name: string; url: string } } ) => {
    const isSelected = selectedType === item.name;

    return (
      <TouchableOpacity
        style={ styles.typeItem }
        onPress={ () => handleTypeSelect( item.name ) }
      >
        <TouchableOpacity onPress={ () => handleTypeSelect( item.name ) }>
          <Icon
            name={ isSelected ? 'checkbox-marked' : 'checkbox-blank-outline' }
            size={ scale( 22 ) }
            color={ isSelected ? accent.dark : gray.medium }
          />
        </TouchableOpacity>
        <Text style={ styles.typeName }>
          { item.name.charAt( 0 ).toUpperCase() + item.name.slice( 1 ) }
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={ styles.container }>
      <View style={ styles.header }>
        <Text style={ styles.title }>Filter by Type</Text>
        <TouchableOpacity onPress={ () => navigation.goBack() }>
          <Icon name='close' size={ 24 } color={ black.dark } />
        </TouchableOpacity>
      </View>

      {
        ( !loading || loading && pokemonTypes?.length ) && !error ?
          <FlatList
            data={ pokemonTypes }
            renderItem={ renderTypeItem }
            keyExtractor={ ( item ) => item.name }
            ListHeaderComponent={ renderHeaderComponent }
            refreshControl={ refreshControl() }
          />
          : <Spinner isLoading={ loading } />
      }
    </View>
  );
};

export default FilterBottomSheetModal;