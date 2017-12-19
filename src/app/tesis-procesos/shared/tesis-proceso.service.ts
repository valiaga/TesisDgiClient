// import { HttpClient, HttpResponse, RequestOptions, Headers } from '@angular/common/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ITesisProceso } from './tesis-proceso';


@Injectable()
export class TesisProcesoService {

  constructor(private http: HttpClient) { }

  /**
   * Get the Proyectos by key proceso.
   */
  public getProyectosByProcesoId(procesoId: string): Observable<Array<ITesisProceso>>{
    let apiUrl = environment.apiUrl;
    // return this.http.get(apiUrl + 'procesos/' + procesoId + '/tesis-procesos');
    return this.http
      .get<Array<ITesisProceso>>(`${apiUrl}proceso/procesos/${procesoId}/tesis-procesos/`);
  }

  public saveTesisProcesoAndProyecto(data: any): Observable<ITesisProceso>{
    let apiUrl = environment.apiUrl;
    // Los envíos de información deben configurarse a mano
    // esto es fácilmente generalizable y reutilizable
    // let body = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    // let options = new RequestOptions({ headers: headers });

    // declarar la llamada y retornar el observable
    // las variables de configuración y los datos, van como parámetros
    if ( data.id ){
      return this.http
        .put<ITesisProceso>(`${apiUrl}proceso/procesos/${data.proceso}/tesis-procesos/${data.id}`, data, { headers});
    } else {
      return this.http
        .post<ITesisProceso>(`${apiUrl}proceso/procesos/${data.proceso}/tesis-procesos/`, data, { headers });
    }
  }

  public deleteTesisProcesoById(id: string){
    return this.http
      .delete<ITesisProceso>(``);
  }

  private handleError(error: any, operation: string): Promise<any> {
    // this._mediator.broadcast(new Message(MessageType.BusyEnd));
    // this._mediator.broadcast(new Message(MessageType.ShowError, 'An error occurred while ' + operation));
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
