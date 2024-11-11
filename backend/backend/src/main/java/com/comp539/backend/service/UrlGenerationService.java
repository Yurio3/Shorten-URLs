package com.comp539.backend.service;

import com.comp539.backend.model.UrlData;
import com.comp539.backend.model.UrlDatabase;
import com.comp539.backend.model.UrlCache;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;

@Service
@AllArgsConstructor
public class UrlGenerationService {

    private final CacheService cacheService;
    private final UrlStorageService urlStorageService;

    public UrlData generateUrl(String longUrl, String userAgent, String ipAddress) {
        String shortUrl = RandomStringUtils.randomAlphanumeric(6).toUpperCase();

        while (urlStorageService.get(shortUrl) != null) {
            shortUrl = RandomStringUtils.randomAlphanumeric(6).toUpperCase();
        }

        String geoLocation = "US";
        Date createdAt = new Date();

        Calendar c = Calendar.getInstance();
        c.setTime(createdAt); // Using today's date
        c.add(Calendar.DATE, 5); // Adding 5 days

        Date expireAt = c.getTime();
        UrlCache urlRedis = new UrlCache(
            shortUrl,
            longUrl,
            createdAt,
            expireAt,
            1,
            userAgent,
            ipAddress,
            geoLocation
        );
        UrlDatabase urlDatabase = new UrlDatabase(
                shortUrl,
                longUrl,
                createdAt,
                expireAt,
                1,
                userAgent,
                ipAddress,
                geoLocation
        );

        cacheService.save(urlRedis);
        urlStorageService.save(urlDatabase);

        return urlDatabase;
    }

}
