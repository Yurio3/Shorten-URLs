package com.comp539.backend.repository;

import com.comp539.backend.model.UrlDatabase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UrlDatabaseRepository extends JpaRepository<UrlDatabase, String> {
}
