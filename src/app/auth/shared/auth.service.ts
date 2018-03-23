import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

interface IResponse {
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  // private readonly url = 'rest-auth';
  private readonly url = 'http://localhost:8000/rest-auth';

  constructor(private httpClient: HttpClient) { }

  public login(data: any): Observable<IResponse> {
    return this.httpClient.post<IResponse>(`${this.url}/login/`, data);
  }
}
