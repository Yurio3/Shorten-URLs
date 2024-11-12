import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { API_ENDPOINT } from '../utils/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  register(user: User) {
    return this.http.post<User>(`${API_ENDPOINT}/user/register`, user);
  }

  login(user: User) {
    return this.http.post<User>(`${API_ENDPOINT}/user/login`, user);
  }

}
