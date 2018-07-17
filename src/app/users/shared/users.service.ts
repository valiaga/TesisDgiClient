import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { catchError } from 'rxjs/operators';
import { IUser } from './user';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {
    private readonly url: string = 'config/users/';
    constructor(private httpClient: HttpClient) { }

    public getList$(params?: any): Observable<IUser> {
        return this.httpClient.get<IUser>(this.url, { params: params });
    }
}
