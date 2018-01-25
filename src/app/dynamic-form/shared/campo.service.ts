import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Campo, ICampo } from '../models.1/campo';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';
import { MESSAGES } from '../../../config/messages';
import { snackBarDuration } from '../../../config/general';
import { CampoBase } from '../models.1/campo-base';
import { CampoSelect } from '../models.1/campo-select';
import { CampoInput } from '../models.1/campo-input';

@Injectable()
export class CampoService {
  campos: Observable<Campo[]>;
  private _campos: BehaviorSubject<Campo[]>;
  private dataStore: {
    campos: Campo[]
  };
  constructor(private http: HttpClient,
    private snackBar: MatSnackBar) {

    this.dataStore = { campos: [] };

    this._campos = <BehaviorSubject<Campo[]>> new BehaviorSubject([]);
    this.campos = this._campos.asObservable();
  }

  public getAllCampos() {
    const apiUrl = environment.apiUrl;

    return this.http
      // .get<ICampo[]>(`${apiUrl}proceso/campos/?all=true`)
      .get<ICampo[]>(`${apiUrl}proceso/campos/`)
      .subscribe(data => {

        this.snackBar.open(MESSAGES.campo.getMany, MESSAGES.actions.get, snackBarDuration);

        this.dataStore.campos = data;
        this._campos.next(Object.assign({}, this.dataStore).campos);
      }, error => console.log('Could not load campos.')
      );
  }

  public getCamposByFormularioId(formularioId: string) {
    const apiUrl = environment.apiUrl;

    return this.http
      .get<ICampo[]>(`${apiUrl}proceso/formularios/${formularioId}/campos/`)
      .subscribe(data => {

        this.snackBar.open(MESSAGES.campo.getMany, MESSAGES.actions.get, snackBarDuration);
        this.dataStore.campos = data;
        this._campos.next(Object.assign({}, this.dataStore).campos);
      }, error => console.log('Could not load campos.')
      );
  }

  public getCamposByFormularioId$(formularioId: string): Observable<ICampo[]> {
    const apiUrl = environment.apiUrl;

    return this.http
      .get<ICampo[]>(`${apiUrl}proceso/formularios/${formularioId}/campos/`);
      // .subscribe(data => {

        // this.snackBar.open(MESSAGES.campo.getMany, MESSAGES.actions.get, snackBarDuration);
        // this.dataStore.campos = data;
        // this._campos.next(Object.assign({}, this.dataStore).campos);
      // }, error => console.log('Could not load campos.')
      // )
  }


  public getCampos() {
    const campos: CampoBase<any>[] = [
      new CampoSelect({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],
        order: 3
      }),
      new CampoInput({
        key: 'nombres',
        // type: 'text',
        label: 'Nombres',
        value: 'Vitmar Jhonson',
        required: true,
        order: 1,
        maxLength: 20,
        minLength: 5,
      }),
      new CampoInput({
        key: 'edad',
        type: 'number',
        label: 'Edad',
        value: '15',
        required: true,
        order: 4,
        max: 10,
        min: 2,
      }),
      new CampoInput({
        key: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        order: 2,

      })
    ];

    return campos.sort((a, b) => a.order - b.order);
  }

}
