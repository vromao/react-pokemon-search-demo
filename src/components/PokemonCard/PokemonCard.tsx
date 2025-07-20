import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import { useFavoritesStore, type PokemonData } from '../../store/favorites';

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
          <Col xs={4} className="text-center">
            {sprites?.front_default ? (
              <img
                src={sprites.front_default}
                alt={name}
                style={{ width: 96, height: 96 }}
                className="img-fluid"
              />
            ) : (
              <div className="bg-light rounded p-3">No image</div>
            )}
          </Col>
          <Col>
            <Card.Text className="d-flex flex-column">
              <div>
                <strong>Dex n°:</strong> {id}
              </div>
              <div>
                <strong>Type:</strong>
                {types.map((t) => (
                  <span key={t.type.name} className="badge bg-info text-dark mx-1">
                    {t.type.name}
                  </span>
                ))}
              </div>
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
