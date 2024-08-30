package com.verzel.filmfinder.controller;

import com.verzel.filmfinder.model.Favorite;
import com.verzel.filmfinder.model.User;
import com.verzel.filmfinder.service.FavoriteService;
import com.verzel.filmfinder.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @Autowired
    private UserService userService;

    @PostMapping
    public Favorite addFavorite(@RequestParam String username, @RequestBody Favorite favorite) {
        User user = userService.findByUsername(username);
        return favoriteService.addFavorite(user, favorite.getMovieId(), favorite.getTitle(),
                favorite.getPosterPath(), favorite.getReleaseDate());
    }

    @GetMapping
    public List<Favorite> getUserFavorites(@RequestParam String username) {
        User user = userService.findByUsername(username);
        return favoriteService.getUserFavorites(user);
    }
}
