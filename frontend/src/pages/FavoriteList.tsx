import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Favorite {
    id: number;
    movieId: number;
    title: string;
    posterPath: string;
    releaseDate: string;
}

const FavoriteList: React.FC = () => {
    const [favorites, setFavorites] = useState<Favorite[]>([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/favorites', {
                    params: { username: 'alex' }
                });
                setFavorites(response.data);
            } catch (error) {
                console.error('Erro ao buscar favoritos:', error);
            }
        };

        fetchFavorites();
    }, []);

    const removeFavorite = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/favorites/${id}`);
            setFavorites(favorites.filter(fav => fav.id !== id));
        } catch (error) {
            console.error('Erro ao remover favorito:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Meus Favoritos</h2>
            {favorites.length > 0 ? (
                <div className="row">
                    {favorites.map((favorite) => (
                        <div key={favorite.id} className="col-md-4">
                            <div className="card mb-3">
                                <img src={favorite.posterPath} className="card-img-top" alt={favorite.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{favorite.title}</h5>
                                    <p className="card-text">{favorite.releaseDate}</p>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => removeFavorite(favorite.id)}
                                    >
                                        Remover
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Você ainda não tem favoritos.</p>
            )}
        </div>
    );
};

export default FavoriteList;
