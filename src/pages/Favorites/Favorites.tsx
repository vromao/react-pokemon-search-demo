import { PokemonCard } from '@/components/PokemonCard';
import { useFavoritesStore } from '@/store/favorites';
import Alert from 'react-bootstrap/Alert';

export const Favorites = () => {
  const favorites = useFavoritesStore((state) => state.favorites);

  return (
    <div className="container d-flex gap-1 flex-wrap">
      {!favorites.length && (
        <Alert variant="warning" className="w-100 text-center">
          No favorites added yet. Start adding some!
        </Alert>
      )}

      {favorites.map((pokemon) => (
        <PokemonCard className="mx-2" key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};
