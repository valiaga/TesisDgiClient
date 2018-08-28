import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Proceso, IProceso } from '../models/proceso.model';
// import { PROCESOS } from './mock-procesos';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MESSAGES } from '../../../config/messages';
import { snackBarDuration } from '../../../config/general';
import { EntityDataService } from '../../lib/entity-data/entity-data.service';
import { endPoints } from '../../lib/entity-data/end-points';

@Injectable({
  providedIn: 'root',
})
export class ProcesosService extends EntityDataService<IProceso> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, endPoints.proceso.procesos);
  }

  public getTesisProcesos$(procesoId): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.endPoint}${procesoId}/tesis-procesos/`);
  }
}


@Injectable({
  providedIn: 'root',
})
export class ProcesosReactiveService {
  // private readonly url = 'proceso/procesos/';
  public searchText: string;

  procesos: Observable<Proceso[]>;
  private _procesos: BehaviorSubject<Proceso[]>;
  private dataStore: {
    procesos: Proceso[],
  };

  constructor(
    private procesosService: ProcesosService,
    // private http: HttpClient,
    private snackBar: MatSnackBar) {

    // Config Rxjs.
    this.dataStore = { procesos: [] };
    this._procesos = <BehaviorSubject<Proceso[]>>new BehaviorSubject([]);
    this.procesos = this._procesos.asObservable();
  }

  /**
   * Get the all procesos
   */
  public getAll() {
    return this.procesosService.getAll$()
      .subscribe(data => {
        this.dataStore.procesos = data;
        this._procesos.next(Object.assign({}, this.dataStore).procesos);
      }, error => console.warn('Could not load procesos.'),
      );
  }

  // public getProcesoById$(id: string): Observable<IProceso> {
  //   return this.http.get<IProceso>(`${this.url}${id}/`);
  // }

  // public getProcesoById(id: string) {
  //   this.getProcesoById$(id)
  //     .subscribe(data => {
  //       let notFound = true;

  //       this.dataStore.procesos.forEach((proceso, index) => {
  //         if (proceso.id === data.id) {
  //           this.dataStore.procesos[index] = data;
  //           notFound = false;
  //         }
  //       });

  //       if (notFound) {
  //         this.dataStore.procesos.push(data);
  //       }

  //       this._procesos.next(Object.assign({}, this.dataStore).procesos);
  //     }, error => console.log('Could not load proceso.'));
  // }


  public add(proceso: any) {
    this.procesosService.add$(proceso)
      .subscribe(data => {
        this.snackBar.open(MESSAGES.proceso.post, MESSAGES.actions.post, snackBarDuration);
        this.dataStore.procesos.push(data);
        this._procesos.next(Object.assign({}, this.dataStore).procesos);
      }, error => console.warn('Could not create proceso.'));
  }

  public update(proceso: IProceso) {
    this.procesosService.update$(proceso.id, proceso)
      .subscribe(data => {

        this.snackBar.open(MESSAGES.proceso.put, MESSAGES.actions.put, snackBarDuration);

        this.dataStore.procesos.forEach((proc, index) => {
          if (proc.id === data.id) { this.dataStore.procesos[index] = data; }
        });

        this._procesos.next(Object.assign({}, this.dataStore).procesos);
      }, error => console.warn('Could not update proceso.'));
  }

  public delete(id: string) {
    this.procesosService.delete$(id)
      // this.http.delete<IProceso>(`${this.url}${id}/`)
      .subscribe(response => {
        this.snackBar.open(MESSAGES.proceso.delete, MESSAGES.actions.delete, snackBarDuration);
        this.dataStore.procesos.forEach((proceso, index) => {
          if (proceso.id === id) { this.dataStore.procesos.splice(index, 1); }
        });
        this._procesos.next(Object.assign({}, this.dataStore).procesos);
      }, error => console.warn('Could not delete proceso.'));
  }

}
