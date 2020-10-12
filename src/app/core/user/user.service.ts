import { Injectable } from '@angular/core';
import * as jtw_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

import { TokenService } from './../token/token.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(null);
  private userName = '';

  constructor(private tokenService: TokenService) {

    this.tokenService.hasToken()
      && this.decodeAndNotify();
  }

  setToken(token: string): void {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken();
    const user = jtw_decode(token) as User;
    this.userName = user.name;
    this.userSubject.next(user);
  }

  logout(): void {
    this.tokenService.removeToken();
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.tokenService.hasToken();
  }

  getUserName(): string {
    return this.userName;
  }
}
