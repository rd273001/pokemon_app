import React, { useCallback, useEffect, useMemo } from 'react';
import { SafeAreaView, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { styles } from './styles';
import Header from '../../components/home/header';
import SearchBar from '../../components/home/search-bar';
import PokemonGridView from '../../components/home/pokemon-grid-view';
import PokemonListView from '../../components/home/pokemon-list-view';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchPokemonList } from '../../redux/home/asyncThunks';
import Colors from '../../constants/Colors';

const HomeScreen = () => {

  const dispatch = useDispatch<AppDispatch>();

  // Get Pokemon data from Redux store
  const {
    filteredPokemonList,
    loading,
    viewMode,
    hasMore,
    limit,
    offset,
    selectedType,
    error
  } = useSelector( ( state: RootState ) => state.pokemon );

  // Fetch initial Pokemon data when component mounts
  useEffect( () => {
    if ( selectedType === 'all' ) {
      dispatch( fetchPokemonList( { limit, offset: 0 } ) );
    }
  }, [dispatch, selectedType] );

  // Load more Pokemon when reaching the end of the list
  const handleLoadMore = useCallback( () => {
    if ( !loading && hasMore && selectedType === 'all' ) {
      dispatch( fetchPokemonList( { limit, offset } ) );
    }
  }, [loading, hasMore, selectedType, dispatch, limit, offset] );

  const refreshControl = useMemo( () => (
    <RefreshControl
      refreshing={ loading && !!filteredPokemonList?.length }
      onRefresh={ () => dispatch( fetchPokemonList( { limit, offset: 0 } ) ) }
      colors={ [Colors.accent.dark] }
      progressBackgroundColor={ Colors.accent.light }
    />
  ), [loading, filteredPokemonList?.length, dispatch, limit] );

  return (
    <SafeAreaView style={ styles.container }>
      <Header />

      <SearchBar />

      {/* Render Pokemon in grid or list view based on viewMode */ }
      { viewMode === 'grid' ? (
        <PokemonGridView
          pokemon={ filteredPokemonList }
          loading={ loading }
          onEndReached={ handleLoadMore }
          hasMore={ hasMore }
          refreshControl={ refreshControl }
          error={ error }
        />
      ) : (
        <PokemonListView
          pokemon={ filteredPokemonList }
          loading={ loading }
          onEndReached={ handleLoadMore }
          hasMore={ hasMore }
          refreshControl={ refreshControl }
          error={ error }
        />
      ) }
    </SafeAreaView>
  )
};

export default HomeScreen;