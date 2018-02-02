import { Injectable } from '@angular/core';
import { Etapa, IEtapa } from './etapa';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';


@Injectable()
export class EtapaService {

  constructor(private http: HttpClient) { }

  public getEtapas(): Observable<IEtapa[]> {
    const apiUrl = environment.apiUrl;
    return this.http
      .get<IEtapa[]>(`${apiUrl}proceso/etapas/?all=true`);
  }
  public getEtapasByTesisProcesoId(tesisProcesoId: string): Observable<IEtapa[]> {
    const apiUrl = environment.apiUrl;
    return this.http
      .get<IEtapa[]>(`${apiUrl}proceso/etapas/?tesis_proceso_id=${tesisProcesoId}`);

  }
}

@Injectable()
export class EtapaReactiveService {

  public etapas: Observable<Etapa[]>;
  private _etapas: BehaviorSubject<Array<Etapa>>;
  private dataStore: { // Aquí es donde almacenaremos nuestros datos en la memoria
    etapas: Etapa[]
  };
  constructor(
    private etapaService: EtapaService,
    private snackBar: MatSnackBar) {


    this.dataStore = { etapas: [] };
    this._etapas = <BehaviorSubject<Etapa[]>>new BehaviorSubject([]);
    this.etapas = this._etapas.asObservable();
  }


  public getAllEtapas() {
    const apiUrl = environment.apiUrl;

    return this.etapaService.getEtapas()
      .subscribe(data => {

        this.dataStore.etapas = data;
        this._etapas.next(Object.assign({}, this.dataStore).etapas);
      }, error => console.log('Could not load etapas.')
      );
  }

  public getEtapasByTesisProcesoId(tesisProcesoId: string) {
    const apiUrl = environment.apiUrl;

    return this.etapaService.getEtapasByTesisProcesoId(tesisProcesoId)
      .subscribe(data => {

        this.dataStore.etapas = data;
        this._etapas.next(Object.assign({}, this.dataStore).etapas);
      }, error => console.log('Could not load etapas.')
      );
  }
}
