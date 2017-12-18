import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TesisProcesoService {

  constructor(private http: Http) { }

  /**
   * Get the Proyectos by key proceso.
   */
  public getProyectosByProcesoId(procesoId: string): Observable<Response>{
    let apiUrl = environment.apiUrl;
    // console.log(apiUrl)
    // console.log("Hola")
    // console.log(procesoId)
    // return this.http.get(apiUrl + 'procesos/' + procesoId + '/tesis-procesos')
    return this.http.get(`${apiUrl}proceso/procesos/${procesoId}/tesis-procesos/`)
      // .toPromise()
      // .then(res => {
        // console.log(res.json());
        // return res.json()
      // })
      // .catch(error => this.handleError(error, 'loading proyectos by proceso.'))
  }

  public saveTesisProcesoAndProyecto(data: any): Observable<Response>{
    let apiUrl = environment.apiUrl;
    // Los envíos de información deben configurarse a mano
    // esto es fácilmente generalizable y reutilizable
    let body = JSON.stringify(data);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    // declarar la llamada y retornar el observable
    // las variables de configuración y los datos, van como parámetros
    if ( data.id ){
      return this.http
        .put(`${apiUrl}proceso/procesos/${data.proceso_id}/tesis-procesos/${data.id}`, body, options);
    } else {
      return this.http
        .post(`${apiUrl}proceso/procesos/${data.proceso_id}/tesis-procesos/`, body, options);
    }
  }

  private handleError(error: any, operation: string): Promise<any> {
    // this._mediator.broadcast(new Message(MessageType.BusyEnd));
    // this._mediator.broadcast(new Message(MessageType.ShowError, 'An error occurred while ' + operation));
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
