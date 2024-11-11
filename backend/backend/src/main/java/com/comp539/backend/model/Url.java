package com.comp539.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Url implements UrlData {

    @Id
    private String id;

    private String longUrl;
    private Date createdAt;
    private Date expireAt;
    private Integer clickCount;
    private String userAgent;
    private String ipAddress;
    private String geoLocation;


}
