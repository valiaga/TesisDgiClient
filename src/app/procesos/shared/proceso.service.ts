import { environment } from '../../../environments/environment';
import { UserService } from '../../auth/user/user.service';
// import { SettingsService } from '../../shared/settings.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Proceso } from '../modelos/proceso.model';
import { PROCESOS } from './mock-procesos';
import { Injectable } from '@angular/core';

@Injectable()
export class ProcesoService {
  public searchText: string;

  constructor(private _http: Http,
    private _userService: UserService) { }

  /**
   * Get the top 10 most recent procesos
   */
  public getRecentProcesos(){
    // let apiUrl = this._settingsService.settings['apiUrl'];
    let apiUrl = environment.apiUrl;
    return this._http.get(apiUrl + 'procesos/', { headers: this._userService.getHeaders()})
    // return this._http.get(apiUrl + 'proceso/procesos/')
      .toPromise()
      .then(res => {
        return res.json();
      })
      .catch(error => this.handleError(error, 'loading recent posts.'))    
  }

  /**
   * Get the top 10 procesos
   */
  public getProcesos(){
    return Promise.resolve(PROCESOS);
  }

  /**
   * Gets a proceso by Id
   * @param procesoId 
   */
  public getProcesoById(procesoId: string): Promise<Proceso>{
    return Promise.resolve(PROCESOS.find(x => x.Id == procesoId));
  }

  /**
   * Creates a new Proceso
   * @param proceso Object Proceso
   */
  public addNewProceso(proceso: Proceso): Promise<void>{
    return Promise.resolve();
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

}
