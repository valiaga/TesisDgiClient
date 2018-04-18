import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { IUser } from './user';

@Injectable()
export class UsersService {
    private readonly url: string = 'config/users/';
    constructor(private httpClient: HttpClient) { }

    public getAllUsers(params?: any) {
        return this.httpClient.get<IUser>(this.url, { params: params });
    }
}
