import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  register(user: User) {
    return this.http.post<User>(`http://localhost:8080/api/user/register`, user);
  }

  login(user: User) {
    return this.http.post<User>(`http://localhost:8080/api/user/login`, user);

  }

}
