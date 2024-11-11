package com.comp539.backend.service;

import com.comp539.backend.model.UrlCache;
import com.comp539.backend.model.UrlData;
import com.comp539.backend.model.Url;
import com.comp539.backend.repository.UrlRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UrlStorageService {

    private final UrlRepository urlDatabaseRepository;
    private final CacheService cacheService;

    public Url store(Url urlDatabase) {
        cacheService.store(new UrlCache(urlDatabase));
        return urlDatabaseRepository.save(urlDatabase);
    }

    public UrlData getByLongUrl(String longUrl) {
        UrlData data = cacheService.getByLongUrl(longUrl);
        return data != null ? data : urlDatabaseRepository.findByLongUrl(longUrl).orElse(null);
    }

    public UrlData get(String shortUrl) {
        UrlData data = cacheService.get(shortUrl);
        return data != null ? data : urlDatabaseRepository.findById(shortUrl).orElse(null);
    }

}
