import { NewUser } from './new-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/user/user';

import { environment } from './../../../environments/environment';

@Injectable()
export class SignUpService {

  constructor(private http: HttpClient) { }

  checkUserNameTaken(userName: string): Observable<User> {
    return this.http
      .get<User>(`${environment.apiBaseUrl}/user/exists/${userName}`);
  }

  signup(newUser: NewUser): Observable<NewUser> {
    return this.http
      .post<NewUser>(`${environment.apiBaseUrl}/user/signup`, newUser);
  }
}
