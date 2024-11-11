package com.comp539.backend.model;

import java.util.Date;

public interface UrlData {


    public String getId();
    public String getLongUrl();
    public Date getCreatedAt();
    public Date getExpireAt();
    public Integer getClickCount();
    public String getUserAgent();
    public String getIpAddress();
    public String getGeoLocation();

    public void setClickCount(Integer clickCount);

}
