import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LineaInvestigacion, ILineaInvestigacion } from './linea-investigacion';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


class Options {
  count: number; // total_count
  pages: number;
  page: number;
  next: number;
  previous: number;
  range: string;
  page_size: number; 
}

interface IResponse {
  options: Options;
  results: ILineaInvestigacion[];
}

// export interface IResponse {
  // items: LineaInvestigacion[];
  // total_count: number;
// }

@Injectable()
export class LineaInvestigacionService {

  constructor(private http: HttpClient) { }

  public getLineaInvestigacions$(sort: string, order: string, page: number): Observable<IResponse>{
    
    console.log('getLineaInvestigacions========>>>>>>>>>');
    console.log(sort);
    console.log(order); 
    console.log(page);
    let apiUrl = environment.apiUrl;
    return this.http
      .get<IResponse>(`${apiUrl}academico/linea-investigacions/`);
  }

  public postLineaInvestigacion(lineaInvestigacion: LineaInvestigacion): Observable<ILineaInvestigacion> {
    let apiUrl = environment.apiUrl;
    console.log('post lineaInvestigacion-');
    console.log(lineaInvestigacion);
    return this.http
      .post<ILineaInvestigacion>(`${apiUrl}academico/linea-investigacions/`, lineaInvestigacion);
  } 

  public getNuevaLineaInvestigacion(): LineaInvestigacion{
    return new LineaInvestigacion('', '', false, '');
  }

}
