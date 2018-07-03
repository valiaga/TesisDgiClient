import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IJurado, IResponse, Jurado } from './jurado';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { MESSAGES } from 'config/messages';
import { snackBarDuration } from 'config/general';
import { map } from 'rxjs/operators';

@Injectable()
export class JuradosService {
  private readonly url: string = 'proyecto/jurados/';

  constructor(private httpClient: HttpClient) { }

  public getList$(params?: any): Observable<IResponse> {
    return this.httpClient.get<IResponse>(this.url, { params: params });
  }

  public getById$(id: string): Observable<IJurado[]> {
    return this.httpClient.get<IJurado[]>(`${this.url}${id}/`);
  }

  public save$(data: any): Observable<IJurado[]> {
    return this.httpClient.post<IJurado[]>(this.url, data);
  }

  public update$(id: string, data: any): Observable<IJurado[]> {
    return this.httpClient.put<IJurado[]>(`${this.url}${id}/`, data);
  }

  public delete$(id: string): Observable<IJurado[]> {
    return this.httpClient.delete<IJurado[]>(`${this.url}${id}/`);
  }
}

@Injectable()
export class JuradosReactiveService {
  jurados: Observable<Jurado[]>;
  private _jurados: BehaviorSubject<Jurado[]>;
  private dataStore: {
    jurados: Jurado[]
  };
  constructor(private juradosService: JuradosService,
    private snackBar: MatSnackBar) {

    this.dataStore = { jurados: [] };
    this._jurados = <BehaviorSubject<Jurado[]>>new BehaviorSubject([]);
    this.jurados = this._jurados.asObservable();
  }

  public getList(params?: any) {
    return this.juradosService
      .getList$(params)
      .pipe(map(res => res.results))
      .subscribe(data => {
        this.snackBar.open(MESSAGES.jurado.getMany, MESSAGES.actions.get, snackBarDuration);
        this.dataStore.jurados = data;
        this._jurados.next(Object.assign({}, this.dataStore).jurados);
      }, error => console.log('Could not load jurados.')
      );
  }

  public save(jurado: any) {
    this.juradosService.save$(jurado)
      .subscribe((data: any) => {
        this.snackBar.open(MESSAGES.jurado.post, MESSAGES.actions.post, snackBarDuration);
        this.dataStore.jurados.push(data);
        this._jurados.next(Object.assign({}, this.dataStore).jurados);
      }, error => console.log('Could not create jurado.'));
  }


  public update(id: string, jurado: any) {
    this.juradosService.update$(id, jurado)
      .subscribe((data: any) => {
        this.snackBar.open(MESSAGES.jurado.put, MESSAGES.actions.put, snackBarDuration);
        this.dataStore.jurados.forEach((a, index) => {
          if (a.id === data.id) { this.dataStore.jurados[index] = data; }
        });

        this._jurados.next(Object.assign({}, this.dataStore).jurados);
      }, error => console.log('Could not update jurado.'));
  }

  public delete(id: string) {
    this.juradosService.delete$(id)
      .subscribe(response => {

        this.snackBar.open(MESSAGES.jurado.delete, MESSAGES.actions.delete, snackBarDuration);

        this.dataStore.jurados.forEach((a, index) => {
          if (a.id === id) { this.dataStore.jurados.splice(index, 1); }
        });
        this._jurados.next(Object.assign({}, this.dataStore).jurados);
      }, error => console.log('Could not delete jurado.'));
  }
}
