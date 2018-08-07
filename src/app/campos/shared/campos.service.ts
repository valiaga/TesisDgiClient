import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICampo } from '../models';
import { Observable } from 'rxjs';
import { EntityDataService } from '../../lib/entity-data/entity-data.service';
import { endPoints } from '../../lib/entity-data/end-points';

@Injectable()
export class CamposService extends EntityDataService<ICampo> {
    // private readonly url = 'proceso/campos/';

    // constructor(private httpClient: HttpClient) { }
    // public save$(data: any): Observable<ICampo> {
    //     return this.httpClient.post<ICampo>(this.url, data);
    // }
    // public getById$(campoId: string, params?: any): Observable<ICampo> {
    //     return this.httpClient.get<ICampo>(`${this.url}${campoId}/`, { params: params });
    // }
    // public update$(id: string, data: any): Observable<ICampo> {
    //     return this.httpClient.put<ICampo>(`${this.url}${id}/`, data);
    // }
    // public delete$(id: string): Observable<ICampo> {
    //     return this.httpClient.delete<ICampo>(`${this.url}${id}/`);
    // }
    constructor(protected httpClient: HttpClient) {
        super(httpClient, endPoints.proceso.campos);
    }

    public addValidador$(entity: any): Observable<ICampo> {
        return this.httpClient.post<ICampo>(this.endPoint, entity);
    }

    public addGeneradorDocumentos$(entity: any): Observable<ICampo> {
        return this.httpClient.post<ICampo>(this.endPoint, entity);
    }

}
