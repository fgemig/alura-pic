import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Photo } from './photo';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  listFromUser(username: string): Observable<Photo[]> {
    return this.http
      .get<Photo[]>(`${environment.apiBaseUrl}/${username}/photos`);
  }

  listFromUserPaginated(username: string, page: number): Observable<Photo[]> {

    const params = new HttpParams()
      .append('page', page.toString());

    return this.http
      .get<Photo[]>(`${environment.apiBaseUrl}/${username}/photos`, { params });
  }
}
