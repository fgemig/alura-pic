import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ServerLog } from './server-log';

@Injectable({
  providedIn: 'root'
})
export class ServerLogService {

  constructor(private http: HttpClient) { }

  log(serverLog: ServerLog): Observable<any> {
    return this.http
      .post(`${environment.serverLogUrl}/infra/log`, serverLog);
  }
}
