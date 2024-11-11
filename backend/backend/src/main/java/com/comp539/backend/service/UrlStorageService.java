package com.comp539.backend.service;

import com.comp539.backend.model.UrlData;
import com.comp539.backend.model.UrlDatabase;
import com.comp539.backend.repository.UrlDatabaseRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UrlStorageService {

    private final UrlDatabaseRepository urlDatabaseRepository;
    private final CacheService cacheService;

    public UrlDatabase save(UrlDatabase urlDatabase) {
        return urlDatabaseRepository.save(urlDatabase);
    }

    public UrlData get(String shortUrl) {
        UrlData result = cacheService.get(shortUrl);
        if (result != null) {
            return result;
        }
        return urlDatabaseRepository.findById(shortUrl).orElse(null);
    }

}
