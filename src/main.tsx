import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from "react-router";
import { RoutesPaths } from './routes.ts';
import { Favorites } from './pages/Favorites/Favorites.tsx';
import { Layout } from './pages/Layout/Layout.tsx';
import { Home } from './pages/Home/Home.tsx';
import { Contact } from './pages/Contact/Contact.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={RoutesPaths.FAVORITES} element={<Favorites />} />
            <Route path={RoutesPaths.CONTACT} element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
