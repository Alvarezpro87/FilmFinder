import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Favorite {
    id: number;
    movieId: number;
    title: string;
    posterPath: string;
    releaseDate: string;
}

const SharedFavoriteList: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const [favorites, setFavorites] = useState<Favorite[]>([]);

    useEffect(() => {
        const fetchSharedFavorites = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/favorites/shared/${token}`);
                setFavorites(response.data);
            } catch (error) {
                console.error('Erro ao buscar lista compartilhada:', error);
            }
        };

        fetchSharedFavorites();
    }, [token]);

    return (
        <div>
            <h2>Shared Favorites</h2>
            {favorites.length > 0 ? (
                <ul className="list-group">
                    {favorites.map((favorite) => (
                        <li key={favorite.id} className="list-group-item">
                            {favorite.title} ({favorite.releaseDate})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No favorites found.</p>
            )}
        </div>
    );
};

export default SharedFavoriteList;
