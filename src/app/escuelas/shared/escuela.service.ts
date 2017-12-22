import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Escuela, IEscuela, IResponse } from './escuela';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class EscuelaService {
  escuelas: Observable<Escuela[]>;
  private _escuelas: BehaviorSubject<Escuela[]>;
  private dataStore: {
    escuelas: Escuela[]
  }

  constructor(private http: HttpClient ) { 
    this.dataStore = { escuelas: [] };

    this._escuelas = <BehaviorSubject<Escuela[]>> new BehaviorSubject([]);
    this.escuelas = this._escuelas.asObservable();
  }

  loadAll() {
    let apiUrl = environment.apiUrl;
    
    return this.http
      .get<IEscuela[]>(`${apiUrl}academico/escuelas/?all=true`)
      .subscribe(data => {
        this.dataStore.escuelas = data;
        this._escuelas.next(Object.assign({}, this.dataStore).escuelas);
      }, error => console.log('Could not load escuelas.')
      )
  }

  load(id: number | string) {
    let apiUrl = environment.apiUrl;
    this.http.get<IEscuela>(`${apiUrl}academico/escuelas/${id}`).subscribe(data => {
      let notFound = true;

      this.dataStore.escuelas.forEach((escuela, index) => {
        if (escuela.id === data.id) {
          this.dataStore.escuelas[index] = data;
          notFound = false;
        }
      });

      if (notFound) {
        this.dataStore.escuelas.push(data);
      }

      this._escuelas.next(Object.assign({}, this.dataStore).escuelas);
    }, error => console.log('Could not load escuela.'));
  }

  create(escuela: any) {
    let apiUrl = environment.apiUrl;
    console.log('escuela');
    console.log(escuela);
    this.http.post<IEscuela>(`${apiUrl}academico/escuelas/`, escuela)
      .subscribe(data => {
        this.dataStore.escuelas.push(data);
        this._escuelas.next(Object.assign({}, this.dataStore).escuelas);
      }, error => console.log('Could not create escuela.'));
  }
  
  update(escuela: Escuela) {
    let apiUrl = environment.apiUrl;
    this.http.put<IEscuela>(`${apiUrl}academico/escuelas/${escuela.id}`, escuela)
    .subscribe(data => {
      this.dataStore.escuelas.forEach((escuela, index) => {
        if (escuela.id === data.id) { this.dataStore.escuelas[index] = data; }
      });
      
      this._escuelas.next(Object.assign({}, this.dataStore).escuelas);
    }, error => console.log('Could not update escuela.'));
  }
  
  remove(id: string) {
    let apiUrl = environment.apiUrl;
    this.http.delete<IEscuela>(`${apiUrl}academico/escuelas/${id}`)
      .subscribe(response => {
        this.dataStore.escuelas.forEach((escuela, index) => {
          if (escuela.id === id) { this.dataStore.escuelas.splice(index, 1); }
          });
        this._escuelas.next(Object.assign({}, this.dataStore).escuelas);
      }, error => console.log('Could not delete escuela.'));
  }


  public getNuevaEscuela(): Escuela {
    return new Escuela('', '', false, '', '', '', '');
  }

  // NORMAL
  public getEscuelas$(sort: string, order: string, page: number,
    pageSize: number): Observable<IResponse>{
    let apiUrl = environment.apiUrl;    
    return this.http.get<IResponse>(`${apiUrl}academico/escuelas/`);
  }
  
  /**
   * Importante para un combo en lineas de investigación.
   */
  public getAllEscuelas$(): Observable<IEscuela[]>{
    let apiUrl = environment.apiUrl;
    return this.http.get<IEscuela[]>(`${apiUrl}academico/escuelas/?all=true`);    
  }
  
}
