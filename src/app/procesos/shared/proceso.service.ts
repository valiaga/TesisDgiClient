import { environment } from '../../../environments/environment';
import { UserService } from '../../auth/user/user.service';
// import { SettingsService } from '../../shared/settings.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Proceso, IProceso, IResponse } from './proceso.model';
import { PROCESOS } from './mock-procesos';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatSnackBar } from '@angular/material';
import { MESSAGES } from '../../../config/messages';
import { snackBarDuration } from '../../../config/general';

@Injectable()
export class ProcesoService {
  public searchText: string;

  procesos: Observable<Proceso[]>;
  private _procesos: BehaviorSubject<Proceso[]>;
  private dataStore: {
    procesos: Proceso[]
  }

  constructor(
    private http: HttpClient,
    private _userService: UserService,
    private snackBar: MatSnackBar) {
      
      // Config Rxjs.
      this.dataStore = { procesos: []}
      this._procesos = <BehaviorSubject<Proceso[]>> new BehaviorSubject([]);
      this.procesos = this._procesos.asObservable();
    }
              
  /**
   * Get the top 10 most recent procesos
   */
  // public getRecentProcesos$(): Observable<IResponse>{
    // let apiUrl = this._settingsService.settings['apiUrl'];
    // let apiUrl = environment.apiUrl;
    // return this.http.get<IResponse>(`${apiUrl}proceso/procesos/`, { headers: this._userService.getHeaders()})
  // }

  /**
   * Get the all procesos
   */
  public getAllProcesos() {
    let apiUrl = environment.apiUrl;
    
    return this.http
      .get<IProceso[]>(`${apiUrl}proceso/procesos/?all=true`)
      .subscribe(data => {

        this.dataStore.procesos = data;
        this._procesos.next(Object.assign({}, this.dataStore).procesos);
      }, error => console.log('Could not load procesos.')
      )
  }

  /**
   * Gets a proceso by Id
   * @param procesoId 
   */
  public getProcesoById(id: string) {
    let apiUrl = environment.apiUrl;
    this.http.get<IProceso>(`${apiUrl}proceso/procesos/${id}/`)
      .subscribe(data => {
        let notFound = true;

        this.dataStore.procesos.forEach((proceso, index) => {
          if (proceso.id === data.id) {
            this.dataStore.procesos[index] = data;
            notFound = false;
          }
        });

        if (notFound) {
          this.dataStore.procesos.push(data);
        }

        this._procesos.next(Object.assign({}, this.dataStore).procesos);
      }, error => console.log('Could not load proceso.'));
  }

  public createProceso(proceso: any) {
    let apiUrl = environment.apiUrl;
    this.http.post<IProceso>(`${apiUrl}proceso/procesos/`, proceso)
      .subscribe(data => {

        this.snackBar.open(MESSAGES.proceso.post, MESSAGES.actions.post, snackBarDuration);

        this.dataStore.procesos.push(data);
        this._procesos.next(Object.assign({}, this.dataStore).procesos);
      }, error => console.log('Could not create proceso.'));
  }


  public updateProceso(proceso: Proceso) {
    let apiUrl = environment.apiUrl;
    this.http.put<IProceso>(`${apiUrl}proceso/procesos/${proceso.id}`, proceso)
    .subscribe(data => {

      this.snackBar.open(MESSAGES.proceso.put, MESSAGES.actions.put, snackBarDuration);

      this.dataStore.procesos.forEach((proceso, index) => {
        if (proceso.id === data.id) { this.dataStore.procesos[index] = data; }
      });
      
      this._procesos.next(Object.assign({}, this.dataStore).procesos);
    }, error => console.log('Could not update proceso.'));
  }
  
  public deleteProceso(id: string) {
    let apiUrl = environment.apiUrl;
    this.http.delete<IProceso>(`${apiUrl}proceso/procesos/${id}/`)
      .subscribe(response => {

        this.snackBar.open(MESSAGES.proceso.delete, MESSAGES.actions.delete, snackBarDuration);
  
        this.dataStore.procesos.forEach((proceso, index) => {
          if (proceso.id === id) { this.dataStore.procesos.splice(index, 1); }
          });
        this._procesos.next(Object.assign({}, this.dataStore).procesos);
      }, error => console.log('Could not delete proceso.'));
  }


  /**
   * Searches procesos by title, description and Active
   */
  // public search(): Observable<any> {
    // return ;
  // }

  private handleError(error: any, operation: string): Promise<any> {
    // this._mediator.broadcast(new Message(MessageType.BusyEnd));
    // this._mediator.broadcast(new Message(MessageType.ShowError, 'An error occurred while ' + operation));
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
    createProceso(proceso: Proceso) { }
    createProcesoAndProyecto(proceso: Proceso, proyecto: Proyecto) { }
    
    updateProceso(proceso: Proceso) { }
    deleteProceso(id: string) { }
   */
}