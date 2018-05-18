import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { IGroup } from './group';
import { Observable } from 'rxjs';

@Injectable()
export class GroupsService {
    private readonly url: string = 'config/groups/';
    constructor(private httpClient: HttpClient) { }

    public getAllGroups$(params?: any): Observable<IGroup> {
        return this.httpClient.get<IGroup>(this.url, { params: params });
    }
}
