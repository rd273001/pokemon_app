import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPokemonState } from './interfaces';
import { fetchPokemonByType, fetchPokemonList, fetchPokemonTypes } from './asyncThunks';

const initialState: IPokemonState = {
  viewMode: 'grid',
  pokemonList: [],
  filteredPokemonList: [],
  pokemonTypes: [],
  selectedType: 'all',
  loading: false,
  error: null,
  totalCount: 0,
  offset: 0,
  limit: 20,
  hasMore: true,
  searchQuery: '',
};

const pokemonSlice = createSlice( {
  name: 'pokemon',
  initialState,
  reducers: {
    // Toggle view mode between grid and list
    toggleViewMode: ( state ) => {
      state.viewMode = state.viewMode === 'grid' ? 'list' : 'grid';
    },
    // Set the selected Pokemon type
    setSelectedType: ( state, action: PayloadAction<string> ) => {
      state.selectedType = action.payload;
      state.offset = 0;
      state.hasMore = true;

      // Reset filtered list when changing types
      if ( action.payload === 'all' ) {
        state.filteredPokemonList = state.pokemonList;
      }
    },

    // Filter Pokemon by search query
    setSearchQuery: ( state, action: PayloadAction<string> ) => {
      state.searchQuery = action.payload;

      // Apply search filter to the appropriate list
      const sourceList = state.selectedType === 'all' ? state.pokemonList : state.filteredPokemonList;

      if ( action.payload ) {
        state.filteredPokemonList = sourceList.filter( pokemon =>
          pokemon.name.toLowerCase().includes( action.payload.toLowerCase() )
        );
      } else if ( state.selectedType === 'all' ) {
        state.filteredPokemonList = state.pokemonList;
      }
    },

    // Reset filters and search
    resetFilters: ( state ) => {
      state.selectedType = 'all';
      state.searchQuery = '';
      state.filteredPokemonList = state.pokemonList;
      state.offset = 0;
      state.hasMore = true;
    },

    // Clear Pokemon data when switching types
    clearPokemonData: ( state ) => {
      state.pokemonList = [];
      state.filteredPokemonList = [];
      state.offset = 0;
      state.hasMore = true;
    },
  },

  extraReducers: ( builder ) => {
    builder
      // Handle fetchPokemonList
      .addCase( fetchPokemonList.pending, ( state ) => {
        state.loading = true;
        state.error = null;
      } )
      .addCase( fetchPokemonList.fulfilled, ( state, action ) => {
        state.loading = false;

        if ( state.offset === 0 ) {
          // Replace list if starting from offset 0
          state.pokemonList = action.payload.results;
        } else {
          // Append to existing list if paginating
          state.pokemonList = [...state.pokemonList, ...action.payload.results];
        }

        state.filteredPokemonList = state.pokemonList;
        state.totalCount = action.payload.count;
        state.hasMore = !!action.payload.next;
        state.offset += state.limit;

        // Apply any existing search filter
        if ( state.searchQuery ) {
          state.filteredPokemonList = state.pokemonList.filter( pokemon =>
            pokemon.name.toLowerCase().includes( state.searchQuery.toLowerCase() )
          );
        }
      } )
      .addCase( fetchPokemonList.rejected, ( state, action ) => {
        state.loading = false;
        state.error = action.payload as string;
      } )

      // Handle fetchPokemonTypes
      .addCase( fetchPokemonTypes.pending, ( state ) => {
        state.loading = true;
        state.error = null;
      } )
      .addCase( fetchPokemonTypes.fulfilled, ( state, action ) => {
        state.loading = false;
        state.pokemonTypes = action.payload.results;
      } )
      .addCase( fetchPokemonTypes.rejected, ( state, action ) => {
        state.loading = false;
        state.error = action.payload as string;
      } )

      // Handle fetchPokemonByType
      .addCase( fetchPokemonByType.pending, ( state ) => {
        state.loading = true;
        state.error = null;
      } )
      .addCase( fetchPokemonByType.fulfilled, ( state, action ) => {
        state.loading = false;

        // Transform the response to match our Pokemon interface
        const typedPokemon = action.payload.pokemon.map( item => ( {
          ...item.pokemon,
        } ) );

        state.pokemonList = typedPokemon;
        state.filteredPokemonList = typedPokemon;
        state.hasMore = false; // No pagination for type filtering

        // Apply any existing search filter
        if ( state.searchQuery ) {
          state.filteredPokemonList = state.pokemonList.filter( pokemon =>
            pokemon.name.toLowerCase().includes( state.searchQuery.toLowerCase() )
          );
        }
      } )
      .addCase( fetchPokemonByType.rejected, ( state, action ) => {
        state.loading = false;
        state.error = action.payload as string;
      } );
  },
} );

export const {
  toggleViewMode,
  setSelectedType,
  setSearchQuery,
  resetFilters,
  clearPokemonData
} = pokemonSlice.actions;

export default pokemonSlice.reducer;