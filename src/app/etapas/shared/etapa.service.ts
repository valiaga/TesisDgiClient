import { Injectable } from '@angular/core';
import { Etapa, IEtapa } from './etapa';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';
import { MESSAGES } from '../../../config/messages';
import { snackBarDuration } from '../../../config/general';


@Injectable()
export class EtapaService {
  private readonly url = 'proceso/etapas/';

  constructor(private http: HttpClient) { }

  public getEtapas(): Observable<IEtapa[]> {
    const params: any = { all: true };
    return this.http
      .get<IEtapa[]>(this.url, { params: params });
  }
  public getEtapasByTesisProcesoId(tesisProcesoId: string): Observable<IEtapa[]> {
    const params: any = { tesis_proceso_id: tesisProcesoId };
    return this.http
      .get<IEtapa[]>(this.url, { params: params });

  }


  public createEtapa$(etapa: any): Observable<IEtapa> {
    return this.http.post<IEtapa>(this.url, etapa);
  }

  public updateEtapa$(id: string, etapa: any): Observable<IEtapa> {
    return this.http.put<IEtapa>(`${this.url}${id}/`, etapa);
  }

  public getEtapasByProcesoId(procesoId: string): Observable<IEtapa[]> {
    const params: any = { proceso: procesoId };
    return this.http
      .get<IEtapa[]>(this.url, { params: params });

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

    return this.etapaService.getEtapas()
      .subscribe(data => {

        this.dataStore.etapas = data;
        this._etapas.next(Object.assign({}, this.dataStore).etapas);
      }, error => console.log('Could not load etapas.')
      );
  }

  public getEtapasByTesisProcesoId(tesisProcesoId: string) {
    return this.etapaService.getEtapasByTesisProcesoId(tesisProcesoId)
      .subscribe(data => {

        this.dataStore.etapas = data;
        this._etapas.next(Object.assign({}, this.dataStore).etapas);
      }, error => console.log('Could not load etapas.')
      );
  }

  public getEtapasByProcesoId(procesoId: string) {
    return this.etapaService.getEtapasByProcesoId(procesoId)
      .subscribe(data => {

        this.dataStore.etapas = data;
        this._etapas.next(Object.assign({}, this.dataStore).etapas);
      }, error => console.log('Could not load etapas.')
      );
  }


  public createEtapa(etapa: any) {
    this.etapaService.createEtapa$(etapa)
      .subscribe(data => {

        this.snackBar.open(MESSAGES.rolProceso.post, MESSAGES.actions.post, snackBarDuration);

        this.dataStore.etapas.push(data);
        this._etapas.next(Object.assign({}, this.dataStore).etapas);
      }, error => console.log('Could not create etapa.'));
  }


  public updateEtapa(id: string, etapa: any) {
    this.etapaService.updateEtapa$(id, etapa)
      .subscribe(data => {
        this.snackBar.open(MESSAGES.etapa.put, MESSAGES.actions.put, snackBarDuration);
        this.dataStore.etapas.forEach((e, index) => {
          if (e.id === data.id) { this.dataStore.etapas[index] = data; }
        });
        this._etapas.next(Object.assign({}, this.dataStore).etapas);
      }, error => console.log('Could not update etapa.'));
  }
}
