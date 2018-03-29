import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

interface IResponse {
  username: string;
  password: string;
}

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public login(data: any): Observable<IResponse> {
    return this.httpClient.post<IResponse>(`login/`, data);
  }

  public logout(): Observable<IResponse> {
    return this.httpClient.post<IResponse>(`logout/`, {});
  }
}
