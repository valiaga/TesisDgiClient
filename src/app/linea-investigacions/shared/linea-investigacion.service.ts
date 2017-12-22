import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LineaInvestigacion, ILineaInvestigacion, IResponse } from './linea-investigacion';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable()
export class LineaInvestigacionService {

  constructor(private http: HttpClient) { }

  public getLineaInvestigacions$(sort: string, order: string, page: number,
    pageSize: number): Observable<IResponse>{
    
    // console.log('getLineaInvestigacions========>>>>>>>>>');
    // console.log(sort);
    // console.log(order);
    // console.log(page);
    // console.log(pageSize);

    let apiUrl = environment.apiUrl;
    const query = `?page_size=${pageSize}&page=${(page+1)}`
    return this.http
      .get<IResponse>(`${apiUrl}academico/linea-investigacions/${query}`);
  }

  public getAllLineaInvestigacion$(): Observable<ILineaInvestigacion[]>{
    let apiUrl = environment.apiUrl;
    return this.http
      .get<ILineaInvestigacion[]>(`${apiUrl}academico/linea-investigacions/?all=true`);    
  }

  public postLineaInvestigacion$(lineaInvestigacion: LineaInvestigacion): Observable<ILineaInvestigacion> {
    let apiUrl = environment.apiUrl;
    return this.http
      .post<ILineaInvestigacion>(`${apiUrl}academico/linea-investigacions/`, lineaInvestigacion);
  } 

  public getNuevaLineaInvestigacion(): LineaInvestigacion{
    return new LineaInvestigacion('', '', false, '');
  }
}
