import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Formulario, IFormulario } from '../models.1/formulario';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MESSAGES } from '../../../config/messages';
import { snackBarDuration } from '../../../config/general';
import { CampoService } from './campo.service';
import { Form } from '../models/form';


@Injectable()
export class FormularioService {

  constructor(private http: HttpClient) { }

  public getFomularios$(): Observable<IFormulario[]> {
    return this.http
      .get<IFormulario[]>(`proceso/formularios/`);
  }
  public getFormulariosByTareaId$(tareaId: string): Observable<Form[]> {
    return this.http
      .get<Form[]>(`proceso/tareas/${tareaId}/formularios/`);
  }
}

@Injectable()
export class FormularioReactiveService {
  formularios: Observable<Formulario[]>;
  private _formularios: BehaviorSubject<Formulario[]>;
  private dataStore: {
    formularios: Formulario[]
  };

  constructor(private formularioService: FormularioService,
    private snackBar: MatSnackBar,
    private campoService: CampoService) {


    this.dataStore = { formularios: [] };

    this._formularios = <BehaviorSubject<Formulario[]>>new BehaviorSubject([]);
    this.formularios = this._formularios.asObservable();
  }

  public getAllFormularios() {

    return this.formularioService.getFomularios$()
      .subscribe(data => {

        this.snackBar.open(MESSAGES.formulario.getMany, MESSAGES.actions.get, snackBarDuration);

        this.dataStore.formularios = data;
        this._formularios.next(Object.assign({}, this.dataStore).formularios);
      }, error => console.log('Could not load formularios.')
      );
  }

  public getFormulariosByTareaId(tareaId: string) {
    return this.formularioService.getFormulariosByTareaId$(tareaId)
      .subscribe(data => {
        this.snackBar.open(MESSAGES.formulario.getMany, MESSAGES.actions.get, snackBarDuration);
        data.forEach((formulario, index) => {
          // formulario.campos = this.campoService.campos;
          this.campoService.getCamposByFormularioId(formulario.id);
        });

        this.dataStore.formularios = data;

        this._formularios.next(Object.assign({}, this.dataStore).formularios);
      }, error => console.log('Could not load formularios.')
      );
  }
}
