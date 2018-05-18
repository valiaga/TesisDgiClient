import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Escuela, IEscuela, IResponse } from './escuela';
import { MatSnackBar } from '@angular/material';
import { MESSAGES } from '../../../config/messages';
import { snackBarDuration } from '../../../config/general';


@Injectable()
export class EscuelaService {
  private readonly url = 'academico/escuelas/';
  escuelas: Observable<Escuela[]>;
  private _escuelas: BehaviorSubject<Escuela[]>;
  private dataStore: {
    escuelas: Escuela[]
  };

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar) {
    this.dataStore = { escuelas: [] };
    this._escuelas = <BehaviorSubject<Escuela[]>>new BehaviorSubject([]);
    this.escuelas = this._escuelas.asObservable();
  }

  loadAll() {
    const params: any = { all: true };
    return this.http
      .get<IEscuela[]>(this.url, { params: params })
      .subscribe(data => {
        this.snackBar.open(MESSAGES.escuela.getMany, MESSAGES.actions.get, snackBarDuration);
        this.dataStore.escuelas = data;
        this._escuelas.next(Object.assign({}, this.dataStore).escuelas);
      }, error => console.log('Could not load escuelas.')
      );
  }

  load(id: number | string) {
    this.http.get<IEscuela>(`${this.url}${id}`)
      .subscribe(data => {
        let notFound = true;

        this.dataStore.escuelas.forEach((escuela, index) => {
          if (escuela.id === data.id) {
            this.dataStore.escuelas[index] = data;
            notFound = false;
          }
        });

        if (notFound) {
          this.dataStore.escuelas.push(data);
        }
        this.snackBar.open(MESSAGES.escuela.getOne, MESSAGES.actions.get, snackBarDuration);

        this._escuelas.next(Object.assign({}, this.dataStore).escuelas);
      }, error => console.log('Could not load escuela.'));
  }

  create(escuela: any) {
    this.http.post<IEscuela>(this.url, escuela)
      .subscribe(data => {
        this.snackBar.open(MESSAGES.escuela.post, MESSAGES.actions.post, snackBarDuration);
        this.dataStore.escuelas.push(data);
        this._escuelas.next(Object.assign({}, this.dataStore).escuelas);
      }, error => console.log('Could not create escuela.'));
  }

  update(escuela: Escuela) {
    this.http.put<IEscuela>(`${this.url}${escuela.id}`, escuela)
      .subscribe(data => {
        this.snackBar.open(MESSAGES.escuela.put, MESSAGES.actions.put, snackBarDuration);
        this.dataStore.escuelas.forEach((e, index) => {
          if (e.id === data.id) { this.dataStore.escuelas[index] = data; }
        });

        this._escuelas.next(Object.assign({}, this.dataStore).escuelas);
      }, error => console.log('Could not update escuela.'));
  }

  remove(id: string) {
    this.http.delete<IEscuela>(`${this.url}${id}/`)
      .subscribe(response => {

        this.snackBar.open(MESSAGES.escuela.delete, MESSAGES.actions.delete, snackBarDuration);

        this.dataStore.escuelas.forEach((escuela, index) => {
          if (escuela.id === id) { this.dataStore.escuelas.splice(index, 1); }
        });
        this._escuelas.next(Object.assign({}, this.dataStore).escuelas);
      }, error => console.log('Could not delete escuela.'));
  }


  public getNuevaEscuela(): Escuela {
    return new Escuela('', '', false, '', '', '', '');
  }

  // NORMAL
  public getEscuelas$(sort: string, order: string, page: number,
    pageSize: number): Observable<IResponse> {
    return this.http.get<IResponse>(this.url);
  }

  /**
   * Importante para un combo en lineas de investigación.
   */
  public getAllEscuelas$(): Observable<IEscuela[]> {
    const params: any = { all: true };
    return this.http.get<IEscuela[]>(this.url, { params: params });
  }

}
