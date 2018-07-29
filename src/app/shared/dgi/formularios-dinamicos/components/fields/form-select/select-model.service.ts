import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { catchError } from 'rxjs/operators';

@Injectable()
export class SelectModelService {
    public url = 'proceso/models/';
    constructor(private httpClient: HttpClient) { }

    getValuesByModel(params: any): Observable<any[]> {
        return this.httpClient.get<any[]>(this.url, { params: params });
    }
}
