import { IPokemon, IPokemonByTypeResponse, IPokemonListResponse, IPokemonTypeResponse } from "../redux/home/interfaces";

// Base URL for the PokeAPI, usually defined in ENV file
const BASE_URL = 'https://pokeapi.co/api/v2';

// Function to get Pokemon list with pagination
export const getPokemonList = async (
  limit: number = 20,
  offset: number = 0,
  signal?: AbortSignal
): Promise<IPokemonListResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
      { signal }
    );
    const data = await response.json();

    // Enhance the results with image URLs and IDs
    const enhancedResults = data.results.map( ( pokemon: IPokemon ) => {
      // Extract Pokemon ID from URL
      const urlParts = pokemon.url.split( '/' );
      const id = parseInt( urlParts[urlParts.length - 2] );

      return {
        ...pokemon,
        id,
        // Get the official artwork image URL
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      };
    } );

    return {
      ...data,
      results: enhancedResults,
    };
  } catch ( error ) {
    // Only rethrow if it's not an AbortError
    if ( !( error instanceof DOMException && error.name === 'AbortError' ) ) {
      throw error;
    }
    return { count: 0, next: null, previous: null, results: [] };
  }
};

// Function to get all Pokemon types
export const getPokemonTypes = async ( signal?: AbortSignal ): Promise<IPokemonTypeResponse> => {
  try {
    const response = await fetch( `${BASE_URL}/type`, { signal } );
    return await response.json();
  } catch ( error ) {
    if ( !( error instanceof DOMException && error.name === 'AbortError' ) ) {
      throw error;
    }
    return { count: 0, next: null, previous: null, results: [] };
  }
};

// Function to get Pokemon by type
export const getPokemonByType = async (
  type: string,
  signal?: AbortSignal
): Promise<IPokemonByTypeResponse> => {
  try {
    const response = await fetch( `${BASE_URL}/type/${type}`, { signal } );
    const data = await response.json();

    // Enhance Pokemon data with images
    const enhancedPokemon = data.pokemon.map( ( item: { pokemon: IPokemon } ) => {
      const urlParts = item.pokemon.url.split( '/' );
      const id = parseInt( urlParts[urlParts.length - 2] );

      return {
        ...item,
        pokemon: {
          ...item.pokemon,
          id,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        }
      };
    } );

    return {
      ...data,
      pokemon: enhancedPokemon
    };
  } catch ( error ) {
    if ( !( error instanceof DOMException && error.name === 'AbortError' ) ) {
      throw error;
    }
    return { id: 0, name: '', pokemon: [] };
  }
};