import { create } from 'zustand';

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonData {
  id: number;
  name: string;
  sprites: {
    front_default?: string;
  };
  types: PokemonType[];
}

interface FavoritesState {
  favorites: PokemonData[];
  addFavorite: (pokemon: PokemonData) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  addFavorite: (pokemon) =>
    set((state) =>
      state.favorites.some((fav) => fav.id === pokemon.id)
        ? state
        : { favorites: [...state.favorites, pokemon] },
    ),
  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav.id !== id),
    })),
  isFavorite: (id) => get().favorites.some((fav) => fav.id === id),
}));
