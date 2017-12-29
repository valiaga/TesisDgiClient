import { Injectable } from '@angular/core';
import { Tarea, ITarea } from './tarea';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';

@Injectable()
export class TareaService {
  public tareas: Observable<Tarea[]>;
  private _tareas: BehaviorSubject<Array<Tarea>>;
  private dataStore: { // Aquí es donde almacenaremos nuestros datos en la memoria
    tareas: Tarea[]
  }
  constructor(private http: HttpClient,
    private snackBar: MatSnackBar) {


    this.dataStore = { tareas: [] };
    this._tareas = <BehaviorSubject<Tarea[]>> new BehaviorSubject([]);
    this.tareas = this._tareas.asObservable();
  }

  getAllTareas() {
    let apiUrl = environment.apiUrl;

    return this.http
      .get<ITarea[]>(`${apiUrl}proceso/tareas/?all=true`)
      .subscribe(data => {
        
        this.dataStore.tareas = data;
        this._tareas.next(Object.assign({}, this.dataStore).tareas);
      }, error => console.log('Could not load tareas.')
      )
  }

  getTareasByEtapaId(etapaId: string) {
    let apiUrl = environment.apiUrl;
    
    return this.http
      .get<ITarea[]>(`${apiUrl}proceso/etapas/${etapaId}/tareas/`)
      // .get<ITarea[]>(`${apiUrl}proceso/tareas/`)
      .subscribe(data => {

        this.dataStore.tareas = data;
        this._tareas.next(Object.assign({}, this.dataStore).tareas);
      }, error => console.log('Could not load tareas.')
      )
  }

}
