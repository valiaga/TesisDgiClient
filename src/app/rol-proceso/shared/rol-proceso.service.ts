import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { RolProceso, IRolProceso } from './rol-proceso.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MESSAGES } from '../../../config/messages';
import { snackBarDuration } from '../../../config/general';
// import { map } from 'rxjs/operators';
import { endPoints } from '../../lib/entity-data/end-points';
import { EntityDataService } from '../../lib/entity-data/entity-data.service';


@Injectable({
  providedIn: 'root',
})
export class RolProcesoService extends EntityDataService<IRolProceso> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, endPoints.proceso.rolProcesos);
  }
  public patch$(id: string, data: any): Observable<IRolProceso> {
    return this.httpClient.patch<IRolProceso>(`${this.endPoint}${id}/`, data);
  }
}

@Injectable()
export class RolProcesoReactiveService {
  // private readonly url = 'proceso/rol-procesos/';
  public searchText: string;

  rolProcesos: Observable<RolProceso[]>;
  private _rolProcesos: BehaviorSubject<RolProceso[]>;
  private dataStore: {
    rolProcesos: RolProceso[],
  };

  constructor(
    // private http: HttpClient,
    private rolProcesoService: RolProcesoService,
    private snackBar: MatSnackBar) {

    // Config Rxjs.
    this.dataStore = { rolProcesos: [] };
    this._rolProcesos = <BehaviorSubject<RolProceso[]>>new BehaviorSubject([]);
    this.rolProcesos = this._rolProcesos.asObservable();
  }

  public getAll() {
    return this.rolProcesoService.getAll$()
      .subscribe(data => {
        this.dataStore.rolProcesos = data;
        this._rolProcesos.next(Object.assign({}, this.dataStore).rolProcesos);
      }, error => console.warn('Could not load rolProcesos.'),
      );
  }

  public getWithQuery(params: any) {
    return this.rolProcesoService.getWithQuery$(params)
      .subscribe(data => {
        this.dataStore.rolProcesos = data.results;
        this._rolProcesos.next(Object.assign({}, this.dataStore).rolProcesos);
      }, error => console.warn('Could not load rolProcesos.'),
      );
  }

  public getById(id: string) {
    this.rolProcesoService.getById$(id)
      .subscribe(data => {
        let notFound = true;

        this.dataStore.rolProcesos.forEach((rolProceso, index) => {
          if (rolProceso.id === data.id) {
            this.dataStore.rolProcesos[index] = data;
            notFound = false;
          }
        });

        if (notFound) {
          this.dataStore.rolProcesos.push(data);
        }

        this._rolProcesos.next(Object.assign({}, this.dataStore).rolProcesos);
      }, error => console.warn('Could not load rolProceso.'));
  }

  public add(rolProceso: any) {
    this.rolProcesoService.add$(rolProceso)
      .subscribe(data => {
        this.snackBar.open(MESSAGES.rolProceso.post, MESSAGES.actions.post, snackBarDuration);
        this.dataStore.rolProcesos.push(data);
        this._rolProcesos.next(Object.assign({}, this.dataStore).rolProcesos);
      }, error => console.warn('Could not create rolProceso.'));
  }

  public patch(id: string, data: any) {
    this.rolProcesoService.patch$(id, data)
      .subscribe(response => {
        this.snackBar.open(MESSAGES.rolProceso.put, MESSAGES.actions.put, snackBarDuration);
        this.dataStore.rolProcesos.forEach((proc, index) => {
          if (proc.id === response.id) { this.dataStore.rolProcesos[index] = response; }
        });
        this._rolProcesos.next(Object.assign({}, this.dataStore).rolProcesos);
      }, error => console.warn('Could not update rolProceso.'));
  }

  public update(rolProceso: IRolProceso) {
    this.rolProcesoService.update$(rolProceso.id, rolProceso)
      .subscribe(data => {
        this.snackBar.open(MESSAGES.rolProceso.put, MESSAGES.actions.put, snackBarDuration);
        this.dataStore.rolProcesos.forEach((proc, index) => {
          if (proc.id === data.id) { this.dataStore.rolProcesos[index] = data; }
        });
        this._rolProcesos.next(Object.assign({}, this.dataStore).rolProcesos);
      }, error => console.warn('Could not update rolProceso.'));
  }

  public delete(id: string) {
    this.rolProcesoService.delete$(id)
      .subscribe(response => {
        this.snackBar.open(MESSAGES.rolProceso.delete, MESSAGES.actions.delete, snackBarDuration);
        this.dataStore.rolProcesos.forEach((rolProceso, index) => {
          if (rolProceso.id === id) { this.dataStore.rolProcesos.splice(index, 1); }
        });
        this._rolProcesos.next(Object.assign({}, this.dataStore).rolProcesos);
      }, error => console.warn('Could not delete rolProceso.'));
  }

}
