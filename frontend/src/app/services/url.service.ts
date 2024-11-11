import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlData } from '../model/url-data';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(
    private http: HttpClient,
  ) { }

  getUrl(shortUrl: string): Observable<UrlData> {
    return this.http.get<UrlData>(`http://localhost:8080/api/url/${shortUrl}`);
  }

  postUrl(longUrl: string): Observable<UrlData> {
    const data = { longUrl };
    return this.http.post<UrlData>(`http://localhost:8080/api/url`, data);
  }

}
