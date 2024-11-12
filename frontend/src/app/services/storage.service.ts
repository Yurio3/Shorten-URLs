import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  readonly USER_KEY = 'auth';

  getToken() {
    return localStorage.getItem(this.USER_KEY);
  }

  setToken(token: string) {
    localStorage.setItem(this.USER_KEY, token);
  }

  removeToken() {
    localStorage.removeItem(this.USER_KEY);
  }

}
