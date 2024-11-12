import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Url } from '../model/url';
import { API_ENDPOINT } from '../utils/api';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(
    private http: HttpClient,
  ) { }

  getUrl(shortUrl: string): Observable<Url> {
    return this.http.get<Url>(`${API_ENDPOINT}/url/${shortUrl}`);
  }

  postUrl(longUrl: string): Observable<Url> {
    return this.http.post<Url>(`${API_ENDPOINT}/url`, { longUrl });
  }

}
