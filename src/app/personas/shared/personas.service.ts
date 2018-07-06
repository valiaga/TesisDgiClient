import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse, IPersona } from './persona';

@Injectable(
  // {
  //   providedIn: 'root'
  // }
)
export class PersonasService {
  private readonly url: string = 'config/personas/';

  constructor(private httpClient: HttpClient) { }

  public getList$(params?: any): Observable<IPersona[]> {
    return this.httpClient.get<IPersona[]>(this.url, { params: params });
  }

  public getById$(id: string): Observable<IPersona[]> {
    return this.httpClient.get<IPersona[]>(`${this.url}${id}/`);
  }

  public add$(data: any): Observable<IPersona[]> {
    return this.httpClient.post<IPersona[]>(this.url, data);
  }

  public update$(id: string, data: any): Observable<IPersona[]> {
    return this.httpClient.put<IPersona[]>(`${this.url}${id}/`, data);
  }

  public delete$(id: string): Observable<IPersona[]> {
    return this.httpClient.delete<IPersona[]>(`${this.url}${id}/`);
  }
}
