package com.verzel.filmfinder.repository;

import com.verzel.filmfinder.model.FavoriteList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteListRepository extends JpaRepository<FavoriteList, Long> {

}
