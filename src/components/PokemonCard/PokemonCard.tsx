import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import { useFavoritesStore, type PokemonData } from '../../store/favorites';
import { typeColors } from '@/types';

interface PokemonCardProps {
  pokemon: PokemonData;
  className?: string;
}

export const PokemonCard = ({ className, pokemon }: PokemonCardProps) => {
  const { name, id, sprites, types } = pokemon;

  const isFavorite = useFavoritesStore((state) => state.isFavorite(id));
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(id);
      return;
    }

    addFavorite({
      id,
      name,
      sprites: {
        front_default: sprites.front_default || '',
      },
      types,
    });
  };

  return (
    <Card className={`shadow-sm ${className || ''}`} style={{ width: 300 }}>
      <Card.Header className="d-flex gap-1 bg-light justify-content-between align-items-center">
        <h5 className="text-capitalize mb-0">{name}</h5>
        <button
          className="btn ms-2"
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          style={{ color: isFavorite ? '#dc3545' : '#6c757d' }}
        >
          {isFavorite ? <HeartFill /> : <Heart />}
        </button>
      </Card.Header>
      <Card.Body>
        <Row className="align-items-center">
          <Col className="text-center">
            {sprites?.front_default ? (
              <Image src={sprites.front_default} alt={name} fluid />
            ) : (
              <div className="bg-light rounded p-3">No image</div>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <span className="d-block mb-3 text-body-tertiary">N° {id}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            {types.map((t) => (
              <span
                key={t.type.name}
                className={`badge me-1 ${typeColors[t.type.name] || 'bg-info'}`}
              >
                {t.type.name}
              </span>
            ))}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
