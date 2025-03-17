import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { IPokemonCardProps } from './interfaces';
import { styles } from './styles';

const PokemonCard = ( { pokemon, isGridView }: IPokemonCardProps ) => {
  // Capitalize first letter of Pokemon name
  const capitalizedName = pokemon.name.charAt( 0 ).toUpperCase() + pokemon.name.slice( 1 );

  // Grid view card
  if ( isGridView ) {
    return (
      <TouchableOpacity style={ styles.gridCard }>
        <Image
          source={ { uri: pokemon.image } }
          style={ styles.gridImage }
          resizeMode='contain'
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
      <Image
        source={ { uri: pokemon.image } }
        style={ styles.listImage }
        resizeMode='contain'
      />
      <View style={ styles.listInfoContainer }>
        <Text style={ styles.listName }>{ capitalizedName }</Text>
        <Text style={ styles.listId }>#{ pokemon.id }</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PokemonCard;