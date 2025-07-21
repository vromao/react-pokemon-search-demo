import { Outlet } from 'react-router';
import Container from 'react-bootstrap/Container';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export const Layout = () => (
  <div className="d-flex flex-column min-vh-100">
    <Header />
    <Container as="main" className="flex-grow-1 py-4">
      <Outlet />
    </Container>
    <Footer />
  </div>
);
