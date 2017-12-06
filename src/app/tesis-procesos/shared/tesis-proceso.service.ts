import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class TesisProcesoService {

  constructor(private http: Http) { }

  /**
   * Get the Proyectos by key proceso.
   */
  public getProyectosByProcesoId(procesoId: string){
    let apiUrl = environment.apiUrl;
    console.log(apiUrl)
    console.log("Hola")
    console.log(procesoId)
    // return this.http.get(apiUrl + 'procesos/' + procesoId + '/tesis-procesos')
    return this.http.get(apiUrl + 'procesos/' + procesoId + '/tesis-procesos/')
      .toPromise()
      .then(res => {
        console.log(res.json());
        return res.json()
      })
      .catch(error => this.handleError(error, 'loading proyectos by proceso.'))
  }

  public saveTesisProcesoAndProyecto(data: any){
    // console.log("bamos a guardar");
    // console.log(data);
    
    let apiUrl = environment.apiUrl;
    return this.http.post(apiUrl + 'procesos/' + data.proceso_id + '/tesis-procesos/', data)
      .subscribe()
      
    //   .toPromise()
    //   .then(res => {
    //     return res.json();
    //   })
  }

  private handleError(error: any, operation: string): Promise<any> {
    // this._mediator.broadcast(new Message(MessageType.BusyEnd));
    // this._mediator.broadcast(new Message(MessageType.ShowError, 'An error occurred while ' + operation));
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
