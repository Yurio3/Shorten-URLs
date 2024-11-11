export interface UrlData {
    shortUrl: string;
    longUrl: string;
    createdAt: Date;
    expireAt: Date;
    clickCount: number;
    userAgent: string;
    ipAddress: string;
    geoLocation: string;
}