import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Proyecto } from '../models/proyecto';

@Injectable()
export class ProyectoService {



  constructor(private http: Http) { }

  public getProyectos$(): Observable<Proyecto[]> {
    let apiUrl = environment.apiUrl;
    return this.http.get(`${apiUrl}/proyecto/proyectos`)
      .map((res: Response) => res.json()) 
  }
}
