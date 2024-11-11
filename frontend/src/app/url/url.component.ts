import { Component } from '@angular/core';
import { UrlService } from '../services/url.service';
import { UrlData } from '../model/url-data';

@Component({
  selector: 'app-url',
  standalone: true,
  imports: [],
  templateUrl: './url.component.html',
  styleUrl: './url.component.scss'
})
export class UrlComponent {

  constructor(
    private urlService: UrlService,
  ) { }

  urlData: UrlData = {} as UrlData;

  getUrl(shortUrl: string) {
    this.urlService.getUrl(shortUrl).subscribe(res => this.urlData = res);
  }

  postUrl(longUrl: string) {
    this.urlService.postUrl(longUrl).subscribe(res => this.urlData = res);
  }

}
