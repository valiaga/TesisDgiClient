import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class UserStoreService {

    constructor(
        private router: Router,
    ) { }

    get profile() {
        return localStorage.getItem('user');
    }

    get token() {
        return localStorage.getItem('token');
    }

    get isLogged() {
        console.log('this.token : ', this.token);

        return !!this.token;
    }

    set token(token: string) {
        localStorage.setItem('token', token);
    }

    set profile(user: string) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    public clearLocalStorage() {
        localStorage.clear();
    }

    public logout() {
        this.clearLocalStorage();
        this.gotToLogin();
    }

    public gotToLogin() {
        this.router.navigateByUrl('auth/login');
    }
}
