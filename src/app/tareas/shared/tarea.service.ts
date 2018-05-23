import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';
import { MESSAGES } from '../../../config/messages';
import { snackBarDuration } from '../../../config/general';
import { Tarea, ITarea } from '../models/tarea';
import { IFormulario } from '../models/formulario';

@Injectable()
export class TareaService {
  private readonly urlFalse = 'proceso/etapas/';
  private readonly url = 'proceso/tareas/';

  constructor(private http: HttpClient) { }

  public getTareas(): Observable<ITarea[]> {
    const params: any = { all: true };
    return this.http
      .get<ITarea[]>(this.urlFalse, { params: params });
  }

  public getTareasByEtapaId(etapaId: string): Observable<ITarea[]> {
    return this.http
      .get<ITarea[]>(`${this.urlFalse}${etapaId}/tareas/`);
  }

  public updateTarea$(id: string, etapa: any): Observable<ITarea> {
    return this.http.put<ITarea>(`${this.url}${id}/`, etapa);
  }

  public delete$(id: string): Observable<ITarea> {
    return this.http.delete<ITarea>(`${this.url}${id}/`);
  }

  public create$(tarea: any): Observable<ITarea> {
    return this.http.post<ITarea>(this.url, tarea);
  }

  public getFomulariosByTareaId$(tareaId: string): Observable<IFormulario[]> {
    return this.http
      .get<IFormulario[]>(`${this.url}${tareaId}/formularios/`);
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

  public getAllTareas() {

    return this.tareaService.getTareas()
      .subscribe(data => {
        this.dataStore.tareas = data;
        console.log(this.dataStore.tareas);

        this._tareas.next(Object.assign({}, this.dataStore).tareas);
      }, error => console.log('Could not load tareas.')
      );
  }

  public getTareasByEtapaId(etapaId: string) {
    return this.tareaService.getTareasByEtapaId(etapaId)
      .subscribe(data => {
        this.dataStore.tareas = data;
        this._tareas.next(Object.assign({}, this.dataStore).tareas);
      }, error => console.log('Could not load tareas.')
      );
  }

  public updateTarea(id: string, etapa: any) {
    this.tareaService.updateTarea$(id, etapa)
      .subscribe(data => {
        this.snackBar.open(MESSAGES.tarea.put, MESSAGES.actions.put, snackBarDuration);
        this.dataStore.tareas.forEach((e, index) => {
          if (e.id === data.id) { this.dataStore.tareas[index] = data; }
        });
        this._tareas.next(Object.assign({}, this.dataStore).tareas);
      }, error => console.log('Could not update tarea.'));
  }

  public create(etapa: any) {
    this.tareaService.create$(etapa)
      .subscribe(data => {
        this.snackBar.open(MESSAGES.rolProceso.post, MESSAGES.actions.post, snackBarDuration);
        this.dataStore.tareas.push(data);
        this._tareas.next(Object.assign({}, this.dataStore).tareas);
      }, error => console.log('Could not create tarea.'));
  }

  public remove(id: string) {
    this.tareaService.delete$(id)
      .subscribe(response => {

        this.snackBar.open(MESSAGES.tarea.delete, MESSAGES.actions.delete, snackBarDuration);

        this.dataStore.tareas.forEach((tarea, index) => {
          if (tarea.id === id) { this.dataStore.tareas.splice(index, 1); }
        });
        this._tareas.next(Object.assign({}, this.dataStore).tareas);
      }, error => console.log('Could not delete tarea.'));
  }
}
