import React, { useState } from 'react';
import axios from 'axios';

// Definindo o tipo para os dados do filme
interface Movie {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    vote_count: number;
}

const MovieSearch: React.FC = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<Movie[]>([]);

    const searchMovies = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.get<{ results: Movie[] }>(`http://localhost:8080/api/movies/search?query=${query}`);
            setMovies(response.data.results);
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
        }
    };

    return (
        <div className="container mt-5" >
            <h2 className="text-center">Buscar Filmes</h2>
            <form onSubmit={searchMovies} className="mb-4">
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control bg-dark text-white"
                        placeholder="Digite o nome do filme"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-warning" style={{ fontSize: '1.2rem' }}>Buscar</button>
                </div>
            </form>

            {movies.length > 0 && (
                <div className="mt-5">
                    <h3 className="text-center">Resultados da Pesquisa</h3>
                    <div className="row">
                        {movies.map((movie) => (
                            <div key={movie.id} className="col-md-4">
                                <div className="card mb-3 bg-dark text-white">
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt={movie.title} />
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.title}</h5>
                                        <p className="card-text">{movie.release_date}</p>
                                        <p className="card-text">
                                            <strong>Avaliação:</strong> {movie.vote_average} / 10
                                            <br />
                                            <strong>Número de votos:</strong> {movie.vote_count}
                                        </p>
                                        <button className="btn btn-success">Adicionar aos Favoritos</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieSearch;
