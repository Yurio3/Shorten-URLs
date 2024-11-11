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
        return urlDatabaseRepository.save(urlDatabase).block();
    }

    public UrlData getByLongUrl(String longUrl) {
        UrlData data = cacheService.getByLongUrl(longUrl);
        return data != null ? data : urlDatabaseRepository.findByLongUrl(longUrl).blockFirst();
    }

    public UrlData get(String shortUrl) {
        UrlData data = cacheService.get(shortUrl);
        data = data != null ? data : urlDatabaseRepository.findById(shortUrl).block();
        if (data == null) {
            return data;
        }
        data.setClickCount(data.getClickCount() + 1);
        store(data instanceof Url ? (Url) data : new Url((UrlCache) data));
        return data;
    }

}
