import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SettingsService {
    // private headers = new Headers({ 'Content-Type': 'application/json' });
    private _settings: Object;

    /**
     * Gets an object with the application settings.
     */
    public get settings(): Object {
        return this._settings;
    }

    constructor(private _http: HttpClient) {
        this.load()
            .subscribe(obj => {
                const settings = Object.assign(new Object(), obj);
                this._settings = settings;
            }, err => {
            });
    }

    /**
     * Resolves routes by ensuring that configuration is loaded.
     */
    public resolve(route: ActivatedRouteSnapshot) {
        return this.load()
            .subscribe(obj => {
                const settings = Object.assign(new Object(), obj);
                this._settings = settings;
            }, err => {
            });
    }

    private load(): Observable<ISetting> {
        return this._http.get<ISetting>('config/settings.json');
            // .pipe(
                // map((res: any) => res.json())
            // );
    }
}

interface ISetting {
    apiUrl: string;
    tokenUrl: string;
}
