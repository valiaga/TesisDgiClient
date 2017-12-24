import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ITesisProceso, TesisProceso } from './tesis-proceso';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatSnackBar } from '@angular/material';
import { MESSAGES } from '../../../config/messages';
import { snackBarDuration } from '../../../config/general';


@Injectable()
export class TesisProcesoService {

  public tesisProcesos: Observable<TesisProceso[]>;
  private _tesisProcesos: BehaviorSubject<Array<TesisProceso>>;
  private dataStore: { // Aquí es donde almacenaremos nuestros datos en la memoria
    tesisProcesos: TesisProceso[]
  }

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar) {
      
      this.dataStore = { tesisProcesos: [] };
      this._tesisProcesos = <BehaviorSubject<TesisProceso[]>> new BehaviorSubject([]);
      this.tesisProcesos = this._tesisProcesos.asObservable();
  }
  

  public getAllTesisProcesos() {
    let apiUrl = environment.apiUrl;

    return this.http
      .get<ITesisProceso[]>(`${apiUrl}tesis-proceso/tesis-procesos/?all=true`)
      .subscribe(data => {
        
        this.dataStore.tesisProcesos = data;
        this._tesisProcesos.next(Object.assign({}, this.dataStore).tesisProcesos);
      }, error => console.log('Could not load tesisProcesos.')
      )
  }

  public getTesisProcesosByProcesoId(procesoId: string) {
    let apiUrl = environment.apiUrl;
    
    return this.http
      .get<ITesisProceso[]>(`${apiUrl}proceso/procesos/${procesoId}/tesis-procesos/`)
      .subscribe(data => {

        this.dataStore.tesisProcesos = data;
        this._tesisProcesos.next(Object.assign({}, this.dataStore).tesisProcesos);
      }, error => console.log('Could not load tesisProcesos.')
      )
  }

  public createTesisProcesoAndProyecto(data: any) {
    let apiUrl = environment.apiUrl;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');


    this.http.post<ITesisProceso>(`${apiUrl}proceso/procesos/${data.proceso}/tesis-procesos/`, data)
    .subscribe(data => {

      this.snackBar.open(MESSAGES.tesisProceso.post, MESSAGES.actions.post, snackBarDuration);

      this.dataStore.tesisProcesos.push(data);
      this._tesisProcesos.next(Object.assign({}, this.dataStore).tesisProcesos);
    }, error => console.log('Could not create tesisProcesos.'));
  }

  public updateTesisProceso(tesisProceso: TesisProceso) {
    let apiUrl = environment.apiUrl;
    this.http.put<ITesisProceso>(`${apiUrl}tesis-proceso/tesis-procesos/${tesisProceso.id}`, tesisProceso)
    .subscribe(data => {

      this.snackBar.open(MESSAGES.tesisProceso.put, MESSAGES.actions.put, snackBarDuration);

      this.dataStore.tesisProcesos.forEach((tesisProceso, index) => {
        if (tesisProceso.id === data.id) { this.dataStore.tesisProcesos[index] = data; }
      });
      
      this._tesisProcesos.next(Object.assign({}, this.dataStore).tesisProcesos);
    }, error => console.log('Could not update escuela.'));
  }

  public deleteTesisProceso(id: string) {
    let apiUrl = environment.apiUrl;
    
    this.http.delete<ITesisProceso>(`${apiUrl}tesis-proceso/tesis-procesos/${id}/`)
      .subscribe(response => {

        this.snackBar.open(MESSAGES.tesisProceso.delete, MESSAGES.actions.delete, snackBarDuration);
  
        this.dataStore.tesisProcesos.forEach((tesisProceso, index) => {
          if (tesisProceso.id === id) { this.dataStore.tesisProcesos.splice(index, 1); }
          });
        this._tesisProcesos.next(Object.assign({}, this.dataStore).tesisProcesos);
      }, error => console.log('Could not delete tesisProcesos.'));
  }

  private handleError(error: any, operation: string): Promise<any> {
    // this._mediator.broadcast(new Message(MessageType.BusyEnd));
    // this._mediator.broadcast(new Message(MessageType.ShowError, 'An error occurred while ' + operation));
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
