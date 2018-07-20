import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Proyecto } from '../models/proyecto';

class Options {
  count: number;
  pages: number;
  page: number;
  next: number;
  previous: number;
  range: string;
  page_size: number;
}

interface IResponse {
  options: Options;
  results: Proyecto[];
}

@Injectable()
export class ProyectosService {
  private readonly url = 'proyecto/proyectos/';


  constructor(private http: HttpClient) { }

  public add$(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.post<Proyecto>(this.url, proyecto);
  }

  public update$(id: string, proyecto: Proyecto): Observable<Proyecto> {
    return this.http.put<Proyecto>(`${this.url}${id}/`, proyecto);
  }

  public patch$(id: string, attrModify: any): Observable<Proyecto> {
    return this.http.patch<Proyecto>(`${this.url}${id}/`, attrModify);
  }

  /**
   * Método para recuperar todos los proyectos
   * @return Retorna Muchos Observables de tipo Proyecto.
   */
  public getProyectos$(): Observable<IResponse> {

    return this.http.get<IResponse>(this.url);
  }

  /**
   * Metodo para buscar proyectos
   * @param queryTitulo Busqueda del Titulo.
   * @return Retorna muchos Observables de tipo proyecto
   */
  public searchProyectos$(queryTitulo: string): Observable<IResponse> {
    const params = { search: queryTitulo };
    return this.http.get<IResponse>(this.url, { params: params });
  }

  /**
   * Metodo para recuperar un proyecto.
   * @param id clave primaria del proyecto
   * @return Uno observable de tipo Proyecto.
   */
  // public retriveProyecto$(id: string): Observable<Proyecto> {
  //
  // return this.http.get<Proyecto>(`${apiecto/proyectos/${id}`);
  // .map((res: Response) => res.json() || []);
  // }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
