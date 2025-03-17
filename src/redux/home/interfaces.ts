export interface IPokemonState {
  pokemonList: IPokemon[];
  filteredPokemonList: IPokemon[];
  pokemonTypes: IPokemonType[];
  selectedType: string;
  loading: boolean;
  error: string | null;
  totalCount: number;
  viewMode: ViewMode;
  offset: number;
  limit: number;
  hasMore: boolean;
  searchQuery: string;
}

export type ViewMode = 'grid' | 'list';

export interface IPokemon {
  id: number;
  name: string;
  url: string;
  image?: string;
  types?: string[];
};

export interface IPokemonType {
  name: string;
  url: string;
};

// Response type for Pokemon list API
export interface IPokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemon[];
};

// Response type for Pokemon type API
export interface IPokemonTypeResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemonType[];
};

export interface IPokemonByTypeResponse {
  id: number;
  name: string;
  pokemon: {
    pokemon: IPokemon;
    slot: number;
  }[];
};