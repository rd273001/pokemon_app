import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './home/pokemonSlice';

// Configure the Redux store
export const store = configureStore( {
  reducer: {
    pokemon: pokemonReducer
  },
} );

// Infer the RootState and AppDispatch types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;