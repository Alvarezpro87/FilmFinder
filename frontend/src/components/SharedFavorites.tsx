import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSharedMovies } from '../service/movieService';
import { Movie } from '../service/types';

const SharedFavorites: React.FC = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSharedMovies = async () => {
            try {
                const response = await getSharedMovies(uuid!);
                console.log('API Response:', response.data);

                // Verifica se a resposta é do tipo JSON
                if (response.headers['content-type'] !== 'application/json') {
                    throw new Error("Resposta inesperada do servidor");
                }

                // Verifica se a resposta é um array antes de atribuí-la ao estado
                if (Array.isArray(response.data)) {
                    setMovies(response.data);
                } else {
                    throw new Error("Resposta inesperada do servidor");
                }
            } catch (err) {
                console.error('Erro ao carregar a lista de filmes compartilhada:', err);
                setError('Erro ao carregar a lista de filmes compartilhada.');
            } finally {
                setLoading(false);
            }
        };

        fetchSharedMovies();
    }, [uuid]);

    if (loading) {
        return <p className="text-center">Carregando...</p>;
    }

    if (error) {
        return <p className="text-center text-danger">{error}</p>;
    }

    return (
        <div className="container">
            <h2 className="text-center my-4">Lista de Filmes Compartilhada</h2>
            <div className="row">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div key={movie.id} className="col-md-4 mb-3">
                            <div className="card h-100 text-white bg-dark">
                                <img src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} className="card-img-top" alt={movie.title} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{movie.title}</h5>
                                    <p className="card-text">Lançamento: {movie.releaseDate}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">Nenhum filme encontrado na lista compartilhada.</p>
                )}
            </div>
        </div>
    );
};

export default SharedFavorites;
