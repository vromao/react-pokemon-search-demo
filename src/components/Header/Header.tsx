import { RoutesPaths } from '@/routes';
import { Link } from 'react-router';

export const Header = () => {
  return (
    <header className="p-4 mb-4 text-white text-uppercase bg-indigo">
      <div className="container">
        <h1 className="fs-4 fw-bold text-center">Poke search demo</h1>

        <nav>
          <ul className="d-flex gap-2 list-unstyled">
            <li>
              <Link className="p-2 text-decoration-none btn btn-light" to={RoutesPaths.HOME}>
                Home
              </Link>
            </li>
            <li>
              <Link className="p-2 text-decoration-none btn btn-light" to={RoutesPaths.FAVORITES}>
                Favorites
              </Link>
            </li>
            <li>
              <Link className="p-2 text-decoration-none btn btn-light" to={RoutesPaths.CONTACT}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
