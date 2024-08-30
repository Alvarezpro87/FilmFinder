package com.verzel.filmfinder.controller;

import com.verzel.filmfinder.service.TmdbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private TmdbService tmdbService;

    @GetMapping("/search")
    public String searchMovies(@RequestParam String query) {
        return tmdbService.searchMovies(query);
    }
}
