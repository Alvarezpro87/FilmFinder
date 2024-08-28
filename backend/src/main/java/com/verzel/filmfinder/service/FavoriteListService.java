package com.verzel.filmfinder.service;

import com.verzel.filmfinder.model.FavoriteList;
import com.verzel.filmfinder.repository.FavoriteListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavoriteListService {

    @Autowired
    private FavoriteListRepository favoriteListRepository;

    public List<FavoriteList> findAllFavorites() {
        return favoriteListRepository.findAll();
    }

    public Optional<FavoriteList> findFavoriteById(Long id) {
        return favoriteListRepository.findById(id);
    }

    public FavoriteList addMovieToFavorites(FavoriteList favoriteList) {
        return favoriteListRepository.save(favoriteList);
    }

    public void removeMovieFromFavorites(Long id) {
        favoriteListRepository.deleteById(id);
    }


}
