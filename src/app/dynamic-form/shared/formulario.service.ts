import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Formulario, IFormulario } from '../models.1/formulario';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';
import { MESSAGES } from '../../../config/messages';
import { snackBarDuration } from '../../../config/general';
import { CampoService } from './campo.service';

@Injectable()
export class FormularioService {
  formularios: Observable<Formulario[]>;
  private _formularios: BehaviorSubject<Formulario[]>;
  private dataStore: {
    formularios: Formulario[]
  };

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar,
    private campoService: CampoService) {


    this.dataStore = { formularios: [] };

    this._formularios = <BehaviorSubject<Formulario[]>>new BehaviorSubject([]);
    this.formularios = this._formularios.asObservable();
  }

  public getAllFormularios() {
    const apiUrl = environment.apiUrl;

    return this.http
      // .get<IFormulario[]>(`${apiUrl}proceso/formularios/?all=true`)
      .get<IFormulario[]>(`${apiUrl}proceso/formularios/`)
      .subscribe(data => {

        this.snackBar.open(MESSAGES.formulario.getMany, MESSAGES.actions.get, snackBarDuration);

        this.dataStore.formularios = data;
        this._formularios.next(Object.assign({}, this.dataStore).formularios);
      }, error => console.log('Could not load formularios.')
      );
  }

  public getFormulariosByTareaId(tareaId: string) {
    const apiUrl = environment.apiUrl;

    return this.http
      .get<IFormulario[]>(`${apiUrl}proceso/tareas/${tareaId}/formularios/`)
      .subscribe(data => {

        this.snackBar.open(MESSAGES.formulario.getMany, MESSAGES.actions.get, snackBarDuration);

        data.forEach((formulario, index) => {
          formulario.campos = this.campoService.campos;
          this.campoService.getCamposByFormularioId(formulario.id);
          // this.campoService.getCamposByFormularioId$(formulario.id).subscribe((campos)=>{
          // formulario.campos = campos
          // });
        });

        this.dataStore.formularios = data;

        this._formularios.next(Object.assign({}, this.dataStore).formularios);
      }, error => console.log('Could not load formularios.')
      )
  }
}
