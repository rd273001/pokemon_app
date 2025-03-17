import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPokemonByType, getPokemonList, getPokemonTypes } from "../../api/pokemon";

// AbortController for cancelling API requests
let abortController: AbortController | null = null;

export const fetchPokemonList = createAsyncThunk(
  'pokemon/fetchPokemonList',
  async ( { limit, offset }: { limit: number; offset: number }, { rejectWithValue } ) => {
    try {
      // Cancel any ongoing requests
      if ( abortController ) {
        abortController.abort();
      }

      // Create a new AbortController
      abortController = new AbortController();

      const response = await getPokemonList( limit, offset, abortController.signal );
      return response;
    } catch ( error ) {
      return rejectWithValue( `Failed to fetch Pokemon list: ${error}` );
    }
  }
);

// Async thunk for fetching Pokemon types
export const fetchPokemonTypes = createAsyncThunk(
  'pokemon/fetchPokemonTypes',
  async ( _, { rejectWithValue } ) => {
    try {
      // Cancel any ongoing requests
      if ( abortController ) {
        abortController.abort();
      }

      // Create a new AbortController
      abortController = new AbortController();

      const response = await getPokemonTypes( abortController.signal );
      return response;
    } catch ( error ) {
      return rejectWithValue( `Failed to fetch Pokemon types: ${error}` );
    }
  }
);

// Async thunk for fetching Pokemon by type
export const fetchPokemonByType = createAsyncThunk(
  'pokemon/fetchPokemonByType',
  async ( type: string, { rejectWithValue } ) => {
    try {
      // Cancel any ongoing requests
      if ( abortController ) {
        abortController.abort();
      }

      // Create a new AbortController
      abortController = new AbortController();

      const response = await getPokemonByType( type, abortController.signal );
      return response;
    } catch ( error ) {
      return rejectWithValue( `Failed to fetch Pokemon of type ${type}: ${error}` );
    }
  }
);