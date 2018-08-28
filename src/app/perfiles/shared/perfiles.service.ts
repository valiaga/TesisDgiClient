import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IResponse, IPerfil } from './perfil';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PerfilesService {

  private readonly url: string = 'config/perfiles/';

  constructor(private httpClient: HttpClient) { }

  public getList$(params?: any): Observable<IResponse> {
    return this.httpClient.get<IResponse>(this.url, { params: params });
  }

  public getById$(id: string): Observable<IPerfil[]> {
    return this.httpClient.get<IPerfil[]>(`${this.url}${id}/`);
  }

  public save$(data: any): Observable<IPerfil[]> {
    return this.httpClient.post<IPerfil[]>(this.url, data);
  }

  public update$(id: string, data: any): Observable<IPerfil[]> {
    return this.httpClient.put<IPerfil[]>(`${this.url}${id}/`, data);
  }

  public delete$(id: string): Observable<IPerfil[]> {
    return this.httpClient.delete<IPerfil[]>(`${this.url}${id}/`);
  }
}
