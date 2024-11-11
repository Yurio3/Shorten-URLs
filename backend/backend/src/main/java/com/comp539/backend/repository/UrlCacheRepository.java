package com.comp539.backend.repository;

import com.comp539.backend.model.UrlCache;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UrlCacheRepository extends CrudRepository<UrlCache, String> {

    

}
