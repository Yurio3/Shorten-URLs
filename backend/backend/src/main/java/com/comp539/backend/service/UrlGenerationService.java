package com.comp539.backend.service;

import com.comp539.backend.model.UrlCache;
import com.comp539.backend.model.UrlData;
import com.comp539.backend.model.Url;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;

@Service
@AllArgsConstructor
public class UrlGenerationService {



    private final UrlStorageService urlStorageService;

    public UrlData generateUrl(String longUrl, String userAgent, String ipAddress) {
        UrlData data = urlStorageService.getByLongUrl(longUrl);
        if (data != null) {
            return data;
        }

        String shortUrl = RandomStringUtils.randomAlphanumeric(6).toUpperCase();

        while (urlStorageService.get(shortUrl) != null) {
            shortUrl = RandomStringUtils.randomAlphanumeric(6).toUpperCase();
        }

        String geoLocation = "US";
        Date createdAt = new Date();

        Calendar c = Calendar.getInstance();
        c.setTime(createdAt);
        c.add(Calendar.DATE, 5); // Adding 5 days

        Date expireAt = c.getTime();

        Url urlDatabase = new Url(
            shortUrl,
            longUrl,
            createdAt,
            expireAt,
            1,
            userAgent,
            ipAddress,
            geoLocation
        );

        return urlStorageService.store(urlDatabase);

    }

}
