import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Escuela } from './escuela';
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
  results: Escuela[];
}

@Injectable()
export class EscuelaService {

  constructor(private http: HttpClient ) { }

  public getEscuelas$(): Observable<IResponse>{
    let apiUrl = environment.apiUrl;    
    return this.http.get<IResponse>(`${apiUrl}academico/escuelas/`);
  }
}
