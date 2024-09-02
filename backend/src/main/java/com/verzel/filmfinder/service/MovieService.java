package com.verzel.filmfinder.service;

import com.verzel.filmfinder.model.Movie;
import com.verzel.filmfinder.model.SharedList;
import com.verzel.filmfinder.repository.MovieRepository;
import com.verzel.filmfinder.repository.SharedListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.transaction.Transactional;
import java.util.*;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private SharedListRepository sharedListRepository;

    @Autowired
    private RestTemplate restTemplate;

    private final String apiKey = System.getenv("TMDB_API_KEY");


    public List<Movie> searchMovies(String query) {
        String url = "https://api.themoviedb.org/3/search/movie";

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("api_key", apiKey)
                .queryParam("query", query)
                .queryParam("language", "pt-BR");

        Map<String, Object> response = restTemplate.getForObject(uriBuilder.toUriString(), Map.class);
        List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");

        List<Movie> movies = new ArrayList<>();
        for (Map<String, Object> result : results) {
            Movie movie = new Movie();
            movie.setTitle((String) result.get("title"));
            movie.setReleaseDate((String) result.get("release_date"));
            movie.setRating(((Number) result.get("vote_average")).doubleValue());
            movie.setPosterPath((String) result.get("poster_path"));
            movies.add(movie);
        }

        return movies;
    }

    public Movie saveMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public List<Movie> getFavoriteMovies() {
        return movieRepository.findAll();
    }

    public void deleteMovie(Long id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Filme não encontrado"));

        List<SharedList> sharedLists = sharedListRepository.findAll();
        for (SharedList sharedList : sharedLists) {
            if (sharedList.getMovies().contains(movie)) {
                sharedList.getMovies().remove(movie);
                sharedListRepository.save(sharedList);
            }
        }

        movieRepository.deleteById(id);
    }

    @Transactional
    public String generateShareableLink(List<Long> favoriteMovieIds) {
        // Busca os filmes favoritos pelos seus IDs
        List<Movie> favoriteMovies = movieRepository.findAllById(favoriteMovieIds);

        // Verifica se já existe uma lista compartilhada com esses filmes
        List<SharedList> existingLists = sharedListRepository.findAll();
        for (SharedList list : existingLists) {
            if (list.getMovies().containsAll(favoriteMovies) && favoriteMovies.containsAll(list.getMovies())) {
                return list.getUuid();
            }
        }

        // Caso não exista, gera um novo UUID e cria a lista
        String uuid = UUID.randomUUID().toString();
        SharedList sharedList = new SharedList(uuid, favoriteMovies);

        // Salva a lista compartilhada no banco de dados
        sharedList = sharedListRepository.save(sharedList);

        // Recarrega a lista recém-salva para garantir que a persistência foi completa
        Optional<SharedList> savedList = sharedListRepository.findById(sharedList.getUuid());

        if (savedList.isPresent()) {
            return savedList.get().getUuid();
        } else {
            throw new RuntimeException("Erro ao carregar a lista compartilhada após a criação");
        }
    }

    public List<Movie> getSharedMovies(String uuid) {
        Optional<SharedList> sharedList = sharedListRepository.findById(uuid);

        return sharedList.map(SharedList::getMovies).orElse(new ArrayList<>());
    }
}
