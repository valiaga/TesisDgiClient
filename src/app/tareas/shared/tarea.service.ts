import { Injectable } from '@angular/core';
import { Tarea, ITarea } from './tarea';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';

@Injectable()
export class TareaService {
  private readonly url = 'proceso/tareas/';

  constructor(private http: HttpClient) { }

  public getTareas(): Observable<ITarea[]> {
    const params: any = { all: true };
    return this.http
      .get<ITarea[]>(this.url, { params: params });
  }

  public getTareasByEtapaId(etapaId: string): Observable<ITarea[]> {
    return this.http
      .get<ITarea[]>(`${this.url}${etapaId}/tareas/`);
  }
}


@Injectable()
export class TareaReactiveService {
  public tareas: Observable<Tarea[]>;
  private _tareas: BehaviorSubject<Array<Tarea>>;
  private dataStore: { // Aquí es donde almacenaremos nuestros datos en la memoria
    tareas: Tarea[]
  };
  constructor(private tareaService: TareaService,
    private snackBar: MatSnackBar) {


    this.dataStore = { tareas: [] };
    this._tareas = <BehaviorSubject<Tarea[]>>new BehaviorSubject([]);
    this.tareas = this._tareas.asObservable();
  }

  getAllTareas() {

    return this.tareaService.getTareas()
      .subscribe(data => {
        this.dataStore.tareas = data;
        this._tareas.next(Object.assign({}, this.dataStore).tareas);
      }, error => console.log('Could not load tareas.')
      );
  }

  getTareasByEtapaId(etapaId: string) {
    return this.tareaService.getTareasByEtapaId(etapaId)
      .subscribe(data => {
        this.dataStore.tareas = data;
        this._tareas.next(Object.assign({}, this.dataStore).tareas);
      }, error => console.log('Could not load tareas.')
      );
  }

}
