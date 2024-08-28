package com.verzel.filmfinder.repository;

import com.verzel.filmfinder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
