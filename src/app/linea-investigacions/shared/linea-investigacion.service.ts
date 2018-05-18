import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LineaInvestigacion, ILineaInvestigacion, IResponse } from './linea-investigacion';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable()
export class LineaInvestigacionService {
  private url = 'academico/linea-investigacions/';

  constructor(private http: HttpClient) { }

  public getLineaInvestigacions$(sort: string, order: string, page: number,
    pageSize: number): Observable<IResponse> {
    // console.log('getLineaInvestigacions========>>>>>>>>>');
    // console.log(sort);
    // console.log(order);
    // console.log(page);
    // console.log(pageSize);
    const params: any = { page_size: pageSize, page: (page + 1) };
    return this.http
      .get<IResponse>(this.url, { params: params });
  }

  public getAllLineaInvestigacion$(): Observable<ILineaInvestigacion[]> {
    const params: any = { all: true };
    return this.http
      .get<ILineaInvestigacion[]>(this.url, { params: params });
  }

  public postLineaInvestigacion$(lineaInvestigacion: LineaInvestigacion): Observable<ILineaInvestigacion> {
    return this.http
      .post<ILineaInvestigacion>(this.url, lineaInvestigacion);
  }

  public getNuevaLineaInvestigacion(): LineaInvestigacion {
    return new LineaInvestigacion('', '', false, '');
  }
}
