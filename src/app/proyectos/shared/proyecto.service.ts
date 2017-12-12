import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Proyecto } from '../models/proyecto';

@Injectable()
export class ProyectoService {



  constructor(private http: Http) { }

  /**
   * Método para recuperar todos los proyectos
   * @return Retorna Muchos Observables de tipo Proyecto.
   */
  public getProyectos$(): Observable<Proyecto[]> {
    let apiUrl = environment.apiUrl;
    return this.http.get(`${apiUrl}proyecto/proyectos/`)
      .map((res: Response) => res.json() || []);
  }
  
  /**
   * Metodo para buscar proyectos
   * @param queryTitulo Busqueda del Titulo.
   * @return Retorna muchos Observables de tipo proyecto
   */
  public searchProyectos$(queryTitulo: string): Observable<Proyecto[]> {
    let apiUrl = environment.apiUrl;
    return this.http.get(`${apiUrl}/proyecto/proyectos?q=${queryTitulo}`)
      .map((res: Response) => res.json() || []);
  }
  
  /**
   * Metodo para recuperar un proyecto.
   * @param id clave primaria del proyecto
   * @return Uno observable de tipo Proyecto.
   */
  public retriveProyecto$(id: string): Observable<Proyecto> {
    let apiUrl = environment.apiUrl;
    return this.http.get(`${apiUrl}/proyecto/proyectos/${id}`)
      .map((res: Response) => res.json() || []);
  }
}
