package com.verzel.filmfinder.controller;

import com.verzel.filmfinder.model.Movie;
import com.verzel.filmfinder.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {
    @Value("${FRONTEND_URL}")
    private String frontendUrl;

    @Autowired
    private MovieService movieService;

    @GetMapping("/search")
    public List<Movie> searchMovies(@RequestParam String query) {
        return movieService.searchMovies(query);
    }

    @PostMapping("/favorites")
    public Movie saveMovie(@RequestBody Movie movie) {
        return movieService.saveMovie(movie);
    }

    @GetMapping("/favorites")
    public List<Movie> getFavoriteMovies() {
        return movieService.getFavoriteMovies();
    }

    @DeleteMapping("/favorites/{id}")
    public void deleteMovie(@PathVariable Long id) {
        movieService.deleteMovie(id);
    }

    @PostMapping("/share")
    public String generateShareableLink(@RequestBody List<Long> favoriteMovieIds) {
        String uuid = movieService.generateShareableLink(favoriteMovieIds);
        return frontendUrl + "/favorites/shared/" + uuid;
    }

    @GetMapping("/shared/{uuid}")
    public List<Movie> getSharedMovies(@PathVariable String uuid) {
        return movieService.getSharedMovies(uuid);
    }
}
