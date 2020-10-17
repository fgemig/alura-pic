import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Photo } from './photo';
import { PhotoComment } from './photo-comment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  listFromUser(username: string): Observable<Photo[]> {
    return this.http
      .get<Photo[]>(`${environment.apiBaseUrl}/${username}/photos`);
  }

  findById(id: number): Observable<Photo> {
    return this.http
      .get<Photo>(`${environment.apiBaseUrl}/photos/${id}`);
  }

  getComments(id: number): Observable<PhotoComment[]> {
    return this.http
      .get<PhotoComment[]>(`${environment.apiBaseUrl}/photos/${id}/comments`);
  }

  addComment(id: number, commentText: string): Observable<PhotoComment[]> {
    return this.http
      .post<PhotoComment[]>(`${environment.apiBaseUrl}/photos/${id}/comments`, { commentText });
  }

  removePhoto(id: number): Observable<any> {
    return this.http
      .delete(`${environment.apiBaseUrl}/photos/${id}`);
  }

  like(id: number): Observable<boolean> {
    return this.http
      .post(`${environment.apiBaseUrl}/photos/${id}/like`, {}, { observe: 'response' })
      .pipe(map(res => true))
      .pipe(catchError(err => {
        return err.status === 304 ? of(false) : throwError(err);
      }));
  }

  listFromUserPaginated(username: string, page: number): Observable<Photo[]> {

    const params = new HttpParams()
      .append('page', page.toString());

    return this.http
      .get<Photo[]>(`${environment.apiBaseUrl}/${username}/photos`, { params });
  }

  upload(description: string, allowComments: boolean, file: File): Observable<any> {

    const formData = new FormData();

    formData.append('description', description);
    formData.append('allowComments', allowComments ? 'true' : 'false');
    formData.append('imageFile', file);

    return this.http
      .post(`${environment.apiBaseUrl}/photos/upload`, formData);
  }
}
