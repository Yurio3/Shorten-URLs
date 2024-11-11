package com.comp539.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.redis.core.RedisHash;

import java.util.Date;


@RedisHash("url")
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class UrlCache implements UrlData {

    private String id;

    private String longUrl;
    private Date createdAt;
    private Date expireAt;
    private Integer clickCount;
    private String userAgent;
    private String ipAddress;
    private String geoLocation;


}
