import React from 'react';
import FavoriteMovies from '../components/FavoriteMovies';

const Favorites: React.FC = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            
            <main className="flex-fill">
                <div className="container my-5">
                    <FavoriteMovies />
                </div>
            </main>
            
        </div>
    );
};

export default Favorites;
