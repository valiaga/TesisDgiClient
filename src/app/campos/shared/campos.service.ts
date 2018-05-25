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

    public update$(id: string, data: any): Observable<ICampo> {

        return this.httpClient.put<ICampo>(`${this.url}${id}/`, data);
    }
}
