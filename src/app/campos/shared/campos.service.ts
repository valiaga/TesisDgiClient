import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ICampo } from '../models';

@Injectable()
export class CamposService {
    private readonly url = 'proceso/campos/';

    constructor(private httpClient: HttpClient) { }

    public save$(data: any): Observable<ICampo> {
        return this.httpClient.post<ICampo>(this.url, data);
    }

    public getById$(campoId: string, params?: any): Observable<ICampo> {
        return this.httpClient.get<ICampo>(`${this.url}/${campoId}`, { params: params });
    }

    public update$(id: string, data: any): Observable<ICampo> {
        return this.httpClient.put<ICampo>(`${this.url}${id}/`, data);
    }
}
