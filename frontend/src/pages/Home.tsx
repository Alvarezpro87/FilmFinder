import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 150px)' }}>
      <h1 className="display-4 text-center mb-4">Bem-vindo ao FilmFinder</h1>
      <p className="lead text-center mb-5">Seu aplicativo para buscar e salvar seus filmes favoritos.</p>
      <div className="d-flex gap-3">
        <Link to="/search" className="btn btn-success mt-auto btn-lg">Buscar Filmes</Link>
        <Link to="/favorite" className="btn btn-secondary bg-dark btn-lg">Ver Favoritos</Link>
      </div>
    </div>
  );
};
//
export default Home;
