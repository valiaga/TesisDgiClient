import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Escuela, IEscuela, IResponse } from './escuela';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class EscuelaService {
  response: Observable<IResponse>;
  // escuelas: Observable<Escuela[]>;
  private _response: BehaviorSubject<IResponse>;
  private dataStore: {
    response: IResponse
    // escuelas: Escuela[]
  }

  constructor(private http: HttpClient ) { 
    this.dataStore = { response: { options: {
      count: 0, next: 0, page: 0, page_size: 0,pages: 0, previous: 0, range: ''  
    }, results: []} };

    this._response = <BehaviorSubject<IResponse>> new BehaviorSubject({});
    this.response = this._response.asObservable();
  }

  loadAll() {
    let apiUrl = environment.apiUrl;
    
    return this.http
      .get<IResponse>(`${apiUrl}academico/escuelas/?all=true`)
      .subscribe(data => {
        this.dataStore.response = data;
        this._response.next(Object.assign({}, this.dataStore).response);
      }, error => console.log('Could not load escuelas.')
      )
  }

  load(id: number | string) {
    let apiUrl = environment.apiUrl;
    this.http.get<IEscuela>(`${apiUrl}academico/escuelas/${id}`).subscribe(data => {
      let notFound = true;

      this.dataStore.response.results.forEach((escuela, index) => {
        if (escuela.id === data.id) {
          this.dataStore.response.results[index] = data;
          notFound = false;
        }
      });

      if (notFound) {
        this.dataStore.response.results.push(data);
      }

      this._response.next(Object.assign({}, this.dataStore).response);
    }, error => console.log('Could not load escuela.'));
  }

  create(escuela: Escuela) {
    let apiUrl = environment.apiUrl;
    
    this.http.post<IEscuela>(`${apiUrl}academico/escuelas/`, escuela)
      .subscribe(data => {
        this.dataStore.response.results.push(data);
        this._response.next(Object.assign({}, this.dataStore).response);
      }, error => console.log('Could not create escuela.'));
  }
  
  update(escuela: Escuela) {
    let apiUrl = environment.apiUrl;
    this.http.put<IEscuela>(`${apiUrl}academico/escuelas/${escuela.id}`, escuela)
    .subscribe(data => {
      this.dataStore.response.results.forEach((escuela, index) => {
        if (escuela.id === data.id) { this.dataStore.response.results[index] = data; }
      });
      
      this._response.next(Object.assign({}, this.dataStore).response);
    }, error => console.log('Could not update escuela.'));
  }
  
  remove(id: string) {
    let apiUrl = environment.apiUrl;
    this.http.delete<IEscuela>(`${apiUrl}academico/escuelas/${id}`)
      .subscribe(response => {
        this.dataStore.response.results.forEach((escuela, index) => {
          if (escuela.id === id) { this.dataStore.response.results.splice(index, 1); }
          });
        this._response.next(Object.assign({}, this.dataStore).response);
      }, error => console.log('Could not delete escuela.'));
  }



  // NORMAL
  public getEscuelas$(sort: string, order: string, page: number,
    pageSize: number): Observable<IResponse>{
    let apiUrl = environment.apiUrl;    
    return this.http.get<IResponse>(`${apiUrl}academico/escuelas/`);
  }
  
  public getAllEscuelas$(): Observable<IEscuela[]>{
    let apiUrl = environment.apiUrl;
    return this.http.get<IEscuela[]>(`${apiUrl}academico/escuelas/?all=true`);    
  }
  
}
