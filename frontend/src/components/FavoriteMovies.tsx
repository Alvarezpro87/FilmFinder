import React, { useEffect, useState, useCallback } from 'react';
import { getFavoriteMovies, deleteMovie, generateShareableLink } from '../service/movieService';
import { Movie } from '../service/types';

const FavoriteMovies: React.FC = () => {
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<'success' | 'danger' | null>(null);

    const fetchFavorites = useCallback(async () => {
        try {
            const response = await getFavoriteMovies();
            setFavorites(response.data);
        } catch (error) {
            showMessage('Erro ao carregar filmes favoritos.', 'danger');
        }
    }, []);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    const handleDelete = async (id: number) => {
        try {
            await deleteMovie(id);
            setFavorites(favorites.filter(movie => movie.id !== id));
            showMessage('Filme removido dos favoritos!', 'success');
        } catch (error) {
            showMessage('Erro ao remover filme dos favoritos.', 'danger');
        }
    };

    const handleShare = async () => {
        try {
            const movieIds = favorites.map(movie => movie.id!);
            const response = await generateShareableLink(movieIds);
            const shareableLink = response.data;
            showMessage(`Compartilhe este link: ${shareableLink}`, 'success');
        } catch (error) {
            showMessage('Ocorreu um erro ao gerar o link de compartilhamento.', 'danger');
        }
    };

    const showMessage = (msg: string, type: 'success' | 'danger') => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => {
            setMessage(null);
            setMessageType(null);
        }, 5000); // A mensagem desaparecerá após 5 segundos
    };

    return (
        <div className="container">
            <h2 className="text-center my-4">Meus Filmes Favoritos</h2>

            {message && (
                <div className={`alert alert-${messageType} text-center`} role="alert" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {message}
                </div>
            )}

            <div className="text-center mb-4">
                <button onClick={handleShare} className="btn btn-success mt-auto" >Compartilhar Lista</button>
            </div>
            <div className="row">
                {favorites.map((movie: Movie) => (
                    <div key={movie.id} className="col-md-4 mb-3">
                        <div className="card h-100 text-white bg-dark">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} className="card-img-top" alt={movie.title} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{movie.title}</h5>
                                <p className="card-text">Lançamento: {movie.releaseDate}</p>
                                <div className="mt-auto">
                                    <button onClick={() => handleDelete(movie.id!)} className="btn btn-danger" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Remover dos Favoritos</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoriteMovies;
