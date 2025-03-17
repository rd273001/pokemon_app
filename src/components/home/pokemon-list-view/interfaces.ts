import { IPokemon } from "../../../redux/home/interfaces";

export interface IPokemonListViewProps {
  pokemon: IPokemon[];
  loading: boolean;
  onEndReached: () => void;
  hasMore: boolean;
  refreshControl: React.JSX.Element;
  error: string | null;
};