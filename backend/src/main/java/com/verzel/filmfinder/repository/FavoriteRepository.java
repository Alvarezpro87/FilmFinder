package com.verzel.filmfinder.repository;

import com.verzel.filmfinder.model.Favorite;
import com.verzel.filmfinder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUser(User user);
}
