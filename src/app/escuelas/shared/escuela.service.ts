import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Escuela, IEscuela, IResponse } from './escuela';
import { environment } from '../../../environments/environment';


@Injectable()
export class EscuelaService {

  constructor(private http: HttpClient ) { }

  
  public getEscuelas$(): Observable<IResponse>{
    let apiUrl = environment.apiUrl;    
    return this.http.get<IResponse>(`${apiUrl}academico/escuelas/`);
  }

  public getAllEscuelas$(): Observable<IEscuela[]>{
    let apiUrl = environment.apiUrl;
    return this.http.get<IEscuela[]>(`${apiUrl}academico/escuelas/?all=true`);    
  }

}
