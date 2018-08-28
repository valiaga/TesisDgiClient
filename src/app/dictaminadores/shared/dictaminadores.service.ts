import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IDictaminador, Dictaminador, IResponse } from './dictaminador';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';
import { MESSAGES } from 'config/messages';
import { snackBarDuration } from 'config/general';

@Injectable()
export class DictaminadoresService {
    private url = 'proyecto/dictaminadores/';

    constructor(private httpClient: HttpClient) { }

    public getList$(params?: any): Observable<IResponse> {
        return this.httpClient.get<IResponse>(this.url, { params: params });
    }

    public getById$(id: string): Observable<IDictaminador> {
        return this.httpClient.get<IDictaminador>(`${this.url}${id}/`);
    }

    public save$(data: any): Observable<IDictaminador[]> {
        return this.httpClient.post<IDictaminador[]>(this.url, data);
    }

    public update$(id: string, data: any): Observable<IDictaminador> {
        return this.httpClient.put<IDictaminador>(`${this.url}${id}/`, data);
    }

    public delete$(id: string): Observable<IDictaminador> {
        return this.httpClient.delete<IDictaminador>(`${this.url}${id}/`);
    }
}


@Injectable()
export class DictaminadoresReactiveService {
    dictaminadores: Observable<Dictaminador[]>;
    private _dictaminadores: BehaviorSubject<Dictaminador[]>;
    private dataStore: {
        dictaminadores: Dictaminador[],
    };
    constructor(private dictaminadoresService: DictaminadoresService,
        private snackBar: MatSnackBar) {

        this.dataStore = { dictaminadores: [] };
        this._dictaminadores = <BehaviorSubject<Dictaminador[]>>new BehaviorSubject([]);
        this.dictaminadores = this._dictaminadores.asObservable();
    }

    public getList(params?: any) {
        return this.dictaminadoresService
            .getList$(params)
            .pipe(map(res => res.results))
            .subscribe(data => {
                // console.log(data);

                this.snackBar.open(MESSAGES.dictaminador.getMany, MESSAGES.actions.get, snackBarDuration);
                this.dataStore.dictaminadores = data;
                this._dictaminadores.next(Object.assign({}, this.dataStore).dictaminadores);
            }, error => console.warn('Could not load dictaminadores.'),
            );
    }

    public save(dictaminador: any) {
        this.dictaminadoresService.save$(dictaminador)
            .subscribe((data: any) => {
                this.snackBar.open(MESSAGES.dictaminador.post, MESSAGES.actions.post, snackBarDuration);
                this.dataStore.dictaminadores.push(data);
                this._dictaminadores.next(Object.assign({}, this.dataStore).dictaminadores);
            }, error => console.warn('Could not create dictaminador.'));
    }


    public update(id: string, asesor: any) {
        this.dictaminadoresService.update$(id, asesor)
            .subscribe((data: any) => {
                this.snackBar.open(MESSAGES.dictaminador.put, MESSAGES.actions.put, snackBarDuration);
                this.dataStore.dictaminadores.forEach((a, index) => {
                    if (a.id === data.id) { this.dataStore.dictaminadores[index] = data; }
                });

                this._dictaminadores.next(Object.assign({}, this.dataStore).dictaminadores);
            }, error => console.warn('Could not update dictaminador.'));
    }

    public delete(id: string) {
        this.dictaminadoresService.delete$(id)
            .subscribe(response => {

                this.snackBar.open(MESSAGES.dictaminador.delete, MESSAGES.actions.delete, snackBarDuration);

                this.dataStore.dictaminadores.forEach((a, index) => {
                    if (a.id === id) { this.dataStore.dictaminadores.splice(index, 1); }
                });
                this._dictaminadores.next(Object.assign({}, this.dataStore).dictaminadores);
            }, error => console.warn('Could not delete dictaminador.'));
    }

}
