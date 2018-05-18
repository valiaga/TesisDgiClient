import { Injectable } from '@angular/core';
import { Requisito, IRequisito } from './requisito';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';
import { MESSAGES } from '../../../config/messages';
import { snackBarDuration } from '../../../config/general';
import { map } from 'rxjs/operators';


@Injectable()
export class RequisitosService {
  private readonly url = 'proceso/requisitos/';

  constructor(private http: HttpClient) { }

  public getRequisitos$(params?: any): Observable<IRequisito[]> {
    return this.http
      .get<IRequisito[]>(this.url, { params: params });
  }

  public createRequisito$(etapa: any): Observable<IRequisito> {
    return this.http.post<IRequisito>(this.url, etapa);
  }

  public updateRequisito$(id: string, etapa: any): Observable<IRequisito> {
    return this.http.put<IRequisito>(`${this.url}${id}/`, etapa);
  }

  public delete$(id: string): Observable<IRequisito> {
    return this.http.delete<IRequisito>(`${this.url}${id}/`);
  }
}

@Injectable()
export class RequisitoReactiveService {

  public requisitos: Observable<Requisito[]>;
  private _requisitos: BehaviorSubject<Array<Requisito>>;
  private dataStore: { // Aquí es donde almacenaremos nuestros datos en la memoria
    requisitos: Requisito[]
  };
  constructor(
    private requisitosService: RequisitosService,
    private snackBar: MatSnackBar) {

    this.dataStore = { requisitos: [] };
    this._requisitos = <BehaviorSubject<Requisito[]>>new BehaviorSubject([]);
    this.requisitos = this._requisitos.asObservable();
  }


  public getRequisitos() {

    return this.requisitosService.getRequisitos$()
      // .pipe(map(res => res.results))
      .subscribe(data => {

        this.dataStore.requisitos = data;
        this._requisitos.next(Object.assign({}, this.dataStore).requisitos);
      }, error => console.log('Could not load requisitos.')
      );
  }

  public getRequisitosByTareaId(tareaId) {

    return this.requisitosService.getRequisitos$({ tarea_id: tareaId })
      .subscribe(data => {
        console.log(data);

        this.dataStore.requisitos = data;
        this._requisitos.next(Object.assign({}, this.dataStore).requisitos);
      }, error => console.log('Could not load requisitos.')
      );
  }

  public createRequisito(requisito: any) {
    this.requisitosService.createRequisito$(requisito)
      .subscribe(data => {

        this.snackBar.open(MESSAGES.requisito.post, MESSAGES.actions.post, snackBarDuration);

        this.dataStore.requisitos.push(data);
        this._requisitos.next(Object.assign({}, this.dataStore).requisitos);
      }, error => console.log('Could not create requisito.'));
  }


  public updateRequisito(id: string, requisito: any) {
    this.requisitosService.updateRequisito$(id, requisito)
      .subscribe(data => {
        this.snackBar.open(MESSAGES.requisito.put, MESSAGES.actions.put, snackBarDuration);
        this.dataStore.requisitos.forEach((e, index) => {
          if (e.id === data.id) { this.dataStore.requisitos[index] = data; }
        });
        this._requisitos.next(Object.assign({}, this.dataStore).requisitos);
      }, error => console.log('Could not update requisito.'));
  }

  remove(id: string) {
    this.requisitosService.delete$(id)
      .subscribe(response => {

        this.snackBar.open(MESSAGES.requisito.delete, MESSAGES.actions.delete, snackBarDuration);

        this.dataStore.requisitos.forEach((requisito, index) => {
          if (requisito.id === id) { this.dataStore.requisitos.splice(index, 1); }
        });
        this._requisitos.next(Object.assign({}, this.dataStore).requisitos);
      }, error => console.log('Could not delete requisito.'));
  }
}
