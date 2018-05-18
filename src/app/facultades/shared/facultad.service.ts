import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFacultad } from './facultad';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FacultadService {
  private readonly url = 'academico/facultades/';

  constructor(private http: HttpClient) { }

  /**
   * Importante para combo de escuelas.
   */
  public getAllFacultades$(): Observable<IFacultad[]> {
    const params: any = { all: true };
    return this.http.get<IFacultad[]>(this.url, { params: params });
  }
}
