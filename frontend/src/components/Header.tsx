import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <a href="/" className="d-flex align-items-center text-white text-decoration-none">
                        <i className="bi bi-camera-reels text-white fs-1"></i>
                        <span className="ms-2 fs-3">FilmFinder</span>
                    </a>

                    <div className="text-end">
                        <Link to="/favorite"  className="btn btn-outline-light me-2">Favoritos</Link>
                        <Link to="/search" className="btn btn-success mt-auto">Buscar Filmes</Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
