import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from './response';

// class ModelConfigPagination {
//     query: string;
//     page_size: number;
//     fields: string;
//     sort: string;
//     all: string;
//     page: number;
// }

// class ConfigPagination {
//     public config: ModelConfigPagination;
//     constructor() {
//         this.config.all = 'false';
//         this.config.page_size = 15;
//         this.config.query = '';
//         this.config.fields = '';
//         this.config.sort = '';
//         this.config.page = 1;
//     }
// }

export class EntityDataService<T> {

    constructor(
        protected httpClient: HttpClient,
        protected endPoint: string,
        // protected configPagination?: ConfigPagination,
    ) { }

    public getAll$(): Observable<T[]> {
        const params = { all: 'true' };
        return this.httpClient.get<T[]>(this.endPoint, { params: params });
    }

    public getWithQuery$(params: any): Observable<IResponse> {
        return this.httpClient.get<IResponse>(this.endPoint, { params: params });
    }

    public getById$(id: string): Observable<T> {
        return this.httpClient.get<T>(`${this.endPoint}${id}/`);
    }

    public add$(entity: T): Observable<T> {
        return this.httpClient.post<T>(this.endPoint, entity);
    }

    public update$(id: string, entity: T): Observable<T> {
        return this.httpClient.put<T>(`${this.endPoint}${id}/`, entity);
    }

    public delete$(id: string): Observable<any> {
        return this.httpClient.delete<any>(`${this.endPoint}${id}/`);
    }
}
