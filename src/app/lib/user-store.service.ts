import { Injectable } from '@angular/core';

@Injectable()
export class UserStoreService {

    constructor() { }

    get profile() {
        return localStorage.getItem('user');
    }

    get token() {
        return localStorage.getItem('token');
    }

    get isLogged() {
        return !!this.token;
    }

    set token(token: string) {
        localStorage.setItem('token', token);
    }

    set profile(user: string) {
        localStorage.setItem('user', user);
    }
}
