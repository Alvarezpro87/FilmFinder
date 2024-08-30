package com.verzel.filmfinder.service;

import com.verzel.filmfinder.model.Favorite;
import com.verzel.filmfinder.model.User;
import com.verzel.filmfinder.repository.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    public Favorite addFavorite(User user, Long movieId, String title, String posterPath, String releaseDate) {
        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setMovieId(movieId);
        favorite.setTitle(title);
        favorite.setPosterPath(posterPath);
        favorite.setReleaseDate(releaseDate);
        return favoriteRepository.save(favorite);
    }

    public List<Favorite> getUserFavorites(User user) {
        return favoriteRepository.findByUser(user);
    }

    public void removeFavorite(Long id) {
        favoriteRepository.deleteById(id);
    }
}
