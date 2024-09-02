import axios from 'axios';
import { Movie } from './types';

const api = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL
});

// Função para buscar filmes por consulta
export const searchMovies = (query: string) => {
    return api.get(`/search`, { params: { query } });
};

// Função para obter filmes favoritos
export const getFavoriteMovies = () => {
    return api.get('/favorites');
};

// Função para salvar um filme favorito
export const saveMovie = (movie: Movie) => {
    return api.post('/favorites', movie);
};

// Função para deletar um filme favorito
export const deleteMovie = (id: number) => {
    return api.delete(`/favorites/${id}`);
};

// Função para gerar um link de compartilhamento
export const generateShareableLink = (favoriteMovieIds: number[]) => {
    return api.post('/share', favoriteMovieIds);
};

// Função para obter uma lista compartilhada a partir de um UUID
export const getSharedMovies = (uuid: string) => {
    return api.get(`/shared/${uuid}`);
};
