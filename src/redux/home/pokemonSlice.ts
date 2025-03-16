import { createSlice } from '@reduxjs/toolkit';
import { IPokemonState } from './interfaces';

const initialState: IPokemonState = {
  viewMode: 'grid',
};

const pokemonSlice = createSlice( {
  name: 'pokemon',
  initialState,
  reducers: {
    // Toggle view mode between grid and list
    toggleViewMode: ( state ) => {
      state.viewMode = state.viewMode === 'grid' ? 'list' : 'grid';
    },
  },
} );

export const {
  toggleViewMode,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;