import { useQuery } from '@tanstack/react-query';

interface PokemonData {
  id: number;
  name: string;
  sprites: {
    front_default?: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

/**
 * Fetches Pokemon data from the PokeAPI
 * @param name Pokemon name or ID
 * @returns API response data
 */
const fetchPokemon = async (name: string): Promise<PokemonData> => {
  if (!name) throw new Error('Pokemon name is required');

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
  if (!res.ok) throw new Error('Pokémon not found');

  return res.json();
};

interface UsePokemonOptions {
  enabled?: boolean;
}

/**
 * Custom hook to fetch Pokemon data
 * @param pokemonName Name or ID of the Pokemon to fetch
 * @param options Additional query options
 */
export const usePokemon = (pokemonName: string, options: UsePokemonOptions = {}) =>
  useQuery({
    queryKey: ['pokemon', pokemonName],
    queryFn: () => fetchPokemon(pokemonName),
    enabled: !!pokemonName && options.enabled !== false,
    retry: false,
  });
