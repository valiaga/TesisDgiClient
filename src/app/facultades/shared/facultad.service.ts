import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IFacultad } from './facultad';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FacultadService {

  constructor(private http: HttpClient) { }

  /**
   * Importante para combo de escuelas.
   */
  public getAllFacultades$(): Observable<IFacultad[]> {
    let apiUrl = environment.apiUrl;
    return this.http.get<IFacultad[]>(`${apiUrl}academico/facultades/?all=true`);
  }
}
