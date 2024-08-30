package com.verzel.filmfinder.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TmdbService {

    @Value("${tmdb.api.key}")
    private String apiKey;

    private final String apiUrl = "https://api.themoviedb.org/3/search/movie";

    public String searchMovies(String query) {
        RestTemplate restTemplate = new RestTemplate();
        String url = String.format("%s?api_key=%s&query=%s", apiUrl, apiKey, query);
        return restTemplate.getForObject(url, String.class);
    }
}
