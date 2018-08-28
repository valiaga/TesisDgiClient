import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// import { Formulario, IFormulario } from '../models.1/formulario';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MESSAGES } from '../../../config/messages';
import { snackBarDuration } from '../../../config/general';
// import { CampoService } from './campo.service';
import { IFormulario } from './formulario';
// import { Form } from '../models/form';


@Injectable()
export class FormularioService {
  private readonly url = 'proceso/formularios/';

  constructor(private http: HttpClient) { }

  public getAll$(params?: any): Observable<IFormulario[]> {
    return this.http
      .get<IFormulario[]>(this.url, { params: params });
  }

  public create$(formulario: any): Observable<IFormulario[]> {
    return this.http
      .post<IFormulario[]>(this.url, formulario);
  }

  public update$(id: string, formulario: any): Observable<IFormulario[]> {
    return this.http
      .put<IFormulario[]>(`${this.url}${id}/`, formulario);
  }

  public delete$(id: string): Observable<IFormulario[]> {
    return this.http
      .delete<IFormulario[]>(`${this.url}${id}/`);
  }
}

@Injectable()
export class FormularioReactiveService {
  formularios: Observable<IFormulario[]>;
  private _formularios: BehaviorSubject<IFormulario[]>;
  private dataStore: {
    formularios: IFormulario[],
  };

  constructor(private formularioService: FormularioService,
    private snackBar: MatSnackBar,
    // private campoService: CampoService,
  ) {


    this.dataStore = { formularios: [] };

    this._formularios = <BehaviorSubject<IFormulario[]>>new BehaviorSubject([]);
    this.formularios = this._formularios.asObservable();
  }

  public getAll() {

    return this.formularioService.getAll$()
      .subscribe(data => {

        this.snackBar.open(MESSAGES.formulario.getMany, MESSAGES.actions.get, snackBarDuration);

        this.dataStore.formularios = data;
        this._formularios.next(Object.assign({}, this.dataStore).formularios);
      }, error => console.warn('Could not load formularios.'),
      );
  }

  // public getFormulariosByTareaId(tareaId: string) {
  //   return this.formularioService.getFormulariosByTareaId$(tareaId)
  //     .subscribe(data => {
  //       this.snackBar.open(MESSAGES.formulario.getMany, MESSAGES.actions.get, snackBarDuration);
  //       data.forEach((formulario, index) => {
  //         this.campoService.getCamposByFormularioId(formulario.id);
  //       });

  //       this.dataStore.formularios = data;

  //       this._formularios.next(Object.assign({}, this.dataStore).formularios);
  //     }, error => console.log('Could not load formularios.')
  //     );
  // }
}
