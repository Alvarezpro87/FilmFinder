package com.verzel.filmfinder.repository;

import com.verzel.filmfinder.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {

}
