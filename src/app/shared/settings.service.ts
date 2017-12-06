import { Injectable, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SettingsService implements Resolve<any> {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private _settings: Object;    

    /**
     * Gets an object with the application settings.
     */
    public get settings(): Object {        
        return this._settings;
    }

    constructor(private _http: Http) {
        
        this.load()
        .subscribe(obj => {
                console.log('obj');
                // console.log(obj);
                let settings = Object.assign(new Object(), obj);
                this._settings = settings;
            }, err => {
                console.log('EROR: ', err);
            });
            
        console.log('this.load()');
        console.log(this.load());
    }

    /**
     * Resolves routes by ensuring that configuration is loaded.
     */
    // public resolve(route: ActivatedRouteSnapshot): Observable<any> {
    public resolve(route: ActivatedRouteSnapshot) {
        return this.load()
            .subscribe(obj => {
                console.log('obj');
                console.log(obj);
                let settings = Object.assign(new Object(), obj);
                this._settings = settings;
            }, err => {
                console.log('EROR: ', err);
            });
    }

    private load(): Observable<any>  {
        // if (this._settings != null) {
        //     return Observable.of(this._settings);
        // }
        return this._http.get('config/settings.json')
            .map((res:any) => res.json())
            // .catch((err:any) => console.log(err));
    }
}