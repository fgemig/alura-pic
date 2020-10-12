import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { UserService } from './../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private userService: UserService) { }

  authenticate(userName: string, password: string): Observable<any> {

    return this.http
      .post(`${environment.apiBaseUrl}/user/login`, { userName, password }, { observe: 'response' })
      .pipe(
        tap(res => {
          const authToken = res.headers.get('x-access-token');
          this.userService.setToken(authToken);
        })
      );
  }
}
