import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITesisProceso, TesisProceso } from './tesis-proceso';
import { MatSnackBar } from '@angular/material';
import { MESSAGES } from 'config/messages';
import { snackBarDuration } from 'config/general';
import { EntityDataService } from '../../../lib/entity-data/entity-data.service';
import { endPoints } from '../../../lib/entity-data/end-points';

@Injectable()
export class TesisProcesoService extends EntityDataService<ITesisProceso> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, endPoints.tesisProceso.tesisProcesos);
  }

  public addTesisProcesoAndProyecto$(data): Observable<any> {
    return this.httpClient.post<any>(this.endPoint, data);
  }
}


@Injectable()
export class TesisProcesoReactiveService {
  // private readonly url = 'tesis-proceso/tesis-procesos/';
  // private readonly urlProcesos = 'proceso/procesos/';

  public tesisProcesos: Observable<TesisProceso[]>;
  private _tesisProcesos: BehaviorSubject<Array<TesisProceso>>;
  private dataStore: { // Aquí es donde almacenaremos nuestros datos en la memoria
    tesisProcesos: TesisProceso[]
  };

  constructor(
    private tesisProcesoService: TesisProcesoService,
    // private httpClient: HttpClient,
    private snackBar: MatSnackBar) {

    this.dataStore = { tesisProcesos: [] };
    this._tesisProcesos = <BehaviorSubject<TesisProceso[]>>new BehaviorSubject([]);
    this.tesisProcesos = this._tesisProcesos.asObservable();
  }

  public getAll() {
    return this.
      tesisProcesoService.getAll$()
      .subscribe(data => {
        this.dataStore.tesisProcesos = data;
        this._tesisProcesos.next(Object.assign({}, this.dataStore).tesisProcesos);
      }, error => console.log('Could not load tesisProcesos.')
      );
  }

  // public getTesisProcesosByProcesoId(procesoId: string) {

  //   return this.http
  //     .get<ITesisProceso[]>(`${this.urlProcesos}${procesoId}/tesis-procesos/`)
  //     .subscribe(data => {

  //       this.dataStore.tesisProcesos = data;
  //       this._tesisProcesos.next(Object.assign({}, this.dataStore).tesisProcesos);
  //     }, error => console.log('Could not load tesisProcesos.')
  //     );
  // }

  public createTesisProcesoAndProyecto(data: any) {
    this.tesisProcesoService.addTesisProcesoAndProyecto$(data)
      .subscribe(res => {
        this.snackBar.open(MESSAGES.tesisProceso.post, MESSAGES.actions.post, snackBarDuration);
        this.dataStore.tesisProcesos.push(res);
        this._tesisProcesos.next(Object.assign({}, this.dataStore).tesisProcesos);
      }, error => console.log('Could not create tesisProcesos.'));
  }

  public update(tesisProceso: ITesisProceso) {
    this.tesisProcesoService.update$(tesisProceso.id, tesisProceso)
      .subscribe(data => {
        this.snackBar.open(MESSAGES.tesisProceso.put, MESSAGES.actions.put, snackBarDuration);
        this.dataStore.tesisProcesos.forEach((tp, index) => {
          if (tp.id === data.id) { this.dataStore.tesisProcesos[index] = data; }
        });

        this._tesisProcesos.next(Object.assign({}, this.dataStore).tesisProcesos);
      }, error => console.log('Could not update tesisProceso.'));
  }

  public delete(id: string) {
    this.tesisProcesoService.delete$(id)
      .subscribe(response => {
        this.snackBar.open(MESSAGES.tesisProceso.delete, MESSAGES.actions.delete, snackBarDuration);
        this.dataStore.tesisProcesos.forEach((tesisProceso, index) => {
          if (tesisProceso.id === id) { this.dataStore.tesisProcesos.splice(index, 1); }
        });
        this._tesisProcesos.next(Object.assign({}, this.dataStore).tesisProcesos);
      }, error => console.log('Could not delete tesisProcesos.'));
  }
}
