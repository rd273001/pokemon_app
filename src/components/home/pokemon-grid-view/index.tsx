import React, { memo, useCallback } from 'react';
import { FlatList, ActivityIndicator, Text } from 'react-native';
import { styles } from './styles';
import Colors from '../../../constants/Colors';
import { scale } from '../../../constants/Layout';
import { IPokemonGridViewProps } from './interfaces';
import Spinner from '../../common/spinner/Spinner';
import PokemonCard from '../pokemon-card';

const PokemonGridView = ( {
  pokemon,
  loading,
  onEndReached,
  hasMore,
  refreshControl,
  error
}: IPokemonGridViewProps ) => {

  // Render footer with loading indicator or end message
  const renderFooter = useCallback( () => {
    if ( loading && pokemon?.length && !error )
      return <ActivityIndicator size={ scale( 24 ) } color={ Colors.accent.dark } style={ styles.loader } />;

    if ( !hasMore && pokemon?.length )
      return <Text style={ styles.endMessage }>List ended</Text>;

    return null;
  }, [loading, pokemon?.length, hasMore, error] );

  const renderEmptyListComponent = useCallback( () => {
    // Show Spinner for initial list data loading
    if ( !pokemon?.length && loading )
      return <Spinner isLoading={ loading } />;

    // Show Empty message when no Pokemon are available
    return <Text style={ styles.emptyText }>{ error ? 'Failed to fetch Pokemon list!' : 'No Pokémon found!' }</Text>;
  }, [pokemon?.length, loading, error] );

  return (
    <FlatList
      data={ pokemon }
      numColumns={ 3 }
      renderItem={ ( { item } ) => <PokemonCard pokemon={ item } isGridView={ true } /> }
      keyExtractor={ ( item, index ) => item.id.toString() + index.toString() }
      onEndReached={ hasMore ? onEndReached : null }
      onEndReachedThreshold={ 0.5 }
      extraData={ loading }
      removeClippedSubviews={ true }
      maxToRenderPerBatch={ 15 }
      updateCellsBatchingPeriod={ 50 }
      windowSize={ 21 }
      initialNumToRender={ 12 }
      refreshControl={ refreshControl }
      ListFooterComponent={ renderFooter }
      ListEmptyComponent={ renderEmptyListComponent }
      contentContainerStyle={ styles.container }
      columnWrapperStyle={ styles.columnWrapperContainer }
    />
  );
};

export default memo( PokemonGridView );