import React, { useState, useEffect, useCallback } from 'react';
import { searchMovies, saveMovie } from '../service/movieService';
import { Movie } from '../service/types';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchMovies: React.FC = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [notification, setNotification] = useState<string | null>(null);

    const handleSearch = useCallback(async (searchQuery: string = '') => {
        const response = await searchMovies(searchQuery);
        setMovies(response.data);
    }, []);

    useEffect(() => {
        handleSearch('a');  // Carrega todos os filmes ao carregar a página com uma busca genérica
    }, [handleSearch]);

    useEffect(() => {
        if (query) {
            handleSearch(query);  // Filtra os filmes conforme o usuário digita
        }
    }, [query, handleSearch]);

    const handleSave = async (movie: Movie) => {
        await saveMovie(movie);
        setNotification(`Filme "${movie.title}" salvo como favorito!`);

        // Remove a notificação após 3 segundos
        setTimeout(() => {
            setNotification(null);
        }, 5000);
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating / 2);
        const halfStar = rating % 2 >= 1;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
        }

        if (halfStar) {
            stars.push(<i key="half" className="bi bi-star-half text-warning"></i>);
        }

        return stars;
    };

    return (
        <div className="container">
            {notification && (
                <div className="alert alert-success text-center" role="alert">
                    {notification}
                </div>
            )}
            <div className="mb-3 text-center">
                <input 
                    type="text" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    placeholder="Digite o nome do filme..." 
                    className="form-control bg-dark text-white" 
                />
                <div className="d-flex justify-content-center" style={{ marginTop: '1rem' }}>
                    <button onClick={() => handleSearch(query)} className="btn btn-success mt-auto" style={{ fontSize: '1.2rem' }}>Buscar Filmes</button>
                </div>
            </div>
    
            <div className="row">
                {movies.map((movie: Movie) => (
                    <div key={movie.id} className="col-md-4 mb-3">
                        <div className="card h-100 text-white bg-dark">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} className="card-img-top" alt={movie.title} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{movie.title}</h5>
                                <p className="card-text mb-1">Lançamento: {movie.releaseDate}</p>
                                <div className="mb-2">
                                    {renderStars(movie.rating)}
                                    <span className="ms-2"> ({movie.rating})</span>
                                </div>
                                <button onClick={() => handleSave(movie)} className="btn btn-success mt-auto">Salvar nos Favoritos</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchMovies;
