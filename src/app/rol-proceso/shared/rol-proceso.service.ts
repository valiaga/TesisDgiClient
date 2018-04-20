import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { RolProceso, IRolProceso, IResponse } from './rol-proceso.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatSnackBar } from '@angular/material';
import { MESSAGES } from '../../../config/messages';
import { snackBarDuration } from '../../../config/general';

@Injectable()
export class RolProcesoService {
  private readonly url = 'proceso/rol-procesos/';
  public searchText: string;

  rolProcesos: Observable<RolProceso[]>;
  private _rolProcesos: BehaviorSubject<RolProceso[]>;
  private dataStore: {
    rolProcesos: RolProceso[]
  };

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar) {

    // Config Rxjs.
    this.dataStore = { rolProcesos: [] };
    this._rolProcesos = <BehaviorSubject<RolProceso[]>>new BehaviorSubject([]);
    this.rolProcesos = this._rolProcesos.asObservable();
  }

  /**
   * Get the top 10 most recent rolProcesos
   */
  // public getRecentProcesos$(): Observable<IResponse>{
  // let apiUrl = this._settingsService.settings['apiUrl'];
  // let apiUrl = environment.apiUrl;
  // return this.http.get<IResponse>(`proceso/rolProcesos/`, { headers: this._userService.getHeaders()})
  // }

  public getAllRolProcesos$(params: any): Observable<IResponse> {
    return this.http.get<IResponse>(this.url, { params: params });
  }

  /**
   * Get the all rolProcesos
   */
  public getAllRolProcesos(params: any = { all: true }) {
    return this.getAllRolProcesos$(params)
      .map(response => response.results)
      .subscribe(data => {
        this.dataStore.rolProcesos = data;
        this._rolProcesos.next(Object.assign({}, this.dataStore).rolProcesos);
      }, error => console.log('Could not load rolProcesos.')
      );
  }

  public getRolProcesoById$(id: string): Observable<IRolProceso> {
    return this.http.get<IRolProceso>(`${this.url}${id}/`);
  }

  /**
   * Gets a rolProceso by Id
   * @param RolProcesoId
   */
  public getRolProcesoById(id: string) {
    this.getRolProcesoById$(id)
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
      }, error => console.log('Could not load rolProceso.'));
  }

  public createRolProceso$(rolProceso: any): Observable<IRolProceso> {
    return this.http.post<IRolProceso>(this.url, rolProceso);
  }

  public createRolProceso(rolProceso: any) {
    this.createRolProceso$(rolProceso)
      .subscribe(data => {

        this.snackBar.open(MESSAGES.rolProceso.post, MESSAGES.actions.post, snackBarDuration);

        this.dataStore.rolProcesos.push(data);
        this._rolProcesos.next(Object.assign({}, this.dataStore).rolProcesos);
      }, error => console.log('Could not create rolProceso.'));
  }

  public updateRolProceso$(id: string, rolProceso: any): Observable<IRolProceso> {
    return this.http.put<IRolProceso>(`${this.url}${id}/`, rolProceso);
  }


  public patchRolProceso$(id: string, data: any): Observable<IRolProceso> {
    return this.http.patch<IRolProceso>(`${this.url}${id}/`, data);
  }

  public patchRolProceso(id: string, data: any) {
    this.patchRolProceso$(id, data)
      .subscribe(response => {

        this.snackBar.open(MESSAGES.rolProceso.put, MESSAGES.actions.put, snackBarDuration);

        this.dataStore.rolProcesos.forEach((proc, index) => {
          if (proc.id === response.id) { this.dataStore.rolProcesos[index] = response; }
        });

        this._rolProcesos.next(Object.assign({}, this.dataStore).rolProcesos);
      }, error => console.log('Could not update rolProceso.'));
  }

  public updateRolProceso(rolProceso: RolProceso) {
    this.updateRolProceso$(rolProceso.id, rolProceso)
      .subscribe(data => {

        this.snackBar.open(MESSAGES.rolProceso.put, MESSAGES.actions.put, snackBarDuration);

        this.dataStore.rolProcesos.forEach((proc, index) => {
          if (proc.id === data.id) { this.dataStore.rolProcesos[index] = data; }
        });

        this._rolProcesos.next(Object.assign({}, this.dataStore).rolProcesos);
      }, error => console.log('Could not update rolProceso.'));
  }

  public deleteRolProceso(id: string) {

    this.http.delete<IRolProceso>(`${this.url}${id}/`)
      .subscribe(response => {

        this.snackBar.open(MESSAGES.rolProceso.delete, MESSAGES.actions.delete, snackBarDuration);

        this.dataStore.rolProcesos.forEach((rolProceso, index) => {
          if (rolProceso.id === id) { this.dataStore.rolProcesos.splice(index, 1); }
        });
        this._rolProcesos.next(Object.assign({}, this.dataStore).rolProcesos);
      }, error => console.log('Could not delete rolProceso.'));
  }

  private handleError(error: any, operation: string): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  /**
    getPaginationProcesos(){ }
    getAllProcesos() { }
    getProcesosByTipoId() { }
    getProcesosByTipoId() { }
    getRecentProcesos() { }
    getNewProceso() { }

    getProcesoById(id: string) { }
    getProcesoByName(id: string) { }
    getProcesoByState(id: string) { }
    searchProceso(term: string) { }
    createProceso(rolProceso: RolProceso) { }
    createProcesoAndProyecto(rolProceso: RolProceso, proyecto: Proyecto) { }
    updateProceso(rolProceso: RolProceso) { }
    deleteProceso(id: string) { }
   */
}
