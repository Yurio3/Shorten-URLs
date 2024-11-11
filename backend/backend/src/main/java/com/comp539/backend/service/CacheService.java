package com.comp539.backend.service;

import com.comp539.backend.model.UrlCache;
import com.comp539.backend.repository.UrlCacheRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CacheService {

    private final UrlCacheRepository urlCacheRepository;

    public UrlCache store(UrlCache urlRedis) {
        return urlCacheRepository.save(urlRedis);
    }

    public UrlCache get(String shortUrl) {
        return urlCacheRepository.findById(shortUrl).orElse(null);
    }

    public UrlCache getByLongUrl(String longUrl) {
        return urlCacheRepository.findByLongUrl(longUrl).orElse(null);
    }

}
