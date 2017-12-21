// import { HttpClient, HttpResponse, RequestOptions, Headers } from '@angular/common/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ITesisProceso, TesisProceso } from './tesis-proceso';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class TesisProcesoService{

  // private _tesisProcesos: BehaviorSubject<Array<TesisProceso>>;
  // private dataStore: { // Aquí es donde almacenaremos nuestros datos en la memoria
    // tesisProcesos: TesisProceso[]
  // }

  constructor(private http: HttpClient) { }

  // ngOnInit(){
    // this.dataStore = { tesisProcesos: [] };
    // this._tesisProcesos = new BehaviorSubject(Array<TesisProceso>());
  // }

  /**
   * Get the Proyectos by key proceso.
   */
  public getTesisProcesosByProcesoId$(procesoId: string): Observable<ITesisProceso[]>{
    let apiUrl = environment.apiUrl;
    return this.http
      .get<ITesisProceso[]>(`${apiUrl}proceso/procesos/${procesoId}/tesis-procesos/`);
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
