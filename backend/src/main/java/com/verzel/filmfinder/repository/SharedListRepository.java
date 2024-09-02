package com.verzel.filmfinder.repository;

import com.verzel.filmfinder.model.SharedList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SharedListRepository extends JpaRepository<SharedList, String> {
}
