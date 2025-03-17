import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IPokemonCardProps } from './interfaces';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';

const PokemonCard = ( { pokemon, isGridView }: IPokemonCardProps ) => {
  // Capitalize first letter of Pokemon name
  const capitalizedName = pokemon.name.charAt( 0 ).toUpperCase() + pokemon.name.slice( 1 );

  // Grid view card
  if ( isGridView ) {
    return (
      <TouchableOpacity style={ styles.gridCard }>
        <FastImage
          source={ { uri: pokemon.image } }
          style={ styles.gridImage }
          resizeMode={ FastImage.resizeMode.contain }
        />
        <View style={ styles.gridInfoContainer }>
          <Text style={ styles.gridName }>{ capitalizedName }</Text>
          <Text style={ styles.gridId }>#{ pokemon.id }</Text>
        </View>
      </TouchableOpacity>
    );
  }

  // List view card
  return (
    <TouchableOpacity style={ styles.listCard }>
      <FastImage
        source={ { uri: pokemon.image } }
        style={ styles.listImage }
        resizeMode={ FastImage.resizeMode.contain }
      />
      <View style={ styles.listInfoContainer }>
        <Text style={ styles.listName }>{ capitalizedName }</Text>
        <Text style={ styles.listId }>#{ pokemon.id }</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PokemonCard;