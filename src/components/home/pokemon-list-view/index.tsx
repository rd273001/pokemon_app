import React from 'react';
import { FlatList, ActivityIndicator, Text } from 'react-native';
import { styles } from './styles';
import { IPokemonListViewProps } from './interfaces';
import PokemonCard from '../pokemon-card';
import Spinner from '../../common/spinner/Spinner';
import { scale } from '../../../constants/Layout';
import Colors from '../../../constants/Colors';

const PokemonList = ( {
  pokemon,
  loading,
  onEndReached,
  hasMore,
  refreshControl,
  error
}: IPokemonListViewProps ) => {

  // Render footer with loading indicator or end message
  const renderFooter = () => {
    if ( loading && pokemon?.length && !error )
      return <ActivityIndicator size={ scale( 24 ) } color={ Colors.accent.dark } style={ styles.loader } />;

    if ( !hasMore && pokemon?.length )
      return <Text style={ styles.endMessage }>List ended</Text>;

    return null;
  };

  const renderEmptyListComponent = () => {
    // Show Spinner for initial list data loading
    if ( !pokemon?.length && loading )
      return <Spinner isLoading={ loading } />;

    // Show Empty message when no Pokemon are available
    return <Text style={ styles.emptyText }>{ error ? 'Failed to fetch Pokemon list !' : 'No Pokémon found !' }</Text>;
  };

  return (
    <FlatList
      data={ pokemon }
      renderItem={ ( { item } ) => <PokemonCard pokemon={ item } isGridView={ false } /> }
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
    />
  );
};

export default PokemonList;