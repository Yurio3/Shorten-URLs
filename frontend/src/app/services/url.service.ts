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
    return this.http.post<UrlData>(`http://localhost:8080/api/url`, { longUrl });
  }

  getUrls() {
    return JSON.parse(localStorage.getItem("urls") as string) as UrlData[];
  }

  storeUrl(url: UrlData) {
    const temp = this.getUrls() || [];
    temp.push(url);
    
    localStorage.setItem("urls", JSON.stringify(temp));
  }

}
